package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor

public class Place {
	private int placeApiId;
	private String placeImg;
	private int userNo;
	private String placeName;
	private double placeLatitude;
	private double placeLongitude;
	private String placeAddress;
	private String placePhone;
	private String placeMajorCategory;
	private String placeMinorCategory;
}

