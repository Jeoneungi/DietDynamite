package com.kh.dd.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.ChatDAO;
import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;
	
	
	/** 모든 채팅방 정보 GET
	 */
	@Override
	public List<ChatRoom> getAllChatRooms(int userNo) {
		List<ChatRoom> chatRooms = dao.getAllChatRooms(userNo);

		return chatRooms;
	}
	
	/** 하나의 방에 해당하는 모든 메시지 정보 GET
	 */
	@Override
	public List<ChatMessage> getAllChatWithRoom(int roomNo) {
		List<ChatMessage> chatMessages = dao.getAllChatWithRoom(roomNo);
		return chatMessages;
	}
}
