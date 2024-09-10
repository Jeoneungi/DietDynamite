package com.kh.dd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	@GetMapping(value = {"", "/workoutDiary"} )
	public String workoutDiary(Model model) {
		model.addAttribute("page", "workoutDiary");
		return "mypage/mypageWorkoutDiary";
	}
	
	@GetMapping("/favorites")
	public String mypageFavorites(Model model) {
		model.addAttribute("page", "favorites");
		return "mypage/mypageFavorites";
	}
	
	@GetMapping("/myInfo")
	public String mypageMyInfo(Model model) {
		model.addAttribute("page", "myInfo");
		return "mypage/mypageMyInfo";
	}
	
	@GetMapping("/resign")
	public String mypageResign(Model model) {
		model.addAttribute("page", "resign");
		return "mypage/mypageResign";
	}
	
	@GetMapping("/myReply")
	public String mypageReply(Model model) {
		model.addAttribute("page", "myReply");
		return "mypage/mypageMyReply";
	}
	
	@GetMapping("/myBoard")
	public String mypageBoard(Model model) {
		model.addAttribute("page", "myBoard");
		return "mypage/mypageMyBoard";
	}
	
	@GetMapping("/userManagement")
	public String mypageUserManagement(Model model) {
		model.addAttribute("page", "userManagement");
		return "mypage/mypageUserManagement";
	}
	
}
