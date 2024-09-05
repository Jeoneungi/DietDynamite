package com.kh.dd.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.User;

@Repository
public class UserDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	public User login(User inputUser) {
		System.out.println("다오옴");
		return sqlSession.selectOne("userMapper.login", inputUser);
	}

}
