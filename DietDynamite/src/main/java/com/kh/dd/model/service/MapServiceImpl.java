package com.kh.dd.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.MapDAO;
import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.PlaceImg;
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
	// 즐겨찾기 해제 
	@Override
	public int removePlace(int placeApiId, User loginUser) {
		 return dao.deletePlace(placeApiId, loginUser.getUserNo());
	}

	// 검색 후 db에서 id를 조회하여 이미지 검색
	@Override
	public List<PlaceImg> searchImg(List<PlaceImg> placeImgList) {
		
		return dao.searchImg(placeImgList);
	}

	// 차집합 후 db에 없는 이미지 크롤링하여 저장 
	@Override
	public void saveImage(PlaceImg placeImg) {
		
		dao.saveImage(placeImg);
	}
	
	// 
	@Override
	public List<PlaceImg> getAllImagesByPlaceId(int placeAPIid) {
		return dao.getAllImagesByPlaceId(placeAPIid);
	}

	// db에 일치하는 api 가져오고 있으면 이미지 삽입 없으면 크롤링 
	@Override
	public String getImageByPlaceId(String placeAPIid) {
        return dao.getImageByPlaceId(placeAPIid);
    }


}
