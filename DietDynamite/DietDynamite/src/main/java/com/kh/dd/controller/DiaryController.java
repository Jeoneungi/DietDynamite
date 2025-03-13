package com.kh.dd.controller;

import java.io.File;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.dd.common.utility.Util;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.dto.Workout;
import com.kh.dd.model.service.DiaryService;

@SessionAttributes("loginUser")
@Controller
@RequestMapping("/diary")
public class DiaryController {

	@Autowired
	private DiaryService service;

	//게시판조회
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
			
			// 음식 및 운동 정보 조회
	        List<Food> foodItems = service.getFoodItems(boardNo);
	        List<Workout> workoutItems = service.getWorkoutItems(boardNo);
	        
	        double totalIntake = foodItems.stream().mapToDouble(Food::getTotalCalories).sum();
	        double totalBurned = workoutItems.stream().mapToDouble(Workout::getCaloriesBurned).sum();
	        
	        // 누적 칼로리 계산
	        double accumulatedCalories = totalIntake - totalBurned;

	        // 몸무게 변화 예상 (7,700kcal = 1kg)
	        double expectedWeightChange = accumulatedCalories / 7700;
	       
	      
	        model.addAttribute("foodItems", foodItems);
	        model.addAttribute("workoutItems", workoutItems);
	        model.addAttribute("totalIntake", totalIntake);
	        model.addAttribute("totalBurned", totalBurned);
	        model.addAttribute("expectedWeightChange", expectedWeightChange);
	        model.addAttribute("board", board);
	        model.addAttribute("boardType", boardType);
	        model.addAttribute("boardNo", boardNo);

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

