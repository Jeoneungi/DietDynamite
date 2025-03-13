package com.kh.dd.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.dto.Workout;
import com.kh.dd.model.service.DiaryService;
import com.kh.dd.model.service.DietInfoService;

@SessionAttributes("loginUser")
@Controller
@RequestMapping("/dietInfo")
public class DietInfoController {

	@Autowired // DI
	private DietInfoService service;

	@GetMapping("/foodInfo")
	public String selectDietFoodInfo() {

		return "dietInfo/foodInfo";

	}

	@GetMapping("/workoutInfo")
	public String selectDietWorkoutInfo() {

		return "dietInfo/workoutInfo";

	}

	// 상세조회
	@GetMapping("/{challengeType}/{challengeNo}")
	public String DietInfoDetail(@PathVariable("challengeType") int challengeType,
			@PathVariable("challengeNo") int challengeNo) {

		return "dietInfo/foodInfo";
	}

	// 운동검색
	@GetMapping(value = "/workoutInfoSearch", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Workout> workoutInfosearch(String query) {
		if (query.equals(""))
			return new ArrayList<Workout>();
		else
			return service.workoutInfoSearch(query);
	}

	// 운동 세부정보 검색
	@GetMapping(value = "/workoutInfoDetail", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Workout> woorkoutInfoDetail(@RequestParam("workoutNo") int workoutNo) {

		return service.workoutInfoDetail(workoutNo);
	}

	// 음식 리스트 검색
	@GetMapping(value = "/foodInfoSearch", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Food> foodInfosearch(String query) {

		if (query.equals(""))
			return new ArrayList<Food>();
		else
			return service.foodInfoSearch(query);
	}

	// 음식 세부정보 검색
	@GetMapping(value = "/foodInfoDetail", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Food> foodInfoDetail(@RequestParam("foodNo") int foodNo) {

		return service.foodInfoDetail(foodNo);
	}

}
