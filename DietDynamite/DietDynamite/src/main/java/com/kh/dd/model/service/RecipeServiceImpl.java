package com.kh.dd.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.common.utility.Util;
import com.kh.dd.model.dao.RecipeDAO;
import com.kh.dd.model.dto.Board;
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


	// 레시피 작성
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int RecipeInsert(Recipe recipe, List<MultipartFile> images, String webPath, String filePath) throws IllegalStateException, IOException {
		int recipeNo = dao.RecipeInsert(recipe);
		int result = 0;
		System.out.println(recipeNo);
		
		if (recipeNo > 0) {
			List<String> fileNames = new ArrayList<>();
			for (MultipartFile image : images) {
				if (image != null && !image.isEmpty()) {
					String fileName = Util.fileRename(image.getOriginalFilename());
					File targetFile = new File(filePath, fileName);
					image.transferTo(targetFile);
					fileNames.add(fileName);

				}
			}
			
			
			if (!fileNames.isEmpty()) {
				for (String fileName : fileNames) {
					Recipe imgRecipe = new Recipe();
					imgRecipe.setRecipeNo(recipeNo);
					imgRecipe.setRecipeImage(webPath+fileName);
					result = dao.insertRecipeImage(imgRecipe);
				}
				
			}

			return recipeNo;
		}
			return 0;


	}
}
