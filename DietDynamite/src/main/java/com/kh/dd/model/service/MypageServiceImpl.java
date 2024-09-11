package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.MypageDAO;
import com.kh.dd.model.dto.User;

@Service
public class MypageServiceImpl implements MypageService {
	
	@Autowired
	private MypageDAO dao;

	@Override
	public List<User> getAllUserInfo() {
		List<User> userList = dao.getAllUserInfo();
		return userList;
	}
	
	@Override
	public List<User> searchUserInfo(int searchType, String searchParam) {
		List<User> userList = dao.searchUserInfo(searchType, searchParam);
		return userList;
	}

	@Override
	public int updateUserAuth(User userInput) {
		int updateResult = dao.updateUserAuth(userInput);
		return updateResult;
	}

	@Override
	public int deleteUser(User userInput) {
		int deleteResult = dao.deleteUser(userInput);
		return deleteResult;
	}

	@Override
	public int updateUserInfo(Map<String, Object> requestData) {
		int updateResult = dao.updateUserInfo(requestData);
		return updateResult;
	}

}
