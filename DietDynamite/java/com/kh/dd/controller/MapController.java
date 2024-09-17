
package com.kh.dd.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.MapService;

@Controller

@RequestMapping("/map")

@PropertySource("classpath:spring/app.properties")
public class MapController {

	@Autowired
	private MapService service;

	// KAKAO_APP_KEY 값을 주입받음

	@Value("${app.KAKAO_APP_KEY}")
	private String KAKAO_APP_KEY;

	// 맵 메인 페이지 이동

	@GetMapping("/places")
	public String showPlaces(Place place, Model model) {
		model.addAttribute("places", place);
		model.addAttribute("kakaoKey", KAKAO_APP_KEY);

		return "map/map";
	}

	// 리뷰 상세페이지 이동

	@GetMapping("/reviewDetail")
	public String showReviewDetailPage(Place place, Model model, HttpSession session) {

		User loginUser = (User) session.getAttribute("loginUser");

		if (loginUser != null) {

			place.setUserNo(loginUser.getUserNo());
			model.addAttribute("loginUserNo", loginUser.getUserNo());

			// 좋아요 기능 호출

		}

		model.addAttribute("place", place);
		model.addAttribute("kakaoKey", KAKAO_APP_KEY);

		System.out.println(place);

		return "map/reviewDetail";
	}

}