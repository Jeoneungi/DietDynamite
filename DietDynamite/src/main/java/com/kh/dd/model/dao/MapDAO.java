package com.kh.dd.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Place;
import com.kh.dd.model.dto.PlaceImg;
import com.kh.dd.model.dto.User;

@Repository
public class MapDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	// 로그인 후 장소 즐겨찾기 추가
	public int addPlace(Place place, User loginUser) {

		Map<String, Object> data = new HashMap<String, Object>();

		data.put("userNo", loginUser.getUserNo());
		data.put("place", place);

		return sqlSession.insert("favoritePlaceMapper.insertPlace", data);
	}

	// 즐겨찾기 정보 얻어오기
	public List<Place> getAllPlaces(User loginUser) {
		return sqlSession.selectList("favoritePlaceMapper.getAllPlaces", loginUser);
	}

	
	// 즐겨찾기 해제 
	public int deletePlace(int placeApiId, int userNo) {

		Map<String, Object> data = new HashMap<String, Object>();

		data.put("userNo", userNo);
		data.put("placeApiId", placeApiId);

		return sqlSession.delete("favoritePlaceMapper.deletePlace", data);
	}
	
	
	
	// 검색 후 db에서 id를 조회하여 이미지 검색
	public List<PlaceImg> searchImg(List<PlaceImg> placeImgList) {

		return sqlSession.selectList("favoritePlaceMapper.searchImg", placeImgList);
	}

	// 특정 장소의 모든 이미지 조회 메서드
	public List<PlaceImg> getAllImagesByPlaceId(int placeAPIid) {
		return sqlSession.selectList("favoritePlaceMapper.getAllImagesByPlaceId", placeAPIid);
	}

	// 차집합 후 db에 없는 이미지 크롤링하여 저장  
	public void saveImage(PlaceImg placeImg) {
		if (exists(placeImg.getPlaceAPIid())) {
			
		} else {
			sqlSession.insert("favoritePlaceMapper.saveImage", placeImg);
		}
	}

	// 차집합 후 db에 없는 이미지랑 카카오 
	public boolean exists(int placeAPIid) {
		Integer count = sqlSession.selectOne("favoritePlaceMapper.countByPlaceAPIid", placeAPIid);
		return count != null && count > 0;
	}

	public String getImageByPlaceId(String placeAPIid) {
		
	    return sqlSession.selectOne("favoritePlaceMapper.selectImageByPlaceId", placeAPIid);
	}

	public String getPlaceNameByPlaceName(String placeName) {
		
		return sqlSession.selectOne("favoritePlaceMapper.selectImageByPlaceName", placeName);
	}


	public boolean isPlaceAlreadyAdded(int placeApiId, User loginUser) {
		

		Map<String, Object> data = new HashMap<String, Object>();

		data.put("placeApiId", placeApiId);
		data.put("userNo",  loginUser.getUserNo() > 0) ;

		
		return sqlSession.selectOne("favoritePlaceMapper.checkIfPlaceAlreadyAdded", data);
	}




	
}
