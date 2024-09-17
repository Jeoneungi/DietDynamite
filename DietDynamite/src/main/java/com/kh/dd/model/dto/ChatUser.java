package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatUser {
	private int userNo;
	private String userEmail;
	private String userNickname;
	private String userImage;
	private String lastReadTime;
}
