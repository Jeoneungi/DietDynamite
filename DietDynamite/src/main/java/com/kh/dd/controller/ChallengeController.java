package com.kh.dd.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kh.dd.model.dto.BestUser;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Challenge;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ChallengeService;


@SessionAttributes("loginUser")
@Controller
@RequestMapping("/challenge")
public class ChallengeController {

	@Autowired
	private ChallengeService service;

	@GetMapping("/{challengeNo}")
	public String selectChallengeList(
			@PathVariable("challengeNo") int challengeNo,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp
			,Model model
			,@RequestParam Map<String, Object> paramMap ) {

		if(paramMap.get("key") == null) {
			Map<String,Object> map = service.selectChallengeList(challengeNo,cp);
			model.addAttribute("map", map);
		} else {
			paramMap.put("challengeNo", challengeNo);
			Map<String,Object> map = service.selectChallengeList(paramMap,cp);
			model.addAttribute("map",map);
		}

		List<Map<String, Object>> challengeTypeList = service.selectChallengeTypeList();
			model.addAttribute("challengeTypeList", challengeTypeList);

			
		return "challenge/challengeList";

	}

	//게시글 상세조회
	@GetMapping("/{challengeNo}/{boardNo}")
	public String challengeDetail(@PathVariable("challengeNo") int challengeNo,
			@PathVariable("boardNo") int boardNo,
			Model model,
			RedirectAttributes ra,
			@SessionAttribute(value="loginUser", required=false) User loginUser
			, HttpServletRequest req
			, HttpServletResponse resp) throws ParseException {

		Map<String,Object> map = new HashMap<String, Object>();
		map.put("challengeNo", challengeNo);
		map.put("boardNo", boardNo);

		//게시판 정보 받아오기
		Board board = service.selectBoard(map);
		
		// 유저 밷지 받아오기
		
		
		
		System.out.println("뱃지보내는 유저번호 : " + board.getUserNo());
		
		List<Map<String, String>> userBadge = service.selectUserBadgeList(board.getUserNo());

		System.out.println("뱃지정보??" + userBadge);
		
		model.addAttribute("badgeList", userBadge);
		
		
		// 챌린지 정보 받아오기
		
		Map<String, Integer> payLoad = new HashMap<String, Integer>();
		
		payLoad.put("userNo", board.getUserNo());
		payLoad.put("challengeNo", board.getChallengeNo());
		
		int userChallengeNo = service.userChallengeSearch(payLoad);	

		Challenge challenge = service.challengeInfo(userChallengeNo);
		
		model.addAttribute("challengeInfo", challenge);
		
		
		
		String path = null;

		if(board != null) {
			if(loginUser != null) {
				map.put("userNo", loginUser.getUserNo());
				int result = service.boardLikeCheck(map);
				if(result > 0)  model.addAttribute("likeCheck", "on");
			}
			//조회수

			if(loginUser == null || loginUser.getUserNo() !=board.getUserNo()) {
				Cookie c = null;
				Cookie[] cookies = req.getCookies();


				if(cookies !=null) {
					for(Cookie cookie : cookies) {
						 
						if(cookie.getName().equals("readBoardNo")) {
							// System.out.println("쿠키 이름: " + cookie.getName() + ", 쿠키 값: " + cookie.getValue());
							c = cookie;
							break;
						}
					}
				}
				int result = 0;

				if (c == null) {
					// 처음 조회하는 경우
					c = new Cookie("readBoardNo", "|" + boardNo + "|");
					result = service.updateReadCnt(boardNo);
				} else {
					// 쿠키에 게시글 번호가 없을 경우 조회수 증가
					if (!c.getValue().contains("|" + boardNo + "|")) {
						c.setValue(c.getValue() + "|" + boardNo + "|");
						result = service.updateReadCnt(boardNo);
					}
				}

				if (result > 0) {
					// 조회수 동기화
					board.setBoardCnt(board.getBoardCnt() + 1);

					// 쿠키 설정
					c.setPath("/");

					Calendar cal = Calendar.getInstance();
					cal.add(Calendar.DATE, 1); // 쿠키 만료 시간을 하루로 설정

					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date now = new Date();
					Date expirationDate = sdf.parse(sdf.format(cal.getTime()));

					long diff = (expirationDate.getTime() - now.getTime()) / 1000; // 초 단위로 변환
					c.setMaxAge((int) diff); // 만료 시간 설정

					resp.addCookie(c); // 쿠키 적용
				}
			
			}

			System.out.println("게시판정보"+board.getReplyList());

			
			// 게시글 상세 페이지로 이동
			path = "challenge/challengeDetail";
			model.addAttribute("board", board);
		} else {
			// 게시글이 없을 때 처리
			path = "redirect:/challenge/" + challengeNo;
			ra.addFlashAttribute("message", "해당 게시글이 존재하지 않습니다.");
		}

		return path;
	}
	
