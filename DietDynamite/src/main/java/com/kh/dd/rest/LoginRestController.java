package com.kh.dd.rest;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dd.model.dto.User;

@RestController
@RequestMapping("/rest/login")
public class LoginRestController {

	@GetMapping("/loginTest")
	public void testLogin(HttpSession session){
		User loginUser = new User();
		loginUser.setUserNo(1);          
		loginUser.setUserId("a");          
		loginUser.setUserPw("a");          
		loginUser.setUserEmail("atest@test.com");       
		loginUser.setUserNickname("a");        
		loginUser.setUserBirthDay("19900101");    
		loginUser.setUserGender("F");      
		loginUser.setUserAtuhority("A");   
		loginUser.setUserImage("/resources/images/profile/user_img1.jpg");       
		loginUser.setUserProfileHeight(180);
		loginUser.setUserProfileWeight(70);
		
		session.setAttribute("loginUser", loginUser);
		if (loginUser != null) {
			session.setAttribute("loginUserNo", loginUser.getUserNo());			
		}
	}
}
