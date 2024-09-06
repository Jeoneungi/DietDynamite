package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

public interface DiaryService {

	//게시판 종류 목록 조회
	List<Map<String, Object>> selectBoardTypeList();
	
	//일기 목록 리스트
	Map<String, Object> selectDiaryList(int boardType,int cp);
	

}
