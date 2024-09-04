package com.kh.dd.rest;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ChatService;

@RestController
@RequestMapping("/rest/chat")
public class ChatRestController {
	
	@Autowired
	private ChatService service;
	
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
}
