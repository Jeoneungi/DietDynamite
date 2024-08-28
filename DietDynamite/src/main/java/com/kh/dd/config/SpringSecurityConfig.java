package com.kh.dd.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SpringSecurityConfig {

	@Bean
	public BCryptPasswordEncoder bcryptPasswordEncoder() {
		BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
		return bcryptPasswordEncoder;
	} 
}
