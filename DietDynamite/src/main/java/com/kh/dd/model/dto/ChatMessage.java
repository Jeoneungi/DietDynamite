package com.kh.dd.model.dto;

import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Service
@NoArgsConstructor
@ToString
public class ChatMessage {
	private int messageNo;
	private String messageContent;
	private int senderNo;
	private String senderNickname;
	private String senderImage;
	private int roomNo;
	private String roomName;
	private String sendTime;
}
