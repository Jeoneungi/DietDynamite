package com.kh.dd.model.service;

import com.kh.dd.model.dto.User;

public interface UserService {
	
	// 로그인 요청 처리 Service
	User login(User inputUser);

	// 회원가입 요청 처리 Service
	int signup(User inputUser);

}
