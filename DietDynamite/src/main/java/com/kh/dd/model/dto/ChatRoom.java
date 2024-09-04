package com.kh.dd.model.dto;

import java.util.List;

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
	private List<User> chatRoomMembers;	
}
