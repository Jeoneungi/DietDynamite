package com.kh.dd.model.service;

import java.util.List;

import com.kh.dd.model.dto.Place;

public interface MapService {

	// 맵 정보 얻어오기
	List<Place> getAllPlaces();

	// 상세 페이지 이동 
	Place getPlaceById(Long placeId);

	// 새로운 장소를 즐겨찾기에 추가 
	int addPlace(Place place);
	

}
