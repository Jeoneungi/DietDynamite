package com.kh.dd.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.model.dto.Recipe;

public interface RecipeService {

	Map<String, Object> selectRecipeList(int cp);

	List<Recipe> selectRecipeModal(String recipeNo);

	int RecipeInsert(Recipe recipe, List<MultipartFile> images, String webPath, String filePath) throws IllegalStateException, IOException, FileUploadException;;
	
}
