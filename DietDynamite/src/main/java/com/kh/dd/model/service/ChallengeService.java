package com.kh.dd.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Challenge;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Workout;

public interface ChallengeService {

	//첼린지 종류 목록 조회
	List<Map<String, Object>> selectChallengeTypeList();
	
	//첼린지 목록 리스트
	Map<String, Object> selectChallengeList(int boardType, int cp);

	
	//첼린지 상세조회
	Board selectBoard(Map<String, Object> map);

	//조회수 증가 서비스 호출
	int updateReadCnt(int boardNo);

	//챌린지 목록 조회(검색)
	Map<String, Object> selectChallengeList(Map<String, Object> paramMap, int cp);

	
	//좋아요 여부 확인 서비스
	int boardLikeCheck(Map<String, Object> map);

	// 좋아요 눌렀을때 처리
	int like(Map<String, Integer> paramMap);

	//글쓰기
	int challengeInsert(Board board, List<MultipartFile> images, String webPath, String filePath) throws IllegalStateException, IOException, FileUploadException;

	//글수정
	int challengeUpdate(Board board, MultipartFile image, String webPath, String filePath, String deleteList)  throws IllegalStateException, IOException;

	//게시글 삭제
	int challengeDelete(Map<String, Object> map);

	//챌린지 정보 받기
	Challenge challengeInfo(int userChallengeNo);

	//챌린지 유무 확인
	int userChallengeSearch(Map<String, Integer> paramMap);


    // 게시글에 챌린지 정보 포함
	int insertChallenge(Map<String, Integer> map);

	// 첼린지 당일에 따라 업데이트
	void challengeSecessionUpdate(int userNo);

	int dailyUpdate(int challengeNo);

	int complete(int challengeNo);

	List<Map<String, String>> selectUserBadgeList(int userNo);


}
