package com.kh.dd.common.utilty;

import org.springframework.stereotype.Component;

@Component
public class UserInputHandling {
	public String XssHandler(String content) {
		content = content.replaceAll("<", "&lt;");
		content = content.replaceAll(">", "&gt;");
		content = content.replaceAll("&", "&amp;");
		content = content.replaceAll("\"", "&quot;");
		
		return content;
	}
}
