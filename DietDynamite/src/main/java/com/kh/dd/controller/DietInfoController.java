package com.kh.dd.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.DiaryService;

@SessionAttributes("loginUser")
@Controller
@RequestMapping("/dietInfo")
public class DietInfoController {

	//@Autowired
	//private ChallengeService service;

	@GetMapping("/1")
	public String selectDietInfo() {

	return "dietInfo/foodInfo";

	}

	// 상세조회
	@GetMapping("/{challengeType}/{challengeNo}")
	public String DietInfoDetail(@PathVariable("challengeType") int challengeType,
			@PathVariable("challengeNo") int challengeNo) {

		return "dietInfo/foodInfo";
	}
	
}