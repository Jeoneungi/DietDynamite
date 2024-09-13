package com.kh.dd.rest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.dto.UserHistory;
import com.kh.dd.model.dto.UserWorkout;
import com.kh.dd.model.service.MypageService;

@RestController
@RequestMapping("/rest/mypage")
public class MypageRestController {
	
	@Autowired
	private MypageService service;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	// 모든 유저 정보
	@GetMapping("/getAllUserInfo")
	public List<User> getAllUserInfo(){
		List<User> userList = service.getAllUserInfo();
	
		return userList;
	}
	
	// 유저 정보 검색
	@GetMapping("/searchUserInfo")
	public List<User> getAllUserInfo(int searchType, String searchParam){
		List<User> userList = service.searchUserInfo(searchType, searchParam);
	
		return userList;
	}
	
	// 유저 게시글 정보 검색
	@GetMapping("/getAllBoardsByUser")
	public List<Board> getAllBoardsByUser(int userNo){
		List<Board> boardList = service.getAllBoardsByUser(userNo);
	
		return boardList;
	}
	
	// 즐겨찾기 정보 확인
	@GetMapping("/getFavoriteplaces")
	public List<Place> getFavoriteplaces(int userNo){
		List<Place> favoritePlaceList = service.getFavoriteplaces(userNo);
	
		return favoritePlaceList;
	}
	
	// 유저 운동 데이터 확인
	@GetMapping("/getUserWorkouts")
	public List<UserWorkout> getUserWorkouts(int userNo){
		List<UserWorkout> userWorkoutList = service.getUserWorkouts(userNo);
		return userWorkoutList;
	}
	
	// 유저 로그인 기록 정보 확인
	@GetMapping("/getUserHistory")
	public List<UserHistory> getUserHistory(int userNo){
		List<UserHistory> userHistoryList = service.getUserHistory(userNo);
		return userHistoryList;
	}
	
	// 유저 댓글 정보 확인
	@GetMapping("/getUserReplies")
	public List<Reply> getUserReplies(int userNo){
		List<Reply> getUserReplies = service.getUserReplies(userNo);
		return getUserReplies;
	}
	
	// 유저 프로필 이미지 변경
	
	// 유저 권한 업데이트
	@PostMapping("/updateUserAuth")
	public Map<String, Object> updateUserAuth(@RequestBody User userInput){
		Map<String, Object> result = new HashMap<>();
		String message = "";
		
		int updateResult = service.updateUserAuth(userInput);
		
		if(updateResult == 0) {	// 실패
			message = "업데이트에 실패하였습니다.";
		}else {	// 성공
			message = "업데이트에 성공하였습니다.";
		}
		
		result.put("result", updateResult);
		result.put("message", message);
		

		return result;
	}
	
	// 유저 정보 업데이트
	@PostMapping("/updateUserInfo")
	public Map<String, Object> updateUserInfo(@RequestBody Map<String, Object> requestData,
												HttpSession session){
		Map<String, Object> result = new HashMap<>();
		String message = "";
		
		if (((String)requestData.get("type")).equals("USER_PW")) {
			requestData.put("data", bcrypt.encode((String)requestData.get("data")));			
		}
		
		int updateResult = service.updateUserInfo(requestData);
		
		if(updateResult == 0) {	// 실패
			message = "업데이트에 실패하였습니다.";
		}else {	// 성공
			message = "업데이트에 성공하였습니다.";
			
			User loginUser = (User)session.getAttribute("loginUser");
			
			switch ((String)requestData.get("type")) {
				case "USER_EMAIL" :
					loginUser.setUserEmail((String)requestData.get("data"));break;
				case "USER_NICKNAME" :
					loginUser.setUserNickname((String)requestData.get("data"));break;
				case "USER_BD" :
					loginUser.setUserBirthDay((String)requestData.get("data"));break;
				case "USER_PROFILE_HEIGHT" :
					loginUser.setUserProfileHeight((Integer)requestData.get("data"));break;
				case "USER_PROFILE_WEIGHT" :
					loginUser.setUserProfileWeight((Integer)requestData.get("data"));break;
			}
		}
		
		result.put("result", updateResult);
		result.put("message", message);
		
		return result;
	}
	
	// 유저 탈퇴처리
	@DeleteMapping("/deleteUser")
	public Map<String, Object> deleteUser(@RequestBody User userInput){
		Map<String, Object> result = new HashMap<>();
		String message = "";
		
		int deleteResult = service.deleteUser(userInput);
		
		if(deleteResult == 0) {	// 실패
			message = "유저 탈퇴에 실패하였습니다.";
		}else {	// 성공
			message = "유저 탈퇴에 성공하였습니다.";
		}

		LocalDateTime time = LocalDateTime.now();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY'년'-MM'월'-DD'일' HH'시' mm'분' ss'초'");
		String timeFormatted = time.format(dtf);
		
		result.put("result", deleteResult);
		result.put("deleteTime", timeFormatted);
		result.put("message", message);
		
		return result;
	}
}
