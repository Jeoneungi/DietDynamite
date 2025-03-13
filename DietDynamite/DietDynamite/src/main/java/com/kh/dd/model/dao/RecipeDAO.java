package com.kh.dd.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Pagination;
import com.kh.dd.model.dto.Recipe;

@Repository
public class RecipeDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 리시피 수 조회
	public int getListCount() {
		return sqlSession.selectOne("recipeMapper.getListCount");
	}
	
	
	// 현재 페이지 레시피 목록
	public List<Recipe> selectRecipeList(Pagination pagination) {
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("recipeMapper.selectRecipeList", null, rowBounds);
	}

	// 레시피 상세 조회
	public List<Recipe> selectRecipeModal(String recipeNo) {
		return sqlSession.selectList("recipeMapper.selectRecipeModal",recipeNo);
	}

	// 레시피 작성
	public int RecipeInsert(Recipe recipe) {
		int result = 0;
		result = sqlSession.insert("recipeMapper.recipeInsert", recipe);
		if(result > 0) result = recipe.getRecipeNo();
		return result;
				
	}

	// 레시피 이미지 삽입
	public int insertRecipeImage(Recipe imgRecipe) {
		return sqlSession.update("recipeMapper.updateRecipeImage", imgRecipe);
		
	}

}
