package com.kh.dd.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.common.utility.Util;
import com.kh.dd.model.dao.DiaryDAO;
import com.kh.dd.model.dao.DietInfoDAO;
import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.dto.Workout;
import com.kh.dd.model.exception.ImageDeleteException;


@Service
public class DietInfoServiceImpl implements DietInfoService{
	@Autowired
	private DietInfoDAO dao;


	//음식리스트 검색
	@Override
	public List<Food> foodInfoSearch(String query) {
		return dao.foodInfoSearch(query);
	}

	//운동리스트 검색
	@Override
	public List<Workout> workoutInfoSearch(String query) {
		return dao.workoutInfoSearch(query);
	}

	@Override
	public List<Food> foodInfoDetail(int foodNo) {
		return dao.foodInfoDetail(foodNo);
	}

	@Override
	public List<Workout> workoutInfoDetail(int workoutNo) {
		return dao.workoutInfoDetail(workoutNo);
	}
}



















