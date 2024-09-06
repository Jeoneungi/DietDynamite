package com.kh.dd.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.ChatUser;

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

	public void updateLastReadTime(int roomNo, int userNo) {
		Map<String, Object> reqData = new HashMap<String, Object>();
		reqData.put("roomNo", roomNo);
		reqData.put("userNo", userNo);
		sqlSession.update("chatMapper.updateLastReadTime", reqData);
	}

	public void insertChat(int userNo, int roomNo, String chatContent) {
		Map<String, Object> reqData = new HashMap<String, Object>();
		reqData.put("userNo", userNo);
		reqData.put("roomNo", roomNo);
		reqData.put("chatContent", chatContent);
		sqlSession.insert("chatMapper.insertChat", reqData);
	}

	public List<ChatUser> searchUser(String searchInput) {
		List<ChatUser> userList = sqlSession.selectList("chatMapper.searchUser", searchInput);
	
		return userList;
	}

	public int createChatRoom(int createUserNo, String roomName) {
		ChatRoom reqChatRoom = new ChatRoom();
		reqChatRoom.setCreateUserNo(createUserNo);
		reqChatRoom.setRoomName(roomName);
		
		int result = sqlSession.insert("chatMapper.createChatRoom", reqChatRoom);
		
		if (result > 0 ) {
			result = reqChatRoom.getRoomNo();
		}
		
		return result;
	}

	public void insertChatRoomMember(Map<String, Object> userNoObj) {
		sqlSession.insert("chatMapper.insertChatRoomMember", userNoObj);
	}
}
