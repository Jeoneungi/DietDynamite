package com.kh.dd.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.model.dto.Board;
import com.kh.dd.model.dto.Food;
import com.kh.dd.model.dto.Workout;

public interface DietInfoService {

	//음식검색
	List<Food> foodInfoSearch(String query);

	//운동검색
	List<Workout> workoutInfoSearch(String query);

	List<Food> foodInfoDetail(int foodNo);


}
