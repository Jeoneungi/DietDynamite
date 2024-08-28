package com.kh.dd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("mypage")
public class MyPageController {
	
	@GetMapping("workoutDiary")
	public String workoutDiary() {
		return "mypage/mypageWorkoutDiary";
	}
	
	@GetMapping("myInfo")
	public String mypageMyInfo() {
		return "mypage/mypageMyInfo";
	}
	
}
