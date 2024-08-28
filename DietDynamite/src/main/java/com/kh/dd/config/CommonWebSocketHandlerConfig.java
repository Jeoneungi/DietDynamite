package com.kh.dd.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CommonWebSocketHandlerConfig extends TextWebSocketHandler{

	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("SOCKET 연결 성공");
		
        // 클라이언트로부터 탈취된 정보
        Map<String, Object> attributes = session.getAttributes();
        System.out.println(attributes);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String msg = message.getPayload(); // JSON 형태

		HashMap<String, Object> result = mapper.readValue(msg, HashMap.class);
		System.out.println(result);
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
	}
}
