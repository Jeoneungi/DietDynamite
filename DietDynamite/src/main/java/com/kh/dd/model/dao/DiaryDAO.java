package com.kh.dd.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.dto.Workout;

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


	//게시글 삽입
	public int diaryInsert(Board board) {
		
		int result = sqlSession.insert("diaryMapper.boardInsert",board);
		if(result>0) result = board.getBoardNo();

		return result;
	}


	//게시글 이미지 삽입
	public int insertBoardImage(Board board) {
		   return sqlSession.update("diaryMapper.updateBoardImage", board);
	}


	//게시글 수정
	public int diaryUpdate(Board board) {
		return sqlSession.update("diaryMapper.updateDiary",board);
	}



	//이미지삭제
	public int imageDelete(Map<String, Object> deleteMap) {
	    return sqlSession.update("diaryMapper.imageDelete", deleteMap);
	}

	//삭제한이미지업로드
	public int updateBoardImagePath(Board board) {
	    return sqlSession.update("diaryMapper.updateBoardImagePath", board);
	}


	//게시글삭제
	public int diaryDelete(Map<String, Object> map) {
		return sqlSession.update("diaryMapper.diaryDelete",map);
	}


	//음식검색
	public List<Food> searchFood(Map<String, Object> paramMap) {

		return sqlSession.selectList("diaryMapper.searchFood",paramMap);
		
	}


	//운동검색
	public List<Workout> searchWorkout(Map<String, Object> paramMap) {
		return sqlSession.selectList("diaryMapper.searchWorkout",paramMap);

	}


	//운동정보추가
	public int addWorkoutToDiary(Workout workout) {
        return sqlSession.insert("diaryMapper.addWorkoutToDiary", workout);
	}

	//음식정보추가
	public int addFoodToDiary(Food food) {
        return sqlSession.insert("diaryMapper.addFoodToDiary", food);
	}


	//음식정보상세조회
	public List<Food> selectFoodItems(int boardNo) {
		return sqlSession.selectList("diaryMapper.selectFoodItems",boardNo);
	}


	//운동정보상세조회
	public List<Workout> selectWorkoutItems(int boardNo) {
		return sqlSession.selectList("diaryMapper.selectWorkoutItems",boardNo);
	}
	
	


	





	








	
	




}


