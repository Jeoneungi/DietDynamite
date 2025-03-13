package com.kh.dd.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.common.utility.Util;
import com.kh.dd.model.dao.MypageDAO;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.dto.UserHistory;
import com.kh.dd.model.dto.UserWorkout;

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
	public List<Board> getAllBoardsByUser(int userNo) {
		List<Board> boardList = dao.getAllBoardsByUser(userNo);
		return boardList;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateUserAuth(User userInput) {
		int updateResult = dao.updateUserAuth(userInput);
		return updateResult;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deleteUser(User userInput) {
		int deleteResult = dao.deleteUser(userInput);
		return deleteResult;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateUserInfo(Map<String, Object> requestData) {
		int updateResult = dao.updateUserInfo(requestData);
		return updateResult;
	}

	@Override
	public List<Place> getFavoriteplaces(int userNo) {
		List<Place> getFavoriteplaces = dao.getFavoriteplaces(userNo);
		return getFavoriteplaces;
	}

	@Override
	public List<UserWorkout> getUserWorkouts(int userNo) {
		List<UserWorkout> userWorkoutList = dao.getUserWorkouts(userNo);
		return userWorkoutList;
	}

	@Override
	public List<UserHistory> getUserHistory(int userNo) {
		List<UserHistory> userHistoryList = dao.getUserHistory(userNo);
		return userHistoryList;
	}

	@Override
	public List<Reply> getUserReplies(int userNo) {
		List<Reply> getUserReplies = dao.getUserReplies(userNo);
		return getUserReplies;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int changeUserProfileImg(MultipartFile profileImage, String webPath, String folderPath, User loginUser) throws IllegalStateException, IOException {
		// 프로필 이미지 변경 실패 대비
		String prevImg = loginUser.getUserImage(); // 이전 이미지 저장
		String rename = null; // 변경된 이름을 저장할 변수
		
		if(profileImage.getSize() > 0) { // 업로드된 이미지가 있을 경우
			rename = Util.fileRename(profileImage.getOriginalFilename());
			loginUser.setUserImage(webPath + rename);
								/* /resources/images/member/2020sadkfjaskf/jpg */
		} else {
			loginUser.setUserImage(null);
		}
		
		int result = dao.changeUserProfileImg(loginUser);
		if(result > 0) { // 성공
			if(rename != null) { // 새 이미지가 업로드 된 경우
				profileImage.transferTo(new File(folderPath + rename));
			}
		} else {
			loginUser.setUserImage(prevImg); // 이전 이미지로 프로필 다시 세팅
		}
		
		return result;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int restUserProfileImg(User loginUser) {
		int result = dao.changeUserProfileImg(loginUser);
		loginUser.setUserImage("/resources/images/profile/user_img2.jpg");
		return result;
	}
}
