package com.kh.dd.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/login")
@PropertySource("classpath:spring/app.properties")
public class LoginController {
	
    // app.properties 내의 KAKAO_APP_KEY 값을 주입받음
    @Value("${app.KAKAO_APP_KEY}")
    private String KAKAO_APP_KEY;
}
