package com.kh.dd.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@EnableWebSocket
@Configuration
public class CommonWebSocketConfig implements WebSocketConfigurer{

	@Autowired
	private CommonWebSocketHandlerConfig websocketHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(websocketHandler, "/ws/chat")
		.addInterceptors(new HttpSessionHandshakeInterceptor())
		.withSockJS();
	}
}
