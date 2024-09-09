package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class Board {
	
	private int boardNo; //게시글번호
	private int userNo; // 작성자번호
	private int boardType; //게시판타입번호
	private int challengeNo; // 챌린지타입번호
	private String boardTitle; // 제목
	private String boardContent; //내용
	private int boardCnt; //조회수
	private String boardSt; // 게시글 상태
	private String createDt; //작성일
	private String updateDt; //수정일
	private String boardImg; // 이미지
	
	// 회원 
	private String userNickname; 
	private String userImg;
	
	//좋아요
	private int likeCount; 

}
