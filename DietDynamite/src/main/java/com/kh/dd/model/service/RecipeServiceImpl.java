package com.kh.dd.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dd.model.dao.RecipeDAO;
import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.dto.Recipe;

@Service
public class RecipeServiceImpl implements RecipeService {
	@Autowired
	private RecipeDAO dao;

	@Override
	public Map<String, Object> selectRecipeList(int cp) {
		
		int listCount = dao.getListCount();
		
		Pagination pagination = new Pagination(cp ,listCount);
		
		List<Recipe> recipeList = dao.selectRecipeList(pagination);
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("pagination",pagination);
		map.put("recipeList", recipeList);
		
		
		return map;
	}
	
	

	@Override
	public List<Recipe> selectRecipeModal(String recipeNo) {
		return dao.selectRecipeModal(recipeNo);
	}



	@Override
	public int RecipeInsert(Recipe recipe) {
		return dao.RecipeInsert(recipe);
	}



}
