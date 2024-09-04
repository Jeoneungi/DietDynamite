package com.kh.dd.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.ChatDAO;
import com.kh.dd.model.dto.ChatRoom;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;
	
	@Override
	public List<ChatRoom> getAllChatRooms(int userNo) {
		List<ChatRoom> chatRooms = dao.getAllChatRooms(userNo);

		return chatRooms;
	}
}
