
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

@PropertySource("classpath:spring/app.properties")

public class MapRestController {

	private final ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	private MapService service;

	// 로그인 후 장소 즐겨찾기 추가

	@PostMapping("/places/add")
	public int addPlace(@RequestBody Place place, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");

		// 중복 체크: 이미 해당 장소가 즐겨찾기 되어 있는지 확인
		boolean isAlreadyAdded = service.isPlaceAlreadyAdded(place.getPlaceApiId(), loginUser);

		if (isAlreadyAdded) {
			return -1; // 중복된 경우 -1을 반환
		}

		// placeMinorCategory 처리
		String minorCategory = place.getPlaceMinorCategory();
		if (minorCategory != null && !minorCategory.isEmpty()) {
			String[] categories = minorCategory.split(">");
			place.setPlaceMinorCategory(categories[categories.length - 1].trim());
		}

		// placeMajorCategory, placePhone의 null 처리
		if (place.getPlaceMajorCategory() == null || place.getPlaceMajorCategory().isEmpty()) {
			place.setPlaceMajorCategory("대분류 없음");
		}
		if (place.getPlacePhone() == null || place.getPlacePhone().isEmpty()) {
			place.setPlacePhone("전화번호 없음");
		}
		
		System.out.println(place);
		System.out.println(loginUser);

		return service.addPlace(place, loginUser); // 정상적으로 추가
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

	@PostMapping("/places/saveInfo")
	public String savePlaces(@RequestBody List<PlaceImg> places) {
		try {
			service.savePlaces(places);
			return "Places saved successfully.";
		} catch (Exception e) {
			// 에러 메시지를 콘솔에 출력하고 에러 내용을 반환
			System.err.println("Error saving places: " + e.getMessage());
			return "Error saving places: " + e.getMessage();
		}
	}

	// 2. 장소 이미지가 이미 존재하는지 확인하는 API
	@PostMapping("/places/searchImg")
	public List<PlaceImg> searchImages(@RequestBody List<PlaceImg> placeImgList) {

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

		// DB에서 존재하지 않는 Place들에 대한 PlaceName 포함 반환
		return result;
	}

	// 3. 크롤링 후 이미지 업데이트 API
	@PostMapping("/places/updateImage")
	public int updateImage(@RequestBody PlaceImg place) {
	    System.out.println("수신된 데이터: " + place); // place 객체의 내용을 출력
	    System.out.println("placeAPIid: " + place.getPlaceAPIid()); // placeAPIid 값이 있는지 확인
	    System.out.println("placeImg: " + place.getPlaceImg()); // placeImg 값이 제대로 전달되었는지 확인

	    if (place.getPlaceImg() == null || place.getPlaceImg().isEmpty()) {
	        System.out.println("placeImg 값이 없습니다. 업데이트를 중단합니다.");
	        return 0;  // 업데이트 실패
	    }

	    return service.updateImage(place);
	}



	// db에 일치하는 api 가져오고 있으면 이미지 삽입 없으면 크롤링
	@GetMapping("/places/getImageByPlaceId")
	public String getImageByPlaceId(@RequestParam("placeAPIid") String placeAPIid) {
		System.out.println("차집합 후 크롤링된 이미지의 api id " + placeAPIid);

		String placeImg = service.getImageByPlaceId(placeAPIid);
		String placeName = service.getPlaceNameByPlaceName(placeAPIid); // PlaceName 조회 추가

		// json 파싱 작업
		Map<String, Object> response = new HashMap<>();
		response.put("placeImg", placeImg != null ? placeImg : "");
		response.put("placeName", placeName != null ? placeName : "Unknown");

		try {
			return objectMapper.writeValueAsString(response);

		} catch (Exception e) {
			e.printStackTrace();
			return "{\"error\":\"JSON 변환 오류\"}";
		}
	}

}
