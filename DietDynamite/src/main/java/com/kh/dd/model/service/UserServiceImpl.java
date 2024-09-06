package com.kh.dd.model.service;

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
		
		if(loginUser != null) { 

			if(bcrypt.matches(inputUser.getUserPw(),loginUser.getUserPw() )) {

				loginUser.setUserPw(null);

			} else { 

				loginUser = null;

			}
		}
		return loginUser;
	}
	
	// 회원가입 요청처리
	@Override
	public int signup(User inputUser) {
		
		inputUser.setUserPw(bcrypt.encode(inputUser.getUserPw()));
		
		return dao.signup(inputUser);
	}

}
