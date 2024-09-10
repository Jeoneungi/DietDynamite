package com.kh.dd.model.service;

import java.io.IOException;
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



	//게시글 목록 조회(검색)
	@Override
	public Map<String, Object> selectDiaryList(Map<String, Object> paramMap, int cp) {

		int listCount = dao.getListCount(paramMap);

		Pagination pagination = new Pagination(cp,listCount);

		//System.out.println(listCount);

		List<Board> diaryList = dao.selectdiaryList(paramMap,pagination);

		Map<String, Object> map = new HashMap<String,Object>();
		map.put("pagination",pagination);
		map.put("diaryList", diaryList);


		return map;
	}

	//좋아요 여부확인 서비스
	@Override
	public int boardLikeCheck(Map<String, Object> map) {
		return dao.boardLikeCheck(map);
	}

	//좋아요 눌렀을때 처리
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int like(Map<String, Integer> paramMap) {
		int result = 0;
	    //System.out.println("ParamMap: " + paramMap);

		if(paramMap.get("check") == 0){// 좋아요 상태 X
			result = dao.insertBoardLike(paramMap);
		}else { //좋아요 o
			result = dao.deleteBoardLike(paramMap);
			
		}
		
		if(result ==0) return -1;
		int count = dao.countBoardLike(paramMap.get("boardNo"));
		return count;
	}

	








}
