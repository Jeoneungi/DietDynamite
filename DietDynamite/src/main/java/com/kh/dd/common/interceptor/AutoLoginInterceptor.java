package com.kh.dd.common.interceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.UserService;

public class AutoLoginInterceptor implements HandlerInterceptor{
	
	@Autowired
	private UserService service;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		
		HttpServletRequest req = (HttpServletRequest)request;
	      HttpServletResponse res = (HttpServletResponse)response;

	      String existSessionID = null;
	      Cookie[] cookies =  req.getCookies();
	      
	      if (cookies != null) {
	         // 1. 기존 세션ID 저장 쿠키인 rememberLogin 를 가져온다.
	          for (Cookie cookie : cookies) {
	              if (cookie.getName().equals("rememberLogin")) {
	                 existSessionID = cookie.getValue();
	                  break;
	              }
	          }
	         
	         // 2. 해당 쿠키 존재 + 로그인하지 않아있음 -> 로그인처리
	          HttpSession session = req.getSession(false);
	          User loginUser = null;
	          
	          if (session != null) {
	             loginUser = (User) session.getAttribute("loginUser");
	          }
	          
	          if (existSessionID != null && loginUser == null) {
	             // 1. DB 에서 USER INFO 가져온다
	             User loginInfo = service.getLoginInfoFromSessionUUID(existSessionID);
	             String isAuto = "Y";
	             
	             // 2. 로그인처리한다.
	             if (loginInfo != null) {
	                loginUser = loginInfo;
	             }
	             
	             // 3. 로그인 처리 성공시
	             if (loginUser != null) {
	               // History 추가
					/*
					 * service.updateUserHisotry(loginUser, isAuto);
					 * 
					 * // 회원탈퇴 취소 service.cancelUserResign(loginUser);
					 */
	               
	                session = req.getSession();
	                session.setMaxInactiveInterval(300);
	                session.setAttribute("loginUser", loginUser);
	             } else {
	                
	             }

	          }
	      }

		
		
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
