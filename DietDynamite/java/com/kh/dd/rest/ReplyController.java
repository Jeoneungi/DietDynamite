package com.kh.dd.rest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.model.service.ReplyService;

// @Controller + @ResponseBody
@RestController // 요청/ 응답 처리(단, 모든 요청/응답은 비동기)
			// -> REST API 구축하기 위한 Controller
public class ReplyController {
	
	@Autowired
	private ReplyService service;
	
	// 댓글 목록 조회
	@GetMapping(value="/reply", produces = "application/json; charset=UTF-8")
	public List<Reply> select(int replyTypeNo, int replyTargetNo) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("replyTypeNo", replyTypeNo);
		map.put("replyTargetNo", replyTargetNo);
		
		System.out.println(map);
		
		return service.select(map); // List -> JSON 변환 (HttpMessageConverter)
	}
	
	// 댓글 등록
	@PostMapping("/reply")
	public int insert(@RequestBody Reply map) {
		System.out.println(map);
		
		return service.insert(map);
	}
	
	// 댓글 삭제
	@DeleteMapping("/reply")
	public int delete(@RequestBody int replyNo) {
		return service.delete(replyNo);
	}
	
	// 댓글 수정
	@PutMapping("/reply")
	public int update(@RequestBody Reply reply) {
		return service.update(reply);
	}

}
