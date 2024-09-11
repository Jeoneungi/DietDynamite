package com.kh.dd.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.User;

@Repository
public class MypageDAO {

	@Autowired
	private SqlSessionTemplate sqlsession;

	public List<User> getAllUserInfo() {
		List<User> userList = sqlsession.selectList("mypageMapper.getAllUserInfo");
		return userList;
	}

	public List<User> searchUserInfo(int searchType, String searchParam) {
		Map<String, String> searchTerm = new HashMap<>();
		
		switch (searchType) {
		case 1:
			searchTerm.put("searchType", "USER_ID");break;
		case 2:
			searchTerm.put("searchType", "USER_EMAIL");break;
		case 3:
			searchTerm.put("searchType", "USER_NICKNAME");break;
		default:
			break;
		}
		
		searchTerm.put("searchParam", searchParam);
		List<User> userList = sqlsession.selectList("mypageMapper.searchUserInfo", searchTerm);
		return userList;
	}
	
	public List<Board> getAllBoardsByUser(int userNo) {
		List<Board> boardList = sqlsession.selectList("mypageMapper.getAllBoardsByUser", userNo);
		return boardList;
	}
	
	public int updateUserAuth(User userInput) {
		int updateResult = sqlsession.update("mypageMapper.updateUserAuth", userInput);
		return updateResult;
	}
	
	public int updateUserInfo(Map<String, Object> requestData) {
		int updateResult = sqlsession.update("mypageMapper.updateUserInfo", requestData);
		return updateResult;
	}

	public int deleteUser(User userInput) {
		int deleteResult = sqlsession.update("mypageMapper.deleteUser", userInput);
		return deleteResult;
	}

	public List<Place> getFavoriteplaces(int userNo) {
		List<Place> getFavoriteplaces = sqlsession.selectList("mypageMapper.getFavoriteplaces", userNo);
		return getFavoriteplaces;
	}
}
