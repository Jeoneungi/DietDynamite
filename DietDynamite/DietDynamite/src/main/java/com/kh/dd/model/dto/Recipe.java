package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Recipe {
	private int recipeNo;
	private int userNo;
	private String recipeTitle;
	private String recipeContent;
	private String recipeIngredient;
	private int recipePrice;
	private String recipeCookTime;
	private int recipeCal;
	private int recipeHydro;
	private int recipeProtein;
	private int recipeFat;
	private int recipeSod;
	private int recipeFiber;
	private int recipeCnt;
	private String recipeSt;
	private String credateDate;
	private String updateDate;
	private String recipeImage;
	private String recipeUrl;
}
