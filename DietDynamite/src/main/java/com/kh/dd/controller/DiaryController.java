package com.kh.dd.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.DiaryService;

@SessionAttributes("loginUser")
@Controller
@RequestMapping("/diary")
public class DiaryController {

	@Autowired
	private DiaryService service;

	@GetMapping("/{boardType}")
	public String selectDiaryList(
			@PathVariable("boardType") int boardType,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp
			,Model model
			,@RequestParam Map<String, Object> paramMap ) {

		if(paramMap.get("key") ==null) {
			Map<String,Object> map = service.selectDiaryList(boardType,cp);
			model.addAttribute("map",map);
		} else {
			paramMap.put("boardType", boardType);
			Map<String,Object> map = service.selectDiaryList(paramMap,cp);
			model.addAttribute("map",map);
		}

		return "diary/diary";

	}

	//게시글 상세조회
	@GetMapping("/{boardType}/{boardNo}")
	public String diaryDetail(@PathVariable("boardType") int boardType,
			@PathVariable("boardNo") int boardNo,
			Model model,
			RedirectAttributes ra,
			@SessionAttribute(value="loginUser", required=false) User loginUser
			, HttpServletRequest req
			, HttpServletResponse resp) throws ParseException {

		Map<String,Object> map = new HashMap<String, Object>();
		map.put("boardType", boardType);
		map.put("boardNo", boardNo);

		Board board = service.selectBoard(map);
	
		String path = null;

		if(board !=null) {
			if(loginUser != null) {
				map.put("userNo", loginUser.getUserNo());
				int result = service.boardLikeCheck(map);
				if(result >0)  model.addAttribute("likeCheck", "on");
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

			// 게시글 상세 페이지로 이동
			path = "diary/diaryDetail";
			model.addAttribute("board", board);
		} else {
			// 게시글이 없을 때 처리
			path = "redirect:/diary/" + boardType;
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
	
	//게시글 작성
//	@PostMapping("/{boardType}/inset")
//	public String diaryInsert(@PathVariable("boardType") int boardType
//			,Board board
//			,HttpSession session
//			,@SessionAttribute("loginUser") User loginUser
//			, RedirectAttributes ra
//			) throws IllegalStateException, IOException{
//		
//		board.setUserNo(loginUser.getUserNo());
//		board.setBoardType(boardType);
//		
//		String webPath = "/resources/images/diary/";
//		String filePath = session.getServletContext().getRealPath(webPath);
//		
//		int boardNo = service.diaryInsert(board, webPath, filePath);
//		
//		String message = null;
//		String path = "redirect:";
//		
//		if(boardNo >0) { //게시글 성공 시
//			message = "게시글이 등록 되었습니다.";
//			path += "/diary/" + boardType + "/" +boardNo;
//			
//		}else {
//			message = "게시글 등록 실패";
//			//게시글 작성화면
//			path += "insert";
//		}
//		
//		ra.addFlashAttribute("message", message);
//		return path;
//		
//	}
	
	
}