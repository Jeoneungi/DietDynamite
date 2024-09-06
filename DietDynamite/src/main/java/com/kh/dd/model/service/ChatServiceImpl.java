package com.kh.dd.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.ChatDAO;
import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.ChatUser;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;
	
	/** 유저 검색
	 */
	@Override
	public List<ChatUser> searchUser(String searchInput) {
		List<ChatUser> userList = dao.searchUser(searchInput);

		return userList;
	}
	
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

	/** 채팅방 본 시간 업데이트
	 */
	@Override
	public void updateLastReadTime(int roomNo, int userNo) {
		dao.updateLastReadTime(roomNo, userNo);
	}

	/** 채팅 INSERT
	 */
	@Override
	public void insertChat(int userNo, int roomNo, String chatContent) {
		dao.insertChat(userNo, roomNo, chatContent);
	}

	/** 채팅방 생성
	 */
	@Override
	public int createChatRoom(int createUserNo, String roomName, List<Map<String, Object>> userNoList) {

		// 방 생성
		int chatRoomNo = dao.createChatRoom(createUserNo, roomName);
		
		// 멤버 초대 (방 생성이 정상적인경우)
		if (chatRoomNo > 0 ) {
			for (Map<String, Object> userNoObj : userNoList) {
				userNoObj.put("roomNo", chatRoomNo);
				
				dao.insertChatRoomMember(userNoObj);
			}
			return chatRoomNo;
		}else {
			// TODO:에러 강제 발생 시킬것
		}
		
		return 0;
	}

	
	/** 유저 한명의 데이터 가져오기
	 */
	@Override
	public ChatUser selectUser(int userNo) {
		ChatUser userInfo = dao.selectUser(userNo);

		return userInfo;
	}
}
