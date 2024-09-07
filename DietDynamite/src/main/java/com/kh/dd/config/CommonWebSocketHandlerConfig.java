package com.kh.dd.config;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.dd.common.utilty.UserInputHandling;
import com.kh.dd.model.dto.ChatMessage;
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
	
	// 전체 채팅룸 중앙 관리
	private List<Map<Integer, Set<WebSocketSession>>> allChatRoomsWithSockets = new ArrayList<Map<Integer,Set<WebSocketSession>>>();
	
    // 초기화 작업을 @PostConstruct 를 사용해 @Bean 이 생성되고, @Autowired를 통해 의존성이 주입된 이후 호출되어
	// 안전하게 초기화 로직을 실행한다. ( 직접 기본생성자를 이용해 생성하면, 오류가 발생한다.)
    @PostConstruct
    public void init() {
        // 모든 채팅방 아이디를 가져온다.
        List<Integer> allChatRoomsId = chatService.getAllChatRoomsId();

        for (int roomId : allChatRoomsId) {
            Map<Integer, Set<WebSocketSession>> roomWithSessions = new HashMap<>();
            roomWithSessions.put(roomId, Collections.synchronizedSet(new HashSet<WebSocketSession>()));

            allChatRoomsWithSockets.add(roomWithSessions);
        }
    }
	
	// 로그인 유저 생성
	private User loginUser = null;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("[INFO] 채팅 SOCKET 연결 성공");
		
        // 클라이언트 접속시 WebSocketConfig 에서 addInterceptors 메서드를 사용
		//	로그인시 저장한 HttpSession 데이터를 WebSocketSession 에 추가하여, 로그인 유저 정보 알아냄
        Map<String, Object> attributes = session.getAttributes();
        loginUser = (User)attributes.get("loginUser");
        
        if (loginUser != null) {
        	int loginUserNo = loginUser.getUserNo();

        	// 로그인한 유저가 접속해있는 RoomId 를 전부 가져온다.
        	List<Integer> enteredChatRoomsId = chatService.getEnteredChatRoomsId(loginUserNo);
        	
        	// RoomId 를 이용해, ChatRoomSocket 에 넣는다.
            for (Map<Integer, Set<WebSocketSession>> map : allChatRoomsWithSockets) {
                for (Integer key : map.keySet()) {
                    if (enteredChatRoomsId.contains(key)) {
                        map.get(key).add(session);
                    }
                }
            }
        }            
	}

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
		
		chatMessage.setSenderNickname(senderInfo.getUserNickname());
		chatMessage.setSenderImage(senderInfo.getUserImage());
		chatMessage.setSendTime(formattedDateTime);
		chatMessage.setMessageContent(inputHandler.XssHandler(chatMessage.getMessageContent()));
		
		// DB 에 메시지 저장
		chatService.insertChat(chatMessage.getSenderNo(), chatMessage.getRoomNo(), chatMessage.getMessageContent());
		
		// roomNo 를 이용해 메시지 전달할 변수 찾음
        for (Map<Integer, Set<WebSocketSession>> map : allChatRoomsWithSockets) {
            for (Integer key : map.keySet()) {
                if(key == chatMessage.getRoomNo()) {
                	Set<WebSocketSession> sessionsForSend = map.get(key);
                	
                	// 메시지 전달
                	for (WebSocketSession s : sessionsForSend) {
                		s.sendMessage(new TextMessage(mapper.writeValueAsString(chatMessage)));
                	}
                }
            }
        }
		
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// 제거된 세션 정보를 제거
		removeSession(session);
	}
	
	// 세션을 제거하는 메서드
    public void removeSession(WebSocketSession sessionToRemove) {
        // 각 Map을 순회
        for (Map<Integer, Set<WebSocketSession>> chatRoomMap : allChatRoomsWithSockets) {
            // 각 Map의 Set을 순회
            for (Map.Entry<Integer, Set<WebSocketSession>> entry : chatRoomMap.entrySet()) {
                Set<WebSocketSession> sessions = entry.getValue();
                
                // 세션을 제거하기 위한 Iterator 생성
                Iterator<WebSocketSession> iterator = sessions.iterator();
                while (iterator.hasNext()) {
                    WebSocketSession session = iterator.next();
                    
                    // 세션 ID 비교
                    if (session.getId().equals(sessionToRemove.getId())) {
                        // 세션 제거
                        iterator.remove();
                    }
                }
            }
        }
    }
}
