package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

import com.kh.dd.model.dto.Recipe;

public interface RecipeService {

	Map<String, Object> selectRecipeList(int cp);

	List<Recipe> selectRecipeModal(String recipeNo);

	int RecipeInsert(Recipe recipe);
	
}
