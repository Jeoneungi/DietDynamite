package com.kh.dd.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserHistory {
	private int historyNo;
	private int userNo;
	private String loginDt;
	private String loginAuto;
	private String loginIp;
}
