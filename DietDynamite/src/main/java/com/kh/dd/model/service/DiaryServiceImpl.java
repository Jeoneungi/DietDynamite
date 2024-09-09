package com.kh.dd.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.dd.model.dao.DiaryDAO;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Pagination;



@Service
public class DiaryServiceImpl implements DiaryService{
	@Autowired
	private DiaryDAO dao;

	
	//게시판 종류 목록 조회
	@Override
	public List<Map<String, Object>> selectBoardTypeList() {
		return dao.selectBoardTypeList();
	}
	
	//게시글 목록조회
	@Override
	public Map<String, Object> selectDiaryList(int boardType,int cp) {
		
		int listCount = dao.getListCount(boardType);

	
		Pagination pagination = new Pagination(cp,listCount);
		
		List<Board> diaryList = dao.selectdiaryList(boardType,pagination);
		
		//System.out.println(diaryList);
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("pagination",pagination);
		map.put("diaryList", diaryList);
		return map;
		
		
	}

	//게시글 상세조회
	@Override
	public Board selectBoard(Map<String, Object> map) {
		return dao.selectBoard(map);
	}
	
	//조회수 증가
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateReadCnt(int boardNo) {
		return dao.updateReadCnt(boardNo);
	}

	//좋아요 여부확인 서비스
	@Override
	public int boardLikeCheck(Map<String, Object> map) {
		return dao.boardLikeCheck(map);
	}
	
	
	
	
	
	



}