	//좋아요처리
	@PostMapping("/like")
	@ResponseBody 
	public int like(@RequestBody Map<String, Integer> ParamMap) {
		//System.out.println(ParamMap);
		return service.like(ParamMap);
	}
	
	//게시글 작성화면전환
	@GetMapping("/{challengeNo}/insert")
	public String boardInsert(@PathVariable("challengeNo") int challengeNo, Model model, 
							  @SessionAttribute("loginUser") User loginUser) {
		List<Map<String, Object>> challengeTypeList = service.selectChallengeTypeList();
		model.addAttribute("challengeTypeList", challengeTypeList);
		
		// 챌린지 작성화면 이동시 챌린지 기간 경과 유저챌린지 업데이트
		service.challengeSecessionUpdate(loginUser.getUserNo());
		
	return "challenge/challengeWrite";
	} 
	
	//게시글 작성
	@PostMapping("/insert")
	public String challengeInsert(
			Board board
			,HttpSession session
			,@RequestParam(value="images", required=false) List<MultipartFile> images
			,@SessionAttribute("loginUser") User loginUser
			, RedirectAttributes ra
			) throws IllegalStateException, IOException, FileUploadException{
		
		board.setUserNo(loginUser.getUserNo());
		
		String webPath = "/resources/images/challenge/";
		String filePath = session.getServletContext().getRealPath(webPath);
		
		int boardNo = service.challengeInsert(board, images, webPath, filePath);
		        
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("userNo", loginUser.getUserNo());
		map.put("challengeNo", board.getChallengeNo());
		
		
		//System.out.println(map);
		
		
		// 해당하는 유저첼린지가 있는지 검사
		int userChallengeNo = service.userChallengeSearch(map);

		if (userChallengeNo > 0) {

			// 있다면 Daily만 추가
			int dailyResult = service.dailyUpdate(userChallengeNo);	
			int completeResult = service.complete(userChallengeNo);

			// 챌린지가 완료되었는지 확인하고 완료되었으면 완결조치
			
		} else {
			
	  	  // 유저첼린지가 없다면 챌린지를 생성하고 일일결과를 입력
			int resultChallenge = service.insertChallenge(map);	
			userChallengeNo = service.userChallengeSearch(map);			
			int dailyResult = service.dailyUpdate(userChallengeNo);	
		}
		
		String message = null;
		String path = "redirect:";
							
		if(boardNo>0) { //게시글 성공 시
			message = "게시글이 등록 되었습니다.";
			path += "/challenge/" + board.getChallengeNo() + "/" + boardNo;
			
		}else {
			message = "게시글 등록 실패";
			//게시글 작성화면
			path += "insert";
		}
		
		ra.addFlashAttribute("message", message);
		return path;
		
	}
	
	//게시글 수정화면 전환
	@GetMapping("/{challengeNo}/{boardNo}/update")
	public String challengeUpdate(@PathVariable("challengeNo") int challengeNo
			,@PathVariable("boardNo") int boardNo
			,Model model
			){
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("challengeNo", challengeNo);
		map.put("boardNo", boardNo);
		
		Board board = service.selectBoard(map);
		model.addAttribute("board", board);
		
		List<Map<String, Object>> challengeTypeList = service.selectChallengeTypeList();
		model.addAttribute("challengeTypeList", challengeTypeList);
				
		return "challenge/challengeUpdate";
		
	} 
	
