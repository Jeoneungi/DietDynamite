package com.kh.dd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/diary")
public class DiaryController {
	
	@GetMapping("")
	public String DiaryList() {
		return "diary/diary";
	}
	
}
