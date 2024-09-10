package com.kh.dd.model.service;

import java.util.List;

import com.kh.dd.model.dto.User;

public interface MypageService {

	List<User> getAllUserInfo();

	int updateUserAuth(User userInput);

	int deleteUser(User userInput);

	List<User> searchUserInfo(int searchType, String searchParam);

}
