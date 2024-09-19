package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Food {
	private int foodNo; //식품번호
	private int boardNo; // 게시물 번호 
	private String foodName;//식품이름
	private String foodType;//식품타입
	private int foodCal;//칼로리
	private int foodWeight;//식품중량
	private int foodCnt;//식품조회수

	// 음식정보 세부정보 추가
	
	private float foodProtein;
	private float foodFat;
	private float foodHydro;
	private float foodSugar;
	private float foodFiber;
	private float foodSOD;
	private float foodCOL;
	private float foodSATfat;
	private float foodTransFat;
	private String foodManufacture;
	
	
    private int servingSize; // 섭취량
    private int totalCalories; // 총 칼로리 
    
}
