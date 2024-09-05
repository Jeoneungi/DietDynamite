package com.kh.dd.model.dto;

import java.util.List;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {
	private int roomNo;
	private String roomName;
	private String createDate;
	private int createUserNo;
	private String createUserNickname;
	private String createUserEmail;
	private String createUserImage;
	private String lastMessage;
	private int notReadCnt;
	private List<User> chatRoomMembers;
	private Set<WebSocketSession> chatRoomMembmerSession;

	public void addSessionToChatRoom(WebSocketSession session) {
		chatRoomMembmerSession.add(session);
	}
	public void sendMessages() {
		
	}
}
