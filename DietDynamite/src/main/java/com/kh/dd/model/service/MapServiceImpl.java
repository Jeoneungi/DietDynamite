package com.kh.dd.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.MapDAO;
import com.kh.dd.model.dto.Place;

@Service

public class MapServiceImpl implements MapService{

	@Autowired
	private MapDAO dao;

	// 즐겨찾기 정보 얻어오기 
	@Override
	public List<Place> getAllPlaces() {
		return dao.getAllPlaces();
	}
	
	// 새로운 장소를 즐겨찾기에 추가 
	@Override
	public int addPlace(Place place) {
		return dao.addPlace(place);
    }


	
}
