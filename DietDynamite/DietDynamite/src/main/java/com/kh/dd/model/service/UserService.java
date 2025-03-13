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
	
	// 자동 로그인 UUID 삭제 Service
	int deleteSessionUUDI(int userNo);
	
	// 자동 로그인 Filter 처리 Service
	User getLoginInfoFromSessionUUID(String existSessionID);
	
	// 아이디 찾기 Service
	User findId(User inputUser);



}
