package com.kh.dd.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Pagination;

@Repository
public class DiaryDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//게시판 종류 목록 조회
	public List<Map<String, Object>> selectBoardTypeList() {
		return sqlSession.selectList("diaryMapper.selectBoardTypeList");
	}	
	
	
    //게시글 수 조회
	public int getListCount(int boardType) {
		
		return sqlSession.selectOne("diaryMapper.getListCount", boardType);
		
	}
	
	
	//현재 페이지에 해당하는 게시글 목록
	public List<Board> selectdiaryList(int boardType, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage()-1)* pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("diaryMapper.selectDiaryList",boardType, rowBounds);
		
	}


	
	
}