	//게시글 작성화면전환
	@GetMapping("/{boardType}/insert")
	public String boardInsert(@PathVariable("boardType") int boardType) {
		return "diary/diaryWirte";
	} 

	
	//게시글 삽입
	@PostMapping("/{boardType}/insert")
	public ResponseEntity<Map<String, Object>> diaryInsert(
	        @PathVariable("boardType") int boardType,
	        @RequestParam("boardTitle") String boardTitle,
	        @RequestParam("boardContent") String boardContent,
	        @RequestParam("foods") String foodsJson,
	        @RequestParam("exercises") String exercisesJson,
	        @RequestPart(value = "images", required = false) List<MultipartFile> imageFile,
	        HttpSession session,
	        @SessionAttribute("loginUser") User loginUser
	) throws IllegalStateException, IOException, FileUploadException {

	    Board board = new Board();
	    board.setUserNo(loginUser.getUserNo());
	    board.setBoardType(boardType);
	    board.setBoardTitle(boardTitle);
	    board.setBoardContent(boardContent);
	    String webPath = "/resources/images/diary/";
	    String filePath = session.getServletContext().getRealPath(webPath);

	    int boardNo = service.diaryInsert(board, imageFile, webPath, filePath);
	    board.setBoardNo(boardNo);

	    Map<String, Object> response = new HashMap<>();
	    if (boardNo > 0) {
	        ObjectMapper objectMapper = new ObjectMapper();
	        List<Food> foods = objectMapper.readValue(foodsJson, new TypeReference<List<Food>>() {});
	        List<Workout> workouts = objectMapper.readValue(exercisesJson, new TypeReference<List<Workout>>() {});

	       // System.out.println("Received Exercises: " + exercisesJson);

		  
	        
	        if (foods != null) {
	            for (Food food : foods) {
	                food.setBoardNo(boardNo);
	                service.addFoodToDiary(food);
	            }
	        }

	        if (workouts != null) {
	            for (Workout workout : workouts) {
	                workout.setBoardNo(boardNo);
	                service.addWorkoutToDiary(workout);
	               // System.out.println("Workout No: " + workout.getWorkoutNo());
	               // System.out.println("Duration: " + workout.getDuration());
	               // System.out.println("Calories Burned: " + workout.getCaloriesBurned());
	            }
	        }

	        response.put("success", true);
	        response.put("boardNo", boardNo);
	        response.put("boardType", boardType);
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("success", false);
	        response.put("message", "게시글 등록 실패");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}






	//게시글 수정화면 전환
	@GetMapping("/{boardType}/{boardNo}/update")
	public String diaryUpdate(@PathVariable("boardType") int boardType
			,@PathVariable("boardNo") int boardNo
			,Model model
			){

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardType", boardType);
		map.put("boardNo", boardNo);

		Board board = service.selectBoard(map);

		model.addAttribute("board", board);
		
		 // 음식 및 운동 정보 조회
	    List<Food> foodItems = service.getFoodItems(boardNo);
	    List<Workout> workoutItems = service.getWorkoutItems(boardNo);

	    
	    double totalIntake = foodItems.stream().mapToDouble(Food::getTotalCalories).sum();
	    double totalBurned = workoutItems.stream().mapToDouble(Workout::getCaloriesBurned).sum();
	    
	    // 누적 칼로리 계산
	    double accumulatedCalories = totalIntake - totalBurned;

	    // 몸무게 변화 예상 (7,700kcal = 1kg)
	    double expectedWeightChange = accumulatedCalories / 7700;

	    // 모델에 추가
	    model.addAttribute("foodItems", foodItems);
	    model.addAttribute("workoutItems", workoutItems);
	    model.addAttribute("totalIntake", totalIntake);
	    model.addAttribute("totalBurned", totalBurned);
	    model.addAttribute("expectedWeightChange", expectedWeightChange);
	    model.addAttribute("boardType", boardType);
	    model.addAttribute("boardNo", boardNo);
	    
		return "diary/diaryUpdate";


	} 

	//게시글수정
	@PostMapping("/{boardType}/{boardNo}/update")
	public ResponseEntity<Map<String, Object>> boardUpdate(
	        @RequestParam(value = "deleteList", required = false) String deleteList,
	        @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
	        @PathVariable("boardType") int boardType,
	        @RequestParam("boardTitle") String boardTitle,
	        @PathVariable("boardNo") int boardNo,
	        @RequestParam("boardContent") String boardContent,
	        @RequestParam("foods") String foodsJson,
	        @RequestParam("exercises") String exercisesJson,
			@RequestParam(value = "images", required = false) MultipartFile image,
	        @RequestPart(value = "images", required = false) List<MultipartFile> imageFile,
	        HttpSession session,
	        RedirectAttributes ra,
	        @SessionAttribute("loginUser") User loginUser
	) throws IllegalStateException, IOException, FileUploadException {

	    Board board = new Board();
	    board.setBoardType(boardType);
	    board.setBoardNo(boardNo);
	    board.setBoardTitle(boardTitle);  // 제목 업데이트
	    board.setBoardContent(boardContent);  // 내용 업데이트

	    // 게시글 업데이트
	    int result = service.updateBoard(board);
	    if (result <= 0) {
	        Map<String, Object> response = new HashMap<>();
	        response.put("success", false);
	        response.put("message", "게시글 업데이트 실패");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }

	    String webPath = "/resources/images/diary/";
	    String filePath = session.getServletContext().getRealPath(webPath);

	 		if (deleteList != null && !deleteList.isEmpty()) {
	 			//System.out.println("삭제할 이미지 목록: " + deleteList);
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
	 		int rowCount = service.diaryUpdate(board, image, webPath, filePath, deleteList);

	    

	    // 음식 및 운동 정보 JSON을 파싱
	    ObjectMapper objectMapper = new ObjectMapper();
	    List<Food> foods = objectMapper.readValue(foodsJson, new TypeReference<List<Food>>() {});
	    List<Workout> workouts = objectMapper.readValue(exercisesJson, new TypeReference<List<Workout>>() {});

	    //System.out.println("Received Exercises: " + exercisesJson);

	    // 기존 음식 정보 추가
	    addFoodEntries(foods, boardNo);
	    // 기존 음식 정보 업데이트
	    updateFoodEntries(foods);
	    
	    // 기존 운동 정보 추가
	    addWorkoutEntries(workouts, boardNo);
	    // 기존 운동 정보 업데이트
	    updateWorkoutEntries(workouts);

	    // 응답 설정
	    Map<String, Object> response = new HashMap<>();
	    response.put("success", true);
	    response.put("boardNo", boardNo);
	    response.put("boardType", boardType);

	    return ResponseEntity.ok(response);
	}

	// 음식 정보 추가
	private void addFoodEntries(List<Food> foods, int boardNo) {
	    if (foods != null) {
	        for (Food food : foods) {
	            food.setBoardNo(boardNo);
	            try {
	                service.addFoodToDiary(food);
	                System.out.println("음식 추가됨: " + food);
	            } catch (Exception e) {
	                System.out.println("음식 추가 실패: " + e.getMessage());
	                
	            }
	        }
	    }
	}

	// 음식 정보 업데이트
	private void updateFoodEntries(List<Food> foods) {
	    if (foods != null) {
	        for (Food food : foods) {
	            try {
	                service.updateFoodInDiary(food);
	                System.out.println("음식 업데이트됨: " + food);
	            } catch (Exception e) {
	                System.out.println("음식 업데이트 실패: " + e.getMessage());
	                
	            }
	        }
	    }
	}

	// 운동 정보 추가
	private void addWorkoutEntries(List<Workout> workouts, int boardNo) {
	    if (workouts != null) {
	        for (Workout workout : workouts) {
	            workout.setBoardNo(boardNo);
	            try {
	                service.addWorkoutToDiary(workout);
	                System.out.println("운동 추가됨: " + workout);
	            } catch (Exception e) {
	                System.out.println("운동 추가 실패: " + e.getMessage());
	                // 필요시 추가적인 로직(예: 로깅, 사용자 알림 등)을 여기에 추가
	            }
	        }
	    }
	}

	// 운동 정보 업데이트
	private void updateWorkoutEntries(List<Workout> workouts) {
	    if (workouts != null) {
	        for (Workout workout : workouts) {
	            try {
	                service.updateWorkoutInDiary(workout);
	                System.out.println("운동 업데이트됨: " + workout);
	            } catch (Exception e) {
	                System.out.println("운동 업데이트 실패: " + e.getMessage());
	                // 필요시 추가적인 로직(예: 로깅, 사용자 알림 등)을 여기에 추가
	            }
	        }
	    }
	}


	//게시글 삭제
	@GetMapping("/{boardType}/{boardNo}/delete")
	public String diaryDelete(
			@PathVariable("boardType") int boardType
			,@PathVariable("boardNo") int boardNo
			,RedirectAttributes ra
			, @RequestParam(value="cp", required=false, defaultValue="1") int cp
			) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardType", boardType);
		map.put("boardNo", boardNo);

		int result = service.diaryDelete(map);

		String message = null;
		String path = "redirect:";

		if(result >0) { 
			message = "게시글이 삭제 되었습니다.";
			path += "/diary/" + boardType + "/" ;

		}else {
			message = "게시글 수정 실패";
			path += "/diary/" + boardType + "/" +boardNo + "?cp=" +cp; ;
		}

		ra.addFlashAttribute("message", message);

		return path;
	}

	//음식검색
	@PostMapping("/searchFood")
	@ResponseBody
	public List<Food> searchFoodList (@RequestBody Map<String, Object> paramMap) {

		//System.out.println(paramMap);

		return service.searchFood(paramMap);	

	}


	//운동검색
	@PostMapping("/searchWorkout")
	@ResponseBody
	public List<Workout> searchWorkout (@RequestBody Map<String, Object> paramMap) {

		//System.out.println(paramMap);

		return service.searchWorkout(paramMap);	

	}





}