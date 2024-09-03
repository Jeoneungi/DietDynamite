package com.kh.dd.controller;

import javax.servlet.http.HttpServletResponse;

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

@Controller
@RequestMapping("/user")
@SessionAttributes("loginUser")
public class UserControll {
	
	
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
	public String login(User inputMember, Model model
						, @RequestHeader(value="referer") String referer
						, @RequestParam(value="saveId", required=false) String saveId,
						HttpServletResponse resp
						, RedirectAttributes ra) {
		
		return "zz";
	}
	
	
	@GetMapping("/signup")
	public String singup() {
		return "user/signup";
	}
}
