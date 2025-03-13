package com.kh.dd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	@RequestMapping("/")
	public String mainForward() {
		System.out.println(getClass().getClassLoader().getResource("log4j.xml"));

		return "main/main";
	}
	
}
