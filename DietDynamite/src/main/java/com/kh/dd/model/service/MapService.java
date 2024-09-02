package com.kh.dd.model.service;

import java.util.List;

import com.kh.dd.model.dto.Place;

public interface MapService {

	// 즐겨찾기 불러오기
	List<Place> getAllPlaces();

	// 새로운 장소를 즐겨찾기에 추가 
	int addPlace(Place place);

}
