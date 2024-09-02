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
	private int PlaceId;
	private String PlaceName;
	private double PlaceLatitude;
	private double PlaceLongitude;
	private String PlaceAddress;
	private String PlacePhone;

}

