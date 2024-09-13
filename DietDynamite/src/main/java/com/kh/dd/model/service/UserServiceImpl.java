package com.kh.dd.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.UserDAO;
import com.kh.dd.model.dto.User;


@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDAO dao;

	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	// 로그인 요청처리
	@Override
	public User login(User inputUser) {
		
		User loginUser = dao.login(inputUser);
		
		// 조회 결과가 있을 경우
		if(loginUser != null) { 
			 
			// 내가 입력한 비밀번호와(평문) DB에 저장된 비밀번호(암호문)가 일치 할 시
			if(bcrypt.matches(inputUser.getUserPw(),loginUser.getUserPw() )) {
				
				// 로그인 유저에 비밀번호를 null로 바꿈 (보안)
				loginUser.setUserPw(null);
			} else{ 
				loginUser = null;
			}
		}
		
		// 로그인 유저에 비밀번호가 바뀌었을 경우
		if(loginUser != null ) {
			
		}
		
		
		return loginUser;
	}
	
	
	// 회원가입 요청처리
	@Override
	public int signup(User inputUser) {
		int result = 0;
		inputUser.setUserPw(bcrypt.encode(inputUser.getUserPw()));
		result = dao.signup(inputUser);
		
		if(result > 0) {
			/* dao.insertUserSession() */
		}
		
		return result;
	}
	
	// 자동 로그인 체크 시 UUID 세팅
	@Override
	public int setLoginInfoFromSessionUUID(Map<String, Object> map) {
		return dao.setLoginInfoFromSessionUUID(map);
	}
	
	// 로그아웃 시 UUID 삭제
	@Override
	public int deleteSessionUUDI(int userNo) {
		return dao.deleteSessionUUDI(userNo);
	}
	
	
	// 자동 로그인 Filter 요청 처리
	@Override
	public User getLoginInfoFromSessionUUID(String existSessionID) {
		return dao.getLoginInfoFromSessionUUID(existSessionID);
	}

	
	// 아이디 찾기 요청 처리
	@Override
	public User findId(User inputUser) {
		return dao.findId(inputUser);
	}




}
