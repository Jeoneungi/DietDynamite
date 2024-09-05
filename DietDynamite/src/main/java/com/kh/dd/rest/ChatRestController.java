package com.kh.dd.rest;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ChatService;

@RestController
@RequestMapping("/rest/chat")
public class ChatRestController {
	
	@Autowired
	private ChatService service;
	
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
	
	// 특정 방에 연결된 모든 메시지를 가져옴
	@GetMapping("getAllChatWithRoom")
	public List<ChatMessage> getAllChatWithRoom(int roomNo){
		List<ChatMessage> chatMessages = null;
		
		chatMessages = service.getAllChatWithRoom(roomNo);
		return chatMessages;
	} 
}
