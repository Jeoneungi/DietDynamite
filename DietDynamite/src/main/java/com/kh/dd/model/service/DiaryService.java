package com.kh.dd.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Workout;

public interface DiaryService {

	//일기 종류 목록 조회
	List<Map<String, Object>> selectBoardTypeList();
	
	//일기 목록 리스트
	Map<String, Object> selectDiaryList(int boardType,int cp);

	
	//일기 상세조회
	Board selectBoard(Map<String, Object> map);

	//조회수 증가 서비스 호출
	int updateReadCnt(int boardNo);

	//일기 목록 조회(검색)
	Map<String, Object> selectDiaryList(Map<String, Object> paramMap, int cp);

	
	//좋아요 여부 확인 서비스
	int boardLikeCheck(Map<String, Object> map);

	// 좋아요 눌렀을때 처리
	int like(Map<String, Integer> paramMap);

	//글쓰기
	int diaryInsert(Board board, List<MultipartFile> images, String webPath, String filePath) throws IllegalStateException, IOException, FileUploadException;

	//글수정
	int diaryUpdate(Board board, MultipartFile image, String webPath, String filePath, String deleteList)  throws IllegalStateException, IOException;

	//게시글 삭제
	int diaryDelete(Map<String, Object> map);

	//음식검색
	List<Food> searchFood(Map<String, Object> paramMap);

	//운동검색
	List<Workout> searchWorkout(Map<String, Object> paramMap);

	//음식정보추가
	int addFoodToDiary(Food food);

	//운동정보추가
	int addWorkoutToDiary(Workout workout);

	//게시판상세 음식정보조회
	List<Food> getFoodItems(int boardNo);

	//게시판상세 운동정보조회
	List<Workout> getWorkoutItems(int boardNo);

	//음석정보 업데이트
	int updateFoodInDiary(Food food);
	
	//운동정보업데이트
	int updateWorkoutInDiary(Workout workout);

	 // 게시글 업데이트 메소드
    int updateBoard(Board board);

  
  
 
	
	

}
