package com.kh.dd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("member")
public class MemberControll {
	
	@GetMapping("login")
	public String login() {
		return "member/login";
	}
}
