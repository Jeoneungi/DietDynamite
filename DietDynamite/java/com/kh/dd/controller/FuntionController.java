package com.kh.dd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/functionPage")
public class FuntionController {
	
	
	@GetMapping("bmi")
	public String Bmi(){
		return "/functionPage/bmi";
	}
	
	@GetMapping("bmr")
	public String Bmr(){
		return "/functionPage/bmr";
	}

}
