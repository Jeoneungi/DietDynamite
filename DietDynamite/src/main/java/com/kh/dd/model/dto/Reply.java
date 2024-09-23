package com.kh.dd.model.dto;

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
    private String replyTargetTitle;
    private int replyTypeNo;
    private String replyTypeName;
    private int userNo;
    private String replyST;
    private int parentNo;
    private String userNickname;
    private String userImage;
    private int replyStar;    
    private int replyLike;    
    private int replyCheck;
}
