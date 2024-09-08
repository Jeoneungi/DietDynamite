
package com.kh.dd.rest;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.MapService;


@RestController
@RequestMapping("/rest/map")
@PropertySource("classpath:spring/app.properties")


public class MapRestController {

	@Autowired
	private MapService service;
	
	// 로그인 후 장소 즐겨찾기 추가 
	@PostMapping("/places/add")
	public int addPlace(@RequestBody Place place, HttpSession session) {
	    
	    User loginUser = (User) session.getAttribute("loginUser");

	    // placeMinorCategory 처리
	    String minorCategory = place.getPlaceMinorCategory();
	    if (minorCategory != null && !minorCategory.isEmpty()) {
	        String[] categories = minorCategory.split(">");
	        // ">"이 없는 경우 첫 번째 항목으로 저장
	        place.setPlaceMinorCategory(categories[categories.length - 1].trim());
	    }

	    // placeMajorCategory, placePhone의 null 처리
	    if (place.getPlaceMajorCategory() == null || place.getPlaceMajorCategory().isEmpty()) {
	        place.setPlaceMajorCategory("대분류 없음");
	    }
	    if (place.getPlacePhone() == null || place.getPlacePhone().isEmpty()) {
	        place.setPlacePhone("전화번호 없음");
	    }

	    return service.addPlace(place, loginUser);
	}
	

	// 즐겨찾기 목록 불러오기 (JSON 형식으로 반환)
	@GetMapping("/places/favorites")
	public List<Place> getAllPlaces( HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		return service.getAllPlaces(loginUser); 

	}
	
	@PostMapping("/places/remove")
    public int removePlace(@RequestBody Place place, HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");
        return service.removePlace(place.getPlaceApiId(), loginUser);
    }

}
