<<<<<<< Updated upstream
<<<<<<< HEAD

package com.kh.dd.rest;

import java.util.HashMap; import java.util.List; import java.util.Map; import
java.util.Set; import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired; import
org.springframework.context.annotation.PropertySource; import
org.springframework.web.bind.annotation.DeleteMapping; import
org.springframework.web.bind.annotation.GetMapping; import
org.springframework.web.bind.annotation.PostMapping; import
org.springframework.web.bind.annotation.RequestBody; import
org.springframework.web.bind.annotation.RequestMapping; import
org.springframework.web.bind.annotation.RequestParam; import
org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper; import
com.kh.dd.model.dto.Place; import com.kh.dd.model.dto.PlaceImg; import
com.kh.dd.model.dto.User; import com.kh.dd.model.service.MapService;

@RestController

@RequestMapping("/rest/map")

=======

package com.kh.dd.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.PlaceImg;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.MapService;

@RestController
@RequestMapping("/rest/map")
>>>>>>> Stashed changes
@PropertySource("classpath:spring/app.properties")

public class MapRestController {

<<<<<<< Updated upstream
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Autowired private MapService service;

	// 로그인 후 장소 즐겨찾기 추가

	@PostMapping("/places/add") public int addPlace(@RequestBody Place place,
			HttpSession session) {

		User loginUser = (User) session.getAttribute("loginUser");

		// placeMinorCategory 처리 String minorCategory =
		place.getPlaceMinorCategory(); if (minorCategory != null &&
				!minorCategory.isEmpty()) { String[] categories = minorCategory.split(">");
				// ">"이 없는 경우 첫 번째 항목으로 저장
				place.setPlaceMinorCategory(categories[categories.length - 1].trim()); }

		// placeMajorCategory, placePhone의 null 처리 if (place.getPlaceMajorCategory()
		== null || place.getPlaceMajorCategory().isEmpty()) {
			place.setPlaceMajorCategory("대분류 없음"); } if (place.getPlacePhone() == null ||
					place.getPlacePhone().isEmpty()) { place.setPlacePhone("전화번호 없음"); }

