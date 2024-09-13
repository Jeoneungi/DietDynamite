package com.kh.dd.rest;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dd.common.utility.Util;
import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.ChatUser;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ChatService;

@RestController
@RequestMapping("/rest/chat")
public class ChatRestController {
	
	@Autowired
	private ChatService service;
	
	// 유저 검색
	@GetMapping("/searchUser")
	public List<ChatUser> searchUser(String searchInput){
		List<ChatUser> userList = service.searchUser(searchInput);
		
		return userList; 
	}
	
	// 현재 로그인 사용자와 연관된 모든 채팅방 가져옴 (채팅방 인원 포함)
	@GetMapping("/getAllChatRooms")
	public List<ChatRoom> getAllChatRooms(HttpSession session) {
		
		List<ChatRoom> chatRooms = null;
		User loginUser = (User)session.getAttribute("loginUser");
		
		if (loginUser != null) {
			int userNo = loginUser.getUserNo();
			chatRooms = service.getAllChatRooms(userNo);
		}
		
		return chatRooms;
	}
	
	// 채팅방 클릭시, 채팅방 본 시간 업데이트 및, 특정 방에 연결된 모든 메시지를 가져옴
	@GetMapping("/getAllChatWithRoom")
	public List<ChatMessage> getAllChatWithRoom(HttpSession session, int roomNo){
		List<ChatMessage> chatMessages = null;
		
		User loginUser = (User)session.getAttribute("loginUser");
		
		if (loginUser != null) {
			int userNo = loginUser.getUserNo();
			
			// 읽은 시간 업데이트
			service.updateLastReadTime(roomNo, userNo);
			
			// 채팅방 데이터 가져오기
			chatMessages = service.getAllChatWithRoom(roomNo);
		}
		
		return chatMessages;
	}
	
	
	// 채팅방에 메시지 INSERT (단순 POST 연습. 사용하지않을것)
	@PostMapping("/insertMessage")
	public int insertChat(	HttpSession session, 
							@RequestBody Map<String, Object> requestData) {
	
		int roomNo = Integer.parseInt((String)requestData.get("roomNo"));
		String chatContent = (String)requestData.get("chatContent");
		User loginUser = (User)session.getAttribute("loginUser");
		
		if (loginUser != null) {
			int userNo = loginUser.getUserNo();
			
			chatContent = Util.XssHandling(chatContent);
			service.insertChat(userNo, roomNo,  chatContent);
		}
		
		return 0;
	}
	
	
	// 채팅방 생성
	@PostMapping("/createChatRooms")
	public int createChatRooms(HttpSession session,
									@RequestBody List<Map<String, Object>> userNoList) {
		
		
		int chatRoomNo = 0;
		User loginUser = (User)session.getAttribute("loginUser");
		
		if (loginUser != null) {
			int createUserNo = loginUser.getUserNo();
			String roomName = loginUser.getUserNickname() + "의 방";
			chatRoomNo = service.createChatRoom(createUserNo, roomName, userNoList);
		}
		
		return chatRoomNo;
	}
	
}
