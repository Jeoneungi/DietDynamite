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



	//게시글 상세조회
	public Board selectBoard(Map<String, Object> map) {
		return sqlSession.selectOne("diaryMapper.selectBoard", map);
	}


	//조회수 업데이트
	public int updateReadCnt(int boardNo) {
		return sqlSession.update("diaryMapper.updateReadCnt",boardNo);

	}





	//게시글 수 조회(검색)
	public int getListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("diaryMapper.getListCountForSearch",paramMap);
	}


	//게시글 목록 조회
	public List<Board> selectdiaryList(Map<String, Object> paramMap, Pagination pagination) {

		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();

		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		return sqlSession.selectList("diaryMapper.selectBoardListForSearch",paramMap,rowBounds);

	}
	
	//좋아요 여부확인
	public int boardLikeCheck(Map<String, Object> map) {

		return sqlSession.selectOne("diaryMapper.boardLikeCheck",map);

	}


	//좋아요 삽입
	public int insertBoardLike(Map<String, Integer> paramMap) {
		return sqlSession.insert("diaryMapper.insertBoardLike",paramMap);
	}

	//좋아요삭제
	public int deleteBoardLike(Map<String, Integer> paramMap) {
		return sqlSession.delete("diaryMapper.deleteBoardLike", paramMap);
	}

	//좋아요 개수 조회
	public int countBoardLike(int boardNo) {
		return sqlSession.selectOne("diaryMapper.countBoardLike", boardNo);
	}
	
	
	




}