			return service.addPlace(place, loginUser); }

	// 즐겨찾기 목록 불러오기 (JSON 형식으로 반환)

	@GetMapping("/places/favorites") public List<Place> getAllPlaces(HttpSession
			session) { User loginUser = (User) session.getAttribute("loginUser"); return
					service.getAllPlaces(loginUser);

	}

	@DeleteMapping("/places/remove") public int removePlace(@RequestBody Place
			place, HttpSession session) { User loginUser = (User)
			session.getAttribute("loginUser"); return
					service.removePlace(place.getPlaceApiId(), loginUser); }

	// // 즐겨찾기 목록 불러오기 (JSON 형식으로 반환) // @GetMapping("/test") // public void
	flaskCrawlingResult(String placeId, String placeImg) { //
		System.out.println(placeId); // System.out.println(placeImg); // // }


		// 검색 후 db에서 id를 조회하여 이미지 검색

		@PostMapping("/places/searchImg") public List<PlaceImg>
		searchImg(@RequestBody List<PlaceImg> placeImgList) { // placeImgList에서
			placeAPIid 추출 List<Integer> placeApiIds = placeImgList.stream()
					.map(PlaceImg::getPlaceAPIid) .collect(Collectors.toList());

			// DB에서 존재하는 Place ID 목록을 조회 List<PlaceImg> existingPlaceImgs =
			service.searchImg(placeImgList);

			// DB에서 존재하는 Place ID 목록을 Set으로 변환 Set<Integer> existingPlaceIdSet =
			existingPlaceImgs.stream() .map(PlaceImg::getPlaceAPIid)
			.collect(Collectors.toSet());

			// 클라이언트에서 받은 PlaceImg 리스트와 DB에서 존재하는 ID의 차집합 계산 List<PlaceImg> result =
			placeImgList.stream() .filter(placeImg ->
			!existingPlaceIdSet.contains(placeImg.getPlaceAPIid()))
			.collect(Collectors.toList());

			return result;

		}


		// 차집합 후 db에 없는 이미지 크롤링하여 저장

		@PostMapping("/place/saveImage") public List<PlaceImg> saveImage(@RequestBody
				PlaceImg placeImg) { service.saveImage(placeImg); return
						service.getAllImagesByPlaceId(placeImg.getPlaceAPIid()); }

		// db에 일치하는 api 가져오고 있으면 이미지 삽입 없으면 크롤링

		@GetMapping("/places/getImageByPlaceId") public String
		getImageByPlaceId(@RequestParam("placeAPIid") String placeAPIid) {
			System.out.println("차집합 후 크롤링된 이미지의 api id " + placeAPIid);

			String placeImg = service.getImageByPlaceId(placeAPIid);


			// json 파싱 작업 Map<String, Object> response = new HashMap<>();
			response.put("placeImg", placeImg != null ? placeImg : "");

			try { return objectMapper.writeValueAsString(response);

			} catch (Exception e) {

				e.printStackTrace(); return "{\"error\":\"JSON 변환 오류\"}"; } }



	}
}
=======
//
//package com.kh.dd.rest;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import javax.servlet.http.HttpSession;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.kh.dd.model.dto.Place;
//import com.kh.dd.model.dto.PlaceImg;
//import com.kh.dd.model.dto.User;
//import com.kh.dd.model.service.MapService;
//
//@RestController
//
//@RequestMapping("/rest/map")
//
//@PropertySource("classpath:spring/app.properties")
//
//public class MapRestController {
//
//	private final ObjectMapper objectMapper = new ObjectMapper();
//
//	@Autowired
//	private MapService service;
//
//	// 로그인 후 장소 즐겨찾기 추가
//
//	@PostMapping("/places/add") public int addPlace(@RequestBody Place place,
//  HttpSession session) {
//  
//  User loginUser = (User) session.getAttribute("loginUser");
//  
//  // placeMinorCategory 처리 String minorCategory =
//  place.getPlaceMinorCategory(); if (minorCategory != null &&
//  !minorCategory.isEmpty()) { String[] categories = minorCategory.split(">");
//  // ">"이 없는 경우 첫 번째 항목으로 저장
//  place.setPlaceMinorCategory(categories[categories.length - 1].trim()); }
//  
//  // placeMajorCategory, placePhone의 null 처리 if (place.getPlaceMajorCategory()
//  == null || place.getPlaceMajorCategory().isEmpty()) {
//  place.setPlaceMajorCategory("대분류 없음"); } if (place.getPlacePhone() == null ||
//  place.getPlacePhone().isEmpty()) { place.setPlacePhone("전화번호 없음"); }
//  
//  return service.addPlace(place, loginUser); }
//
//	// 즐겨찾기 목록 불러오기 (JSON 형식으로 반환)
//
//	@GetMapping("/places/favorites")
//	public List<Place> getAllPlaces(HttpSession session) {
//		User loginUser = (User) session.getAttribute("loginUser");
//		return service.getAllPlaces(loginUser);
//
//	}
//
//	@DeleteMapping("/places/remove")
//	public int removePlace(@RequestBody Place place, HttpSession session) {
//		User loginUser = (User) session.getAttribute("loginUser");
//		return service.removePlace(place.getPlaceApiId(), loginUser);
//	}
//
//	// // 즐겨찾기 목록 불러오기 (JSON 형식으로 반환) // @GetMapping("/test") // public void
//	flaskCrawlingResult(String placeId, String placeImg) { //
//  System.out.println(placeId); // System.out.println(placeImg); // // }
//  
//  
//  // 검색 후 db에서 id를 조회하여 이미지 검색
//  
//  @PostMapping("/places/searchImg") public List<PlaceImg>
//
//	searchImg(@RequestBody List<PlaceImg> placeImgList) { // placeImgList에서
//  placeAPIid 추출 List<Integer> placeApiIds = placeImgList.stream()
//  .map(PlaceImg::getPlaceAPIid) .collect(Collectors.toList());
//  
//  // DB에서 존재하는 Place ID 목록을 조회 List<PlaceImg> existingPlaceImgs =
//  service.searchImg(placeImgList);
//  
//  // DB에서 존재하는 Place ID 목록을 Set으로 변환 Set<Integer> existingPlaceIdSet =
//  existingPlaceImgs.stream() .map(PlaceImg::getPlaceAPIid)
//  .collect(Collectors.toSet());
//  
//  // 클라이언트에서 받은 PlaceImg 리스트와 DB에서 존재하는 ID의 차집합 계산 List<PlaceImg> result =
//  placeImgList.stream() .filter(placeImg ->
//  !existingPlaceIdSet.contains(placeImg.getPlaceAPIid()))
//  .collect(Collectors.toList());
//  
//  return result;
//  
//  }
//
//	// 차집합 후 db에 없는 이미지 크롤링하여 저장
//
//	@PostMapping("/place/saveImage")
//	public List<PlaceImg> saveImage(@RequestBody PlaceImg placeImg) {
//		service.saveImage(placeImg);
//		return service.getAllImagesByPlaceId(placeImg.getPlaceAPIid());
//	}
//
//	// db에 일치하는 api 가져오고 있으면 이미지 삽입 없으면 크롤링
//
//	@GetMapping("/places/getImageByPlaceId")
//	public String getImageByPlaceId(@RequestParam("placeAPIid") String placeAPIid) {
//		System.out.println("차집합 후 크롤링된 이미지의 api id " + placeAPIid);
//
//		String placeImg = service.getImageByPlaceId(placeAPIid);
//
//		// json 파싱 작업 Map<String, Object> response = new HashMap<>();
//		response.put("placeImg", placeImg != null ? placeImg : "");
//
//		try {
//			return objectMapper.writeValueAsString(response);
//
//		} catch (Exception e) {
//
//			e.printStackTrace();
//			return "{\"error\":\"JSON 변환 오류\"}";
//		}
//	}
//
//}
>>>>>>> f83f2a1ce4ae89fa7798a33c4a2e16da1037ce12
=======
	private ObjectMapper objectMapper;

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
	public List<Place> getAllPlaces(HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		return service.getAllPlaces(loginUser);

	}

	@DeleteMapping("/places/remove")
	public int removePlace(@RequestBody Place place, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		return service.removePlace(place.getPlaceApiId(), loginUser);
	}

	//	// 즐겨찾기 목록 불러오기 (JSON 형식으로 반환)
	//	@GetMapping("/test")
	//	public void flaskCrawlingResult(String placeId, String placeImg) {
	//		System.out.println(placeId);
	//		System.out.println(placeImg);
	//
	//	}

	// 검색 후 db에서 id를 조회하여 이미지 검색
	@PostMapping("/places/searchImg")
	public List<PlaceImg> searchImg(@RequestBody List<PlaceImg> placeImgList) {
		// placeImgList에서 placeAPIid 추출
		List<Integer> placeApiIds = placeImgList.stream().map(PlaceImg::getPlaceAPIid).collect(Collectors.toList());

		// DB에서 존재하는 Place ID 목록을 조회
		List<PlaceImg> existingPlaceImgs = service.searchImg(placeImgList);

		// DB에서 존재하는 Place ID 목록을 Set으로 변환
		Set<Integer> existingPlaceIdSet = existingPlaceImgs.stream().map(PlaceImg::getPlaceAPIid)
				.collect(Collectors.toSet());

		// 클라이언트에서 받은 PlaceImg 리스트와 DB에서 존재하는 ID의 차집합 계산
		List<PlaceImg> result = placeImgList.stream()
				.filter(placeImg -> !existingPlaceIdSet.contains(placeImg.getPlaceAPIid()))
				.collect(Collectors.toList());

		return result;

	}

	// 차집합 후 db에 없는 이미지 크롤링하여 저장

	@PostMapping("/place/saveImage")
	public List<PlaceImg> saveImage(@RequestBody PlaceImg placeImg) {
		service.saveImage(placeImg);

		return service.getAllImagesByPlaceId(placeImg.getPlaceAPIid());
	}

	// db에 일치하는 api 가져오고 있으면 이미지 삽입 없으면 크롤링

	@GetMapping("/places/getImageByPlaceId")
	public String getImageByPlaceId(@RequestParam("placeAPIid") String placeAPIid) {

		System.out.println("차집합 후 크롤링된 이미지의 api id " + placeAPIid);

		String placeImg = service.getImageByPlaceId(placeAPIid);

		// json 파싱 작업
		Map<String, Object> response = new HashMap<>();
		response.put("placeImg", placeImg != null ? placeImg : "");

		try {
			return objectMapper.writeValueAsString(response);

		} catch (Exception e) {

			e.printStackTrace();
			return "{\"error\":\"JSON 변환 오류\"}";
		}

	}

}
>>>>>>> Stashed changes
