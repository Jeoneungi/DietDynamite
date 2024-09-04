package com.kh.dd.common.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kh.dd.model.dto.User;

@WebFilter(filterName =  "AuthCheckFilter" , urlPatterns = "/*")
public class AuthCheckFilter implements Filter {
	
	// 임시 자동 로그인 필터
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain ) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		
		HttpSession session =  req.getSession();

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
		
		chain.doFilter(request, response);
	}
}
