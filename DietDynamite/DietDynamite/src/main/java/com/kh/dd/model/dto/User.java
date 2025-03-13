package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class User {

   private int userNo;
   private String userId;
   private String userPw;
   private String userEmail;
   private String userNickname;
   private String userBirthDay;
   private String userGender;
   private String userAuthority;
   private String userImage;
   private String createDate;
   private String deleteDate;
   private int userProfileHeight;
   private int userProfileWeight;
}