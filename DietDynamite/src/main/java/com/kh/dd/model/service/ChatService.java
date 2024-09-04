package com.kh.dd.model.service;

import java.util.List;

import com.kh.dd.model.dto.ChatRoom;

public interface ChatService {

	List<ChatRoom> getAllChatRooms(int userNo);

}
