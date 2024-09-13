package com.kh.dd.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Reply {
	
	private int replyNo;
    private String replyContent;
    private String replyDT;
    private int replyTargetNo;
    private int replyTypeNo;
    private int userNo;
    private String replyST;
    private int parentNo;
    private String userNickname;
    private String userImage;
    private int replyStar;

    // 댓글 목록
	private List<Reply> replyList;
    
}
