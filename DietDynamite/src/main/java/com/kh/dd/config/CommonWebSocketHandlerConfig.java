package com.kh.dd.config;

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
import com.kh.dd.common.utility.Util;
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
	
	// 전체 채팅룸 중앙 관리
	private List<ChatRoom> allChatRooms = new ArrayList<ChatRoom>();
	
	// 유저의 세션관리를 위해, 유저No 와 session 을 맵핑
	private Map<Integer, WebSocketSession> userSessions = new HashMap<Integer, WebSocketSession>();
	
    @PostConstruct
    public void init() {
        // 모든 채팅방 아이디를 가져온다.
        List<Integer> allChatRoomsId = chatService.getAllChatRoomsId();

        // 채팅방 중앙관리를 위해 채팅방No 로 초기화 작업
        for (int roomId : allChatRoomsId) {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setRoomNo(roomId);
            Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
            chatRoom.setSessions(sessions);
        
            allChatRooms.add(chatRoom);
        }
    }

	// 로그인 유저 생성
	private User loginUser = null;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 클라이언트 접속시 WebSocketConfig 에서 addInterceptors 메서드를 사용, 로그인시 저장한 HttpSession 데이터를 WebSocketSession 에 추가하여, 로그인 유저 정보 알아냄
        Map<String, Object> attributes = session.getAttributes();
        loginUser = (User)attributes.get("loginUser");
        
        if (loginUser != null) {
        	int loginUserNo = loginUser.getUserNo();

        	// 로그인한 유저가 접속해있는 RoomNo 를 전부 가져온다.
        	List<Integer> enteredChatRoomsNo = chatService.getEnteredChatRoomsId(loginUserNo);
        	
        	// RoomId 를 이용해, ChatRoomSocket 에 넣는다.
            for (ChatRoom room : allChatRooms) {
            	for (int enteredChatRoomNo : enteredChatRoomsNo) {
            		if (room.getRoomNo() == enteredChatRoomNo) {
            			Set<WebSocketSession> enteredUserSessions =  room.getSessions();
            			enteredUserSessions.add(session);
            		}
            	}
            }
            
            // 유저 세션관리를 위해, 유저 세션관리 Map 에 추가
            userSessions.put(loginUserNo, session);
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
		chatMessage.setMessageContent(Util.XSSHandling(chatMessage.getMessageContent()));
		
		// DB 에 메시지 저장
		chatService.insertChat(chatMessage.getSenderNo(), chatMessage.getRoomNo(), chatMessage.getMessageContent());
		
		
		// roomNo 를 이용해 메시지 전달할 ChatRoom 찾음
        for (ChatRoom chatRoom : allChatRooms) {
        	if (chatRoom.getRoomNo() == chatMessage.getRoomNo()) {
        		Set<WebSocketSession> sessionsForSend = chatRoom.getSessions();
        		
        		sessionsForSend.parallelStream().forEach(s -> {
					try {
						s.sendMessage(new TextMessage(mapper.writeValueAsString(chatMessage)));
					} catch (Exception e) {
						e.printStackTrace();
					}
				});
        	}
        }
		
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// 제거된 세션 정보를 제거
		removeSession(session);
	}
	
	 // 채팅방 생성시 : 채팅방No 에 따른 추가 작업 수행
    public void addChatRoomsWithSockets(int roomNo, List<Integer> chatRoomMembersNo) {
    	
    	// 채팅방 중앙관리에 추가하기위해 chatRoom 초기화작업
    	ChatRoom chatRoom = new ChatRoom();
    	chatRoom.setRoomNo(roomNo);           
    	Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
        chatRoom.setSessions(sessions);
    	
    	// 채팅방 추가함과 동시에 접속해잇는 유저가 있다면, 해당 방에 미리 session 데이터를 넣어둔다.
		for (int userNo : chatRoomMembersNo) {
			for (Integer sessionUserNo : userSessions.keySet()) {
				if (sessionUserNo == userNo) {
					Set<WebSocketSession> enterdUserSessions = chatRoom.getSessions();
					enterdUserSessions.add(userSessions.get(sessionUserNo));
				}
			}
		}
		allChatRooms.add(chatRoom);
    }
	
	
	// 세션을 제거하는 메서드
    public void removeSession(WebSocketSession sessionToRemove) {
    	// 1. 채팅방 전체 관리 List 에서, 끊긴 session 정보 제거
    	for (ChatRoom chatRoom : allChatRooms) {
    		Set<WebSocketSession> enteredUserSessions =  chatRoom.getSessions();
    		
    		Iterator<WebSocketSession> iterator = enteredUserSessions.iterator();
    		
    		while (iterator.hasNext()) {
    			WebSocketSession session = iterator.next();
    			
    			if (session.getId().equals(sessionToRemove.getId())) {
    				iterator.remove();
    			}
    		}
    	}
    }
}
