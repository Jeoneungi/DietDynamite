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
		int result = 0;
		result = sqlSession.insert("userMapper.signup", inputUser);
		if(result > 0) result = inputUser.getUserNo();
		return result;
	}


	
	/** 자동로그인 UUID 세팅 DAO
	 * @param map
	 * @return
	 */
	public int setLoginInfoFromSessionUUID(Map<String, Object> map) {
		return sqlSession.insert("userMapper.setLoginInfoFromSessionUUID", map);
	}
	
	
	/** 자동로그인 UUID 삭제 DAO
	 * @param userNo
	 * @return
	 */
	public int deleteSessionUUDI(int userNo) {
		return sqlSession.delete("userMapper.deleteSessionUUDI", userNo);
	}


	/** Filter 자동 로그인 DAO
	 * @param existSessionID
	 * @return
	 */
	public User getLoginInfoFromSessionUUID(String existSessionID) {
		return sqlSession.selectOne("userMapper.getLoginInfoFromSessionUUID", existSessionID);
	}



	public User findId(User inputUser) {
		return sqlSession.selectOne("userMapper.findId",inputUser);
	}





}
