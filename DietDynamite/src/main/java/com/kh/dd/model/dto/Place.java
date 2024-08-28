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
	private int id;
	private String name;
	private double latitude;
	private double longitude;
	private String address;
	private String phone;

}

