package com.kh.dd.config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.dd.model.dto.ChatRoom;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ChatService;

@Component
public class CommonWebSocketHandlerConfig extends TextWebSocketHandler{

	@Autowired
	private ChatService chatService;
	
	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("[INFO] 채팅 SOCKET 연결 성공");
		
        // 클라이언트 접속시 WebSocketConfig 에서 addInterceptors 메서드를 사용
		//	로그인시 저장한 HttpSession 데이터를 WebSocketSession 에 추가하여, 로그인 유저 정보 알아냄
        Map<String, Object> attributes = session.getAttributes();
        User loginUser = (User)attributes.get("loginUser");
        
        // 로그인 유저정보를 통해 해당 유저가 접속한 ChatRooms 들 알아냄
        List<ChatRoom> chatRooms = chatService.getAllChatRooms(loginUser.getUserNo());
        
        // ChatRooms 의 WebSocket 저장 멤버변수에 WebSocketSession 추가
        for(ChatRoom room : chatRooms) {
        	System.out.println("[TEMP] 연결된 ChatRoom :" + room);
        }
        
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String msg = message.getPayload(); // 기본 JSON 형태

		// JACSKON 으로 파싱
		HashMap<String, Object> result = mapper.readValue(msg, HashMap.class);
		
		// 파싱된 값중 RoomId 찾아서, 해당 RoomId 의 모든 연결된 사람에게 텍스트 전달
		System.out.println(result);
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
	}
}
