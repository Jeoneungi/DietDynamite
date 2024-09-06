package com.kh.dd.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.User;

@Repository
public class UserDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 로그인 요청 처리 DAO
	 * @param inputUser
	 */
	public User login(User inputUser) {
		return sqlSession.selectOne("userMapper.login", inputUser);
	}
	
	
	
	/** 회원가입 요청 처리 DAO
	 * @param inputUser
	 * @return
	 */
	public int signup(User inputUser) {
		return sqlSession.insert("userMapper.signup", inputUser);
	}

}
