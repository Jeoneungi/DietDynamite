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

	@Override
	public User login(User inputUser) {

		System.out.println("암호화 확인 : " + bcrypt.encode(inputUser.getUserPw()));


		User loginUser = dao.login(inputUser);
		System.out.println("서비스임플 로그인유저 : " + loginUser);
		
		if(loginUser != null) { 

			if(bcrypt.matches(inputUser.getUserPw(),loginUser.getUserPw() )) {

				loginUser.setUserPw(null);

			} else { 

				loginUser = null;

			}
		}

		return loginUser;
	}

}
