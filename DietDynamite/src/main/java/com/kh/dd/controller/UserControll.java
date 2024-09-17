package com.kh.dd.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.UserService;

@Controller
@RequestMapping("/user")
@SessionAttributes({"loginUser","loginUserNo"})

public class UserControll {

	@Autowired
	private UserService service;

	/** 로그인 화면 포워드
	 * @return "user/login"
	 */
	@GetMapping("/login")
	public String login() {
		return "user/login";
	}

	/** 로그인 요청 처리
	 * @param inputMember
	 * @param model
	 * @param referer
	 * @param saveId
	 * @param resp
	 * @param ra
	 * @return path
	 */

	@PostMapping("/login")
	public String login(User inputUser, Model model
			, @RequestHeader(value="referer") String referer
			, @RequestParam(value="autoLogin", required=false) String autoLogin,
			HttpServletResponse resp
			, RedirectAttributes ra) {

		User loginUser = service.login(inputUser);
		int result = 0;
		String path = null;

		if(loginUser != null) { // 로그인 성공시
			
			path = "main/main"; 
			model.addAttribute("loginUser", loginUser);
			model.addAttribute("loginUserNo", loginUser.getUserNo());
			
			if(autoLogin != null) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("userNo", loginUser.getUserNo());
				map.put("uuid", UUID.randomUUID().toString());

				result = service.setLoginInfoFromSessionUUID(map);

				if(result != 0) {
					Cookie cookie = new Cookie("rememberLogin", (String)map.get("uuid"));
					cookie.setMaxAge(60 * 60 * 24 * 365); 
					cookie.setPath("/"); 
					resp.addCookie(cookie);
				}
		

			}
			
		}else {
			path = "redirect:" + referer; 
		}
		
		return path;
	}


	@GetMapping("/signup")
	public String singup() {
		return "user/signup";
	}



	@PostMapping("/signup")
	public String singup(User inputUser,
			@RequestParam(value="ProfileHeight", required=false, defaultValue = "0") int ProfileHeight,
			@RequestParam(value="ProfileWeight", required=false, defaultValue = "0") int ProfileWeight,
			@RequestParam(value="BirthDay", required=false) String BirthDay,
			@RequestParam(value="Gender", required=false) String Gender) {



		inputUser.setUserProfileHeight(ProfileHeight);
		inputUser.setUserProfileWeight(ProfileWeight);

		// BirthDay(생일)이 입력되지 않았을 경우
		if(BirthDay.equals("")) inputUser.setUserBirthDay(null);
		else inputUser.setUserBirthDay(BirthDay);

		// Gender(성별)이 입력되지 않았을 경우
		if(Gender.equals("")) inputUser.setUserGender(null);
		else inputUser.setUserGender(Gender);

		System.out.println(inputUser);
		int result = service.signup(inputUser);

		System.out.println(result);
		String path = "";


		if(result > 0) {
			path = "user/login";
		} else {
			// 회원가입 실패
			path = "/";
		}
		return path;
	}
	
	@GetMapping("/findId")
	public String findId() {
		return "user/findId";
	}
	
	@PostMapping("/findId")
	public String findId(User inputUser) {
		User findUser = service.findId(inputUser);
		
		return "main/main";
	}
	
	/**
	 * @param session
	 * @param status
	 * @return
	 */
	@GetMapping("/logout")
	public String logout(HttpSession session, SessionStatus status, HttpServletResponse response, Model model){
		
		HttpServletResponse resp = (HttpServletResponse)response;
		int result = 0;
		 // 로그아웃 시 rememberLogin 초기화 (자동 로그인 해제)
		 Cookie cookie = new Cookie("rememberLogin", null);
		 cookie.setPath("/"); 
		 cookie.setMaxAge(0);
		 resp.addCookie(cookie);
		 
	
		User user = (User) session.getAttribute("loginUser");
		 result = service.deleteSessionUUDI(user.getUserNo());
		 if(result < 0) {
			 System.out.println("삭제 실패");
		 }
		 status.setComplete();

		return "redirect:/";
	}
}
