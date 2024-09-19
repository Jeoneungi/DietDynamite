package com.kh.dd.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.dto.Workout;

@Repository
public class DietInfoDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	//음식검색
	public List<Food> foodInfoSearch(String query) {
		RowBounds rowBounds = new RowBounds(0, 10); 
		return sqlSession.selectList("dietInfoMapper.searchFood", query, rowBounds);
		
	}

	//운동검색
	public List<Workout> workoutInfoSearch(String query) {
		RowBounds rowBounds = new RowBounds(0, 10); 
		return sqlSession.selectList("dietInfoMapper.searchWorkout", query, rowBounds);
	}

	//음식 세부검색
	public List<Food> foodInfoDetail(int foodNo) {
		sqlSession.update("dietInfoMapper.updateFoodCount",foodNo);
		return sqlSession.selectList("dietInfoMapper.foodDetail", foodNo);
	}

	public List<Workout> workoutInfoDetail(int workoutNo) {
		return sqlSession.selectList("dietInfoMapper.workoutDetail", workoutNo);

	}
	
	


	





	








	
	




}


