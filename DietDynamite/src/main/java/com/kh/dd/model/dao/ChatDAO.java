package com.kh.dd.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;

@Repository
public class ChatDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<ChatRoom> getAllChatRooms(int userNo) {
		List<ChatRoom> chatRooms = sqlSession.selectList("chatMapper.selectChatRooms", userNo);
		return chatRooms;
	}

	public List<ChatMessage> getAllChatWithRoom(int roomNo) {
		List<ChatMessage> chatMessages = sqlSession.selectList("chatMapper.selectChatMessages", roomNo);
		return chatMessages;
	}
}
