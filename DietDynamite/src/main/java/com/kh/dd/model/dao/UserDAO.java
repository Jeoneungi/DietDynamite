package com.kh.dd.model.dao;

import java.util.Map;

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


	
	/** 자동로그인 UUID 세팅 DAO
	 * @param map
	 * @return
	 */
	public int setLoginInfoFromSessionUUID(Map<String, Object> map) {
		return sqlSession.insert("setLoginInfoFromSessionUUID", map);
	}



	public User getLoginInfoFromSessionUUID(String existSessionID) {
		return sqlSession.selectOne("getLoginInfoFromSessionUUID", existSessionID);
	}

}
