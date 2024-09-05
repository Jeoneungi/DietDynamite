package com.kh.dd.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.UserService;

@Controller
@RequestMapping("/user")
@SessionAttributes("loginUser")
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
			, @RequestParam(value="saveId", required=false) String saveId,
			HttpServletResponse resp
			, RedirectAttributes ra) {
		
		System.out.println(inputUser);
		
		User loginUser = service.login(inputUser);
		
		System.out.println("로그인 유저 : " + loginUser);

		String path = "redirect:";

		if(loginUser != null) { 
			path += "/"; 
			model.addAttribute("loginUser", loginUser);

			Cookie cookie = new Cookie("saveId", loginUser.getUserId());

			if(saveId != null) {
				cookie.setMaxAge(60 * 60 * 24 * 30);


			} else { 
				cookie.setMaxAge(0);
			}

			cookie.setPath("/"); 
			resp.addCookie(cookie);

		}else { 
			path += referer; 
		}

		return path;
	}




	@GetMapping("/signup")
	public String singup() {
		return "user/signup";
	}
}
