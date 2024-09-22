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
import com.kh.dd.model.dao.ChallengeDAO;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Challenge;
import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.exception.ImageDeleteException;



@Service
public class ChallengeServiceImpl implements ChallengeService{
	@Autowired
	private ChallengeDAO dao;


	//게시판 종류 목록 조회
	@Override
	public List<Map<String, Object>> selectChallengeTypeList() {
		return dao.selectChallengeTypeList();
	}

	//게시글 목록조회
	@Override
	public Map<String, Object> selectChallengeList(int challengeNo, int cp) {

		int listCount = dao.getListCount(challengeNo);

		Pagination pagination = new Pagination(cp, listCount);

		List<Board> challengeList = dao.selectChallengeList(challengeNo, pagination);

		//System.out.println(challengeList);

		Map<String, Object> map = new HashMap<String,Object>();
		map.put("pagination", pagination);
		map.put("challengeList", challengeList);
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
	public Map<String, Object> selectChallengeList(Map<String, Object> paramMap, int cp) {

		int listCount = dao.getListCount(paramMap);

		Pagination pagination = new Pagination(cp, listCount);

		//System.out.println(listCount);

		List<Board> challengeList = dao.selectChallengeList(paramMap,pagination);

		Map<String, Object> map = new HashMap<String,Object>();
		map.put("pagination", pagination);
		map.put("challengeList", challengeList);


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

		if(result == 0) return -1;
		int count = dao.countBoardLike(paramMap.get("boardNo"));
		return count;
	}

	//글쓰기
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int challengeInsert(Board board, List<MultipartFile> images, String webPath, String filePath)throws IllegalStateException, IOException, FileUploadException    {
		
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));

		int boardNo = dao.challengeInsert(board);

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
	public int challengeUpdate(Board board, MultipartFile image, String webPath, String filePath, String deleteList) throws IllegalStateException, IOException {

	    // 제목과 내용을 XSS 방지 처리
	    board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
	    board.setBoardContent(Util.XSSHandling(board.getBoardContent()));

	    // 게시물 업데이트
	    int rowCount = dao.challengeUpdate(board);

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
	public int challengeDelete(Map<String, Object> map) {
		
		return dao.challengeDelete(map);
	}

	//첼린지 정보 조회
	@Override
	public Challenge challengeInfo(int userChallengeNo) {

		return dao.challengeInfo(userChallengeNo);
	}
	
	// 유저 첼린지 조회
	@Override
	public int userChallengeSearch(Map<String, Integer> payLoad) {
		return dao.userChallengeSearch(payLoad);
	}

    // 첼린지정보 작성	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertChallenge(Map<String, Integer> map) {
		return dao.insertChallenge(map);
	}

    // 첼린지 삭제 업데이트
	@Transactional(rollbackFor = Exception.class)
	@Override
	public void challengeSecessionUpdate(int userNo) {
		dao.challengeSecessionUpdate(userNo);
	}

	// 일일 챌린지 결과 업데이트
	@Override
	public int dailyUpdate(int challengeNo) {
		return dao.dailyUpdate(challengeNo);
	}

	// 첼린지 완료 업데이트
	@Override
	public int complete(int challengeNo) {
		return dao.complete(challengeNo);
	}

	@Override
	public List<Map<String, String>> selectUserBadgeList(int userNo) {
		return dao.selectUserBadgeList(userNo);
	}

}