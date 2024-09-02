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
	


	// 즐겨찾기 정보 얻어오기 
	public List<Place> getAllPlaces() {
		return sqlSession.selectList("favoritePlaceMapper.getAllPlaces");
	}

	// 새로운 장소를 즐겨찾기에 추가 
	public int addPlace(Place place) {
		return sqlSession.insert("favoritePlaceMapper.insertPlace", place);
	}

}
