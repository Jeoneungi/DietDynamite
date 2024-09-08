package com.kh.dd.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Place;
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
		return sqlSession.selectList("favoritePlaceMapper.getAllPlaces",loginUser);
	}

}
