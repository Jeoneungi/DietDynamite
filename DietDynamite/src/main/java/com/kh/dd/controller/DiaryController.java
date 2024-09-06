package com.kh.dd.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.User;
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
	
	//게시글 상세조회
	@GetMapping("/{barodCode}/{boardNo}")
	public String diaryDetail(@PathVariable("boardType") int boardType,
			@PathVariable("boardNo") int boardNo,
			Model model,
			RedirectAttributes ra,
			@SessionAttribute(value="loginUser", required=false) User loginMember
			, HttpServletRequest req
			, HttpServletResponse resp) throws ParseException {
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("boardType", boardType);
		map.put("boardNo", boardNo);
		
		Board board = service.selectBoard(map);
		
		
		return null;
	}

}