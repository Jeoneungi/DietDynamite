package com.kh.dd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kh.dd.model.dto.Place;
import com.kh.dd.model.service.MapService;

@Controller
@RequestMapping("/map")
public class MapController {
	
	@Autowired
	private MapService service;
	
	// 맵 메인 페이지 이동 
	@GetMapping("/places")
	 public String showPlaces(Model model) {
        List<Place> places = service.getAllPlaces();
        model.addAttribute("places", places);
        return "map/main"; 
    }
	
	// 리뷰 상세페이지 이동 
	@GetMapping("/reviewDetail")
    public String showReviewDetailPage(@RequestParam("id") Long placeId, Model model) {
        Place place = service.getPlaceById(placeId);
        model.addAttribute("place", placeId);
        
        System.out.println(placeId);
        
        return "map/reviewDetail"; 
    }
	
	
	
}
