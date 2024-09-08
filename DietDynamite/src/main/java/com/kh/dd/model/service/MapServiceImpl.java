package com.kh.dd.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.MapDAO;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.User;

@Service

public class MapServiceImpl implements MapService {

	@Autowired
	private MapDAO dao;

	// 로그인 후 장소 즐겨찾기 추가 
	@Override
	public int addPlace(Place place, User loginUser) {

		return dao.addPlace(place, loginUser);
	}

	// 즐겨찾기 정보 얻어오기
	@Override
	public List<Place> getAllPlaces(User loginUser) {

		return dao.getAllPlaces(loginUser);
	}


}
