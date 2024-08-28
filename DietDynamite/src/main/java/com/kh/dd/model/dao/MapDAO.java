package com.kh.dd.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Place;

@Repository
public class MapDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 맵 정보 얻어오기 
	public List<Place> getAllPlaces() {
		
        return sqlSession.selectList("favoritePlaceMapper.getAllPlaces");
    }

	// 상세 페이지 이동 
	public Place getPlaceById(Long placeId) {
		 return sqlSession.selectOne("favoritePlaceMapper.getPlaceById", placeId);
	}

	// 새로운 장소를 즐겨찾기에 추가 
	
	public int insertPlace(Place place) {
    	return sqlSession.insert("favoritePlaceMapper.insertPlace", place);
    }

}
