package com.kh.dd.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	public void savePlaces(List<PlaceImg> places) {
        for (PlaceImg place : places) {
            if (dao.existsByPlaceAPIid(place.getPlaceAPIid()) == 0) {
                dao.insertPlace(place);
            }
        }
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
	// db에 일치하는  이름 가져오고 있으면 이미지 삽입 없으면 크롤링 
	@Override
	public String getPlaceNameByPlaceName(String placeName) {
		return dao.getPlaceNameByPlaceName(placeName);
	}
	
	@Override
	public boolean isPlaceAlreadyAdded(int placeApiId, User loginUser) {
		
	    return dao.isPlaceAlreadyAdded(placeApiId,loginUser);
	}
	
	
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateImage(PlaceImg place) {
	    int result = dao.updateImage(place);
	    if (result == 0) {
	        throw new RuntimeException("이미지 업데이트 실패: " + place.getPlaceAPIid());
	    }
	    return result;
	}


	@Override
	public List<PlaceImg> findImageStatus(List<PlaceImg> placeImgList) {
		
		return dao.findImageStatus(placeImgList);
	}
	


}
