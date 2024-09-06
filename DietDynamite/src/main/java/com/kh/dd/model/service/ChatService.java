package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;

import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.ChatUser;

public interface ChatService {

	List<ChatUser> searchUser(String searchInput);
	
	ChatUser selectUser(int userNo);

	List<ChatRoom> getAllChatRooms(int userNo);

	List<ChatMessage> getAllChatWithRoom(int roomNo);

	void updateLastReadTime(int roomNo, int userNo);

	void insertChat(int userNo, int roomNo, String chatContent);

	int createChatRoom(int createUserNo, String roomName, List<Map<String, Object>> userNoList);

}
