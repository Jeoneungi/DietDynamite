package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserWorkout {
	private int userWorkoutNo;
	private int userNo;
	private int workoutNo;
	private String workoutName;
	private int analysisTypeNo;
	private String analysisTypeName;
	private int userWeight;
	private String workoutDate;
	private int workoutTime;
	private int workoutDistance;
	private int workoutCal;
}
