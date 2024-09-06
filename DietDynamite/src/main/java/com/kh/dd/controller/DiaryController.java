package com.kh.dd.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kh.dd.model.service.DiaryService;

@Controller
@RequestMapping("/diary")
public class DiaryController {

	@Autowired
	private DiaryService service;

	@GetMapping("/{boardType}")
	public String selectDiaryList(
			@PathVariable("boardType") int boardType,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp
			,Model model
			,@RequestParam Map<String, Object> paramMap ) {
		Map<String,Object> map = service.selectDiaryList(boardType,cp);
		

		
		model.addAttribute("map",map);
		return "diary/diary";

	}
}