	//게시글수정
	@PostMapping("/{boardNo}/update")
	public String boardUpdate(
	        Board board,
	        @RequestParam(value = "deleteList", required = false) String deleteList, // 삭제할 이미지 목록
	        @RequestParam(value = "cp", required = false, defaultValue = "1") int cp, // 페이지 정보 유지
	        @RequestParam(value = "images", required = false) MultipartFile image, // 새로 업로드된 이미지
	        @PathVariable("boardNo") int boardNo,
	        HttpSession session,
	        RedirectAttributes ra
	) throws IllegalStateException, IOException {

	    // 게시물 기본 정보 설정
	    //board.setChallengeNo(challengeNo); name에 challengeNO있어서 자동으로 갈것 같아서
	    board.setBoardNo(boardNo);

	    String webPath = "/resources/images/challenge/";
	    String filePath = session.getServletContext().getRealPath(webPath);

	    // 1. deleteList가 null이거나 비어있는지 확인
	    if (deleteList != null && !deleteList.isEmpty()) {
	        System.out.println("삭제할 이미지 목록: " + deleteList);
	    }

	    // 2. 이미지 파일 입력 확인
	    String newImageFileName = null;
	    if (image != null && !image.isEmpty()) {
	        newImageFileName = image.getOriginalFilename();
	        //System.out.println("새로 업로드된 이미지 파일명: " + newImageFileName);
	    } else {
	        //System.out.println("새로 업로드된 이미지 없음");
	    }

	    // 3. 서비스 호출을 통해 업데이트 처리
	    int rowCount = service.challengeUpdate(board, image, webPath, filePath, deleteList);

	    // 4. 결과에 따른 메시지 및 경로 설정
	    String message;
	    String path;

	    if (rowCount > 0) {
	        message = "게시글이 수정되었습니다.";
	        path = "redirect:/challenge/" + board.getChallengeNo() + "/" + boardNo + "?cp=" + cp;
	    } else {
	        message = "게시글 수정 실패";
	        path = "redirect:update";
	    }

	    ra.addFlashAttribute("message", message);

	    return path;
	}

	
	//게시글 삭제
	@GetMapping("/{challengeNo}/{boardNo}/delete")
	public String challengeDelete(
			@PathVariable("challengeNo") int challengeNo
			,@PathVariable("boardNo") int boardNo
			,RedirectAttributes ra
			, @RequestParam(value="cp", required=false, defaultValue="1") int cp
			) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardType", challengeNo);
		map.put("boardNo", boardNo);
		
		int result = service.challengeDelete(map);
		
		String message = null;
		String path = "redirect:";
		
		if(result >0) { 
			message = "게시글이 삭제 되었습니다.";
			path += "/challenge/" + challengeNo + "/" ;
			
		}else {
			message = "게시글 수정 실패";
			path += "/challenge/" + challengeNo + "/" +boardNo + "?cp=" + cp;
		}
		
		ra.addFlashAttribute("message", message);
		
		return path;
	}
	    // 유저 챌린지 검색
		@PostMapping(value="/userChallengeSearch",produces = "application/json; charset=UTF-8")
		@ResponseBody		
		public int userChallengeSearch(@RequestBody Map<String, Integer> payLoad) {
			return service.userChallengeSearch(payLoad);
		}

		// 챌린지 정보 조회
		@GetMapping(value="/challengeInfo",produces = "application/json; charset=UTF-8")
		@ResponseBody
		public Challenge challengeInfo(int userChallengeNo) {
			System.out.println("값이 옵나?" + userChallengeNo);
			return service.challengeInfo(userChallengeNo);
		}
		
		// 배스트유저 선발
		@GetMapping(value="/bestUser",produces = "application/json; charset=UTF-8")
		@ResponseBody
		public List<BestUser> bestUserList() {
			System.out.println("test");
			
			return service.bestUserList();
		}
		
}