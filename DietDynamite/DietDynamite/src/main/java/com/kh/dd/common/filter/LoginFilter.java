
package com.kh.dd.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import com.kh.dd.model.dto.User;
@WebFilter(filterName = "loginFilter", urlPatterns = { "/user/*" })
public class LoginFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        if (!req.getRequestURI().equals("/logout")) {  
            chain.doFilter(request, response);
        } else {
            chain.doFilter(request, response); 
        }
    }
}
