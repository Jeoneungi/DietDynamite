package com.kh.dd.model.service;

import java.util.Map;

import com.kh.dd.model.dto.User;

public interface UserService {
	
	// 로그인 요청 처리 Service
	User login(User inputUser);

	// 회원가입 요청 처리 Service
	int signup(User inputUser);
	
	// 자동 로그인 체크시 UUID 세팅 Service
	int setLoginInfoFromSessionUUID(Map<String, Object> map);
	
	// 자동 로그인 Filter 처리 Service
	User getLoginInfoFromSessionUUID(String existSessionID);

}
