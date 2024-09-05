package com.kh.dd.model.service;

import java.util.List;

import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;

public interface ChatService {

	List<ChatRoom> getAllChatRooms(int userNo);

	List<ChatMessage> getAllChatWithRoom(int roomNo);

	void updateLastReadTime(int roomNo, int userNo);

	void insertChat(int userNo, int roomNo, String chatContent);

}
