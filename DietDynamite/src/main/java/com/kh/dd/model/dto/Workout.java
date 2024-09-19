package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class Workout {
	private int workoutNo; //운동번호
	private int boardNo; // 게시물 번호 
	private String workoutName;//운동명
	private int workoutType;//측정분류
	private String workoutClass;//운동분류
	private int workoutMet;//단위체중당 소모칼로리
	private int workoutCnt;//운동조회수
	private int duration; // 운동 시간 
	private int caloriesBurned; // 소모된 칼로리 
}
