package com.kh.dd.controller;

import java.io.IOException;
import java.security.Provider.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dd.model.dto.Recipe;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.RecipeService;

import oracle.jdbc.proxy.annotation.GetCreator;

@RequestMapping("/recipe")
@Controller
public class RecipeController {

	@Autowired
	private RecipeService service;

	@GetMapping("/main")
	public String RecipeMain(
			@RequestParam(value="cp", required = false, defaultValue = "1") int cp,
			Model model,
			@RequestParam Map<String, Object> paramMap) {

		Map<String, Object> map = service.selectRecipeList(cp);
		model.addAttribute("map",map);

		System.out.println(map);

		return "recipe/recipeMain";
	}

	
	@PostMapping(value = "/main", produces = "application/json")
	@ResponseBody
	public List<Recipe> RecipeMain(
			@RequestBody String recipeNo) {

		List<Recipe> recipeModal = service.selectRecipeModal(recipeNo);


		return recipeModal;
	}
	
	
	@PostMapping("/insert")
	public String RecipeInsert(Recipe recipe,
			HttpSession session,
			 @RequestPart(value = "images", required = false) List<MultipartFile> imageFile
			 ) {
		
		User user = (User) session.getAttribute("loginUser");
		
		recipe.setUserNo( user.getUserNo() ) ;
		String webPath = "/resources/images/recipe/";
		String filePath = session.getServletContext().getRealPath(webPath);
		
		try {
			int result = service.RecipeInsert(recipe,imageFile, webPath, filePath);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
		
		return "redirect:/recipe/main";
	}
	

}
