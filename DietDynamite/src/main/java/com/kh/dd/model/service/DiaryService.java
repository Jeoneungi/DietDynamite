package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

import com.kh.dd.model.dto.Board;

public interface DiaryService {

	//게시판 종류 목록 조회
	List<Map<String, Object>> selectBoardTypeList();
	
	//일기 목록 리스트
	Map<String, Object> selectDiaryList(int boardType,int cp);

	
	//게시글 상세조회
	Board selectBoard(Map<String, Object> map);

	//조회수 증가 서비스 호출
	int updateReadCnt(int boardNo);

	//좋아요 여부 확인 서비스
	int boardLikeCheck(Map<String, Object> map);

	

}
