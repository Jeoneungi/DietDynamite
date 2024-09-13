package com.kh.dd.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.dto.UserHistory;
import com.kh.dd.model.dto.UserWorkout;

public interface MypageService {

	List<User> getAllUserInfo();

	int updateUserAuth(User userInput);

	int deleteUser(User userInput);

	List<User> searchUserInfo(int searchType, String searchParam);

	int updateUserInfo(Map<String, Object> requestData);

	List<Board> getAllBoardsByUser(int userNo);

	List<Place> getFavoriteplaces(int userNo);

	List<UserWorkout> getUserWorkouts(int userNo);

	List<UserHistory> getUserHistory(int userNo);

	List<Reply> getUserReplies(int userNo);

	int changeUserProfileImg(MultipartFile profileImage, String webPath, String folderPath, User loginUser) throws IllegalStateException, IOException;

}
