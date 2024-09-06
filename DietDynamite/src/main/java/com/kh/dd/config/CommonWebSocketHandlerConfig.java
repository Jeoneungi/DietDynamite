package com.kh.dd.config;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.dd.common.utilty.UserInputHandling;
import com.kh.dd.model.dto.ChatMessage;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.ChatUser;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ChatService;

@Component
public class CommonWebSocketHandlerConfig extends TextWebSocketHandler{
	private final ObjectMapper mapper = new ObjectMapper();

	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserInputHandling inputHandler;
	
	// 전체 채팅룸 관리
	private List<ChatRoom> chatRooms;
	
	// 로그인 유저 생성
	private User loginUser = null;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("[INFO] 채팅 SOCKET 연결 성공");
		
        // 클라이언트 접속시 WebSocketConfig 에서 addInterceptors 메서드를 사용
		//	로그인시 저장한 HttpSession 데이터를 WebSocketSession 에 추가하여, 로그인 유저 정보 알아냄
        Map<String, Object> attributes = session.getAttributes();
        loginUser = (User)attributes.get("loginUser");
        
        // 로그인 유저정보를 통해 해당 유저가 접속한 ChatRooms 들 알아냄
        chatRooms = chatService.getAllChatRooms(loginUser.getUserNo());
        
        // 각 ChatRoom에 연결된 WebSocketSession 저장
        for(ChatRoom room : chatRooms) {
        	System.out.println("[INFO] 연결된 ChatRoom :" + room);
        	
        	Set<WebSocketSession> chatRoomMemberSession = room.getChatRoomMemberSession();
        	chatRoomMemberSession.add(session);
        	
        	System.out.println("[INFO] ChatRoom 에 WebSocketSession 추가 완료 ");
        }
        
	}

	@SuppressWarnings("unused")
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String msg = message.getPayload(); // 기본 JSON 형태

		// JACSKON 으로 파싱
		ChatMessage chatMessage = mapper.readValue(msg, ChatMessage.class);
		
		// 전달한 정보로 sender 값 채우기
		LocalDateTime currentDateTime = LocalDateTime.now();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:MM");
		String formattedDateTime = currentDateTime.format(dtf);
		
		int senderNo = chatMessage.getSenderNo();
		ChatUser senderInfo = chatService.selectUser(senderNo);
		
		System.out.println(senderInfo);
		
		chatMessage.setSenderNickname(senderInfo.getUserNickname());
		chatMessage.setSenderImage(senderInfo.getUserImage());
		chatMessage.setSendTime(formattedDateTime);
		chatMessage.setMessageContent(inputHandler.XssHandler(chatMessage.getMessageContent()));
		
		System.out.println(chatMessage);
		
		// DB 에 메시지 저장
		chatService.insertChat(chatMessage.getSenderNo(), chatMessage.getRoomNo(), chatMessage.getMessageContent());
		
		// roomNo 를 찾아서, chatRooms 중 chatRoom 선택
		ChatRoom selectedChatRoom = null;
		
		for (ChatRoom chatRoom : chatRooms) {
			if(chatRoom.getRoomNo() == chatMessage.getRoomNo()) {
				selectedChatRoom = chatRoom;
				return;
			}
		}
		
		// 해당 chatRoom 에서 sendMessage 실행하여 Room 전체에 전달
		if (selectedChatRoom != null) {
			Set<WebSocketSession> clientSessions = selectedChatRoom.getChatRoomMemberSession();
			
			clientSessions.parallelStream()
			.forEach(clientSession -> {
				try {
					clientSession.sendMessage(new TextMessage(mapper.writeValueAsString(chatMessage)));
				} catch (IOException e) {
					e.printStackTrace();
				}
			});
		}
		
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
	}
}
