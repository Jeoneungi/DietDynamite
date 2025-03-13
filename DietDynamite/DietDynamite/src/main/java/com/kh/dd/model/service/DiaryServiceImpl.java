package com.kh.dd.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.common.utility.Util;
import com.kh.dd.model.dao.DiaryDAO;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.dto.Workout;
import com.kh.dd.model.exception.ImageDeleteException;



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
	    Board board = dao.selectBoard(map);
	    if (board != null) {
	        int likeCount = dao.countBoardLike(board.getBoardNo());
	        board.setLikeCount(likeCount); // 좋아요 수 설정
	    }
	    return board;
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
		int result;
		//System.out.println("ParamMap: " + paramMap);

		if(paramMap.get("check") == 0){// 좋아요 상태 X
			result = dao.insertBoardLike(paramMap);
	        //System.out.println("좋아요 추가 결과: " + result);

		}else { //좋아요 o
			result = dao.deleteBoardLike(paramMap);
	        //System.out.println("좋아요 삭제 결과: " + result);


		}

		 // 좋아요 수를 다시 계산하여 반환
	    if(result > 0) {
	        return dao.countBoardLike(paramMap.get("boardNo"));
	    }
	    return -1; 
	}

	//글쓰기
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int diaryInsert(Board board, List<MultipartFile> images, String webPath, String filePath)throws IllegalStateException, IOException, FileUploadException    {
		
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));

		int boardNo = dao.diaryInsert(board);
	    board.setBoardNo(boardNo);
		
		 if (boardNo > 0) {
		        List<String> fileNames = new ArrayList<>();
		        for (MultipartFile image : images) {
		            if (image != null && !image.isEmpty()) {
		                String fileName = Util.fileRename(image.getOriginalFilename());
		                File targetFile = new File(filePath, fileName);
		                image.transferTo(targetFile);
		                fileNames.add(fileName);
		        		
		            }
		        }
		        
		        if (!fileNames.isEmpty()) {
		            for (String fileName : fileNames) {
		                Board imgBoard = new Board();
		                imgBoard.setBoardNo(boardNo);
		                imgBoard.setBoardImg(webPath+fileName);
		                dao.insertBoardImage(imgBoard);
		                
		            }
		        }
			
            return boardNo;

		}

		return 0;
	}
	
	//게시글 수정
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int diaryUpdate(Board board, MultipartFile image, String webPath, String filePath, String deleteList) throws IllegalStateException, IOException {

	    // 제목과 내용을 XSS 방지 처리
	    board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
	    board.setBoardContent(Util.XSSHandling(board.getBoardContent()));

	    // 게시물 업데이트
	    int rowCount = dao.diaryUpdate(board);

	    if (rowCount > 0) {

	        // 1. 이미지 삭제 처리
	        if (deleteList != null && !deleteList.isEmpty()) {
	            List<String> deleteImagePaths = Arrays.asList(deleteList.split(","));
	            for (String imagePath : deleteImagePaths) {
	                Map<String, Object> deleteMap = new HashMap<>();
	                deleteMap.put("boardNo", board.getBoardNo());
	                deleteMap.put("deleteImagePath", imagePath);

	                // 데이터베이스에서 이미지 경로 삭제
	                rowCount = dao.imageDelete(deleteMap);

	                if (rowCount == 0) {
	                    throw new ImageDeleteException("Image deletion failed for path: " + imagePath);
	                }

	                // 서버에서 이미지 파일 삭제
	                File fileToDelete = new File(filePath, imagePath);
	                if (fileToDelete.exists()) {
	                    boolean deleted = fileToDelete.delete(); // 이미지 파일 삭제
	                    if (!deleted) {
	                        throw new IOException("Failed to delete image file: " + fileToDelete.getPath());
	                    }
	                }
	            }
	        }

	        // 2. 새로운 이미지 업로드 처리
	        if (image != null && !image.isEmpty()) {
	            String fileName = image.getOriginalFilename();
	            String renamedFileName = Util.fileRename(fileName);

	            // 서버에 새로운 이미지 저장
	            File targetFile = new File(filePath, renamedFileName);
	            image.transferTo(targetFile);

	            // 데이터베이스에 이미지 경로 저장
	            board.setBoardImg(webPath + renamedFileName);
	            rowCount = dao.insertBoardImage(board);
	        } else {
	            // 새로운 이미지가 없으면 이미지 경로를 NULL로 설정
	            board.setBoardImg(null);
	            rowCount = dao.updateBoardImagePath(board);
	        }
	    }

	    return rowCount;
	}

	//게시글 삭제
	@Override
	public int diaryDelete(Map<String, Object> map) {
		
		return dao.diaryDelete(map);
	}


	//음식검색
	@Override
	public List<Food> searchFood(Map<String, Object> paramMap) {
		return dao.searchFood(paramMap);
	}
	
	//운동검색
	@Override
	public List<Workout> searchWorkout(Map<String, Object> paramMap) {
		return dao.searchWorkout(paramMap);
	}

	//운동정보추가
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addWorkoutToDiary(Workout workout) {
		int result = dao.addWorkoutToDiary(workout);
	    if (result > 0) {
	        System.out.println("운동정보추가 " + workout.getBoardNo());
	    } else {
	        System.out.println("운동정보추가실패");
	    }
	    return result;
	}

	//음식정보추가
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addFoodToDiary(Food food) {
		//System.out.println("음식추가: " + food);
	    int result = dao.addFoodToDiary(food);
	    if (result > 0) {
	        System.out.println("음식추가성공: " + food.getFoodNo());
	    } else {
	        System.out.println("음식추가실패 " + food.getFoodNo());
	    }
	    return result;
	}

	//음식정보상세조회
	@Override
	public List<Food> getFoodItems(int boardNo) {
        return dao.selectFoodItems(boardNo);

	}

	//운동정보상세조회
	@Override
	public List<Workout> getWorkoutItems(int boardNo) {
		return dao.selectWorkoutItems(boardNo);
	}


	//음식정보업데이트
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateFoodInDiary(Food food) {
		
		System.out.println("음식업데이트: " + food);
	    int result = dao.updateFoodInDiary(food);;
	    if (result > 0) {
	        System.out.println("음식업데이트: " + food.getFoodNo());
	    } else {
	        System.out.println("음식업데이트 실패 " + food.getFoodNo());
	    }
	    return result;
	}


	//운동정보업데이트
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateWorkoutInDiary(Workout workout) {
		System.out.println("운동업데이트: " + workout);
	    int result = dao.updateWorkoutInDiary(workout);
	    if (result > 0) {
	        System.out.println("운동업데이트성공 " + workout.getWorkoutNo());
	    } else {
	        System.out.println("운동업데이트실패" + workout.getWorkoutNo());
	    }
	    return result;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateBoard(Board board) {
		return dao.updateBoard(board);
	}

	
	

	
}
		
		
		











