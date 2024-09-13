package com.kh.dd.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.MypageService;

@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	@Autowired
	private MypageService service;
	
	@GetMapping(value = {"", "/workoutDiary"} )
	public String workoutDiary(Model model) {
		model.addAttribute("page", "workoutDiary");
		return "mypage/mypageWorkoutDiary";
	}
	
	@GetMapping("/favorites")
	public String mypageFavorites(Model model) {
		model.addAttribute("page", "favorites");
		return "mypage/mypageFavorites";
	}
	
	@GetMapping("/myInfo")
	public String mypageMyInfo(Model model) {
		model.addAttribute("page", "myInfo");
		return "mypage/mypageMyInfo";
	}
	
	@GetMapping("/resign")
	public String mypageResign(Model model) {
		model.addAttribute("page", "resign");
		return "mypage/mypageResign";
	}
	
	@GetMapping("/myReply")
	public String mypageReply(Model model) {
		model.addAttribute("page", "myReply");
		return "mypage/mypageMyReply";
	}
	
	@GetMapping("/myBoard")
	public String mypageBoard(Model model) {
		model.addAttribute("page", "myBoard");
		return "mypage/mypageMyBoard";
	}
	
	@GetMapping("/userManagement")
	public String mypageUserManagement(Model model) {
		model.addAttribute("page", "userManagement");
		return "mypage/mypageUserManagement";
	}
	
	// 프로필 이미지 수정
	@PostMapping("/changeUserProfileImg")
	public String changeUserProfileImg(@RequestParam("inputProfieImg") MultipartFile inputProfieImg
			, @SessionAttribute("loginUser") User loginUser
			, RedirectAttributes ra
			, HttpSession session) throws IllegalStateException, IOException {
		
		// 웹 접근 경로
		String webPath = "/resources/images/profile/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		// 프로필 이미지 수정 서비스 호출
		int result = service.changeUserProfileImg(inputProfieImg, webPath, folderPath, loginUser);
		
		String message = null;
		if(result > 0) message = "프로필 이미지가 변경되었습니다.";
		else           message = " 프로필 이미지 변경 실패";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:/mypage/myInfo";
	}
	
}
