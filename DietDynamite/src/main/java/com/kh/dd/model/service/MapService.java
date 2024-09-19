package com.kh.dd.model.service;

import java.util.List;

import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.PlaceImg;
import com.kh.dd.model.dto.User;

public interface MapService {

	// 즐겨찾기 불러오기
	List<Place> getAllPlaces(User loginUser);

	// 즐겨찾기 추가 
	int addPlace(Place place, User loginUser);

	// 즐겨찾기 해제
	int removePlace(int placeApiId, User loginUser);

	// 검색 후 id랑 Name을 먼저 저장 
	void savePlaces(List<PlaceImg> places);
	
	// 2. 장소 이미지가 이미 존재하는지 확인
    public List<PlaceImg> searchImg(List<PlaceImg> placeImgList);
    
    // 3. 장소 이미지 업데이트
    public int updateImage(PlaceImg place); 
	
    
	// 차집합 후 db에 없는 이미지 크롤링하여 저장 
	void saveImage(PlaceImg placeImg);

	// 
	List<PlaceImg> getAllImagesByPlaceId(int placeAPIid);

	// db에 일치하는 api 가져오고 있으면 이미지 삽입 없으면 크롤링 
	String getImageByPlaceId(String placeAPIid);
	String getPlaceNameByPlaceName(String placeName);

	boolean isPlaceAlreadyAdded(int placeApiId, User loginUser);



}
