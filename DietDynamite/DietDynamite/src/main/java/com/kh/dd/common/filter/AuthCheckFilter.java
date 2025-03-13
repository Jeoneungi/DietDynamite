package com.kh.dd.common.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kh.dd.model.dto.User;

@WebFilter(filterName = "authCheckFilter", urlPatterns = {"/mypage/*"})
public class AuthCheckFilter implements Filter {
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		HttpSession session = req.getSession(false);
		User loginUser =  null;
		
		if (session != null) {
			loginUser = (User)session.getAttribute("loginUser");			
		}
		
		// 미로그인시 mypage 접속불가
		if (loginUser == null) {
			res.sendRedirect("/");
		
		// 로그인 이후 userManagement 접속시 권한 확인
		}else {
			int index = req.getRequestURI().lastIndexOf("/");
			String finalPath = req.getRequestURI().substring(index+1);
			
			if (finalPath.equals("userManagement")) {
				if (!loginUser.getUserAuthority().equals("A")) {
					res.sendRedirect("/");
				}
			}
		}

		chain.doFilter(request, response);
	}
}
