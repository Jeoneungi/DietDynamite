package com.kh.dd.rest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.ArrayList;
import java.util.HashMap;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.model.dto.User;
import com.kh.dd.model.service.ReplyService;

// @Controller + @ResponseBody
@RestController // 요청/ 응답 처리(단, 모든 요청/응답은 비동기)
			// -> REST API 구축하기 위한 Controller
public class ReplyController {
	
	@Autowired
	private ReplyService service;
	
	// 댓글 목록 조회
	@GetMapping(value="/reply", produces = "application/json; charset=UTF-8")
	public List<Reply> select(int replyTypeNo, int replyTargetNo,
			@SessionAttribute(name = "loginUser", required = false) User loginUser) {
		
		Map<String, Object> map = new HashMap<>();
	
		
		map.put("replyTypeNo", replyTypeNo);
		map.put("replyTargetNo", replyTargetNo);
		
		System.out.println("로그인유저" + loginUser.getUserNo());
		
		List<Reply> rlist = service.select(map);
		List<Integer> likeSelect = new ArrayList<Integer>();
		
        if (loginUser.getUserNo() > 0) {
        	map.put("userNo", loginUser.getUserNo());

            likeSelect = service.likeSelect(map);
            System.out.println(likeSelect);
        }
        
        for (Reply reply : rlist) {
            if (likeSelect.contains(reply.getReplyNo())) {
                reply.setReplyCheck(1); // likeChecker에 replyNo가 있으면 replyLike를 1로 설정
            } else {
                reply.setReplyCheck(0); // 없으면 0으로 설정
            }
        }
                                
        return rlist; // Map -> JSON 변환 (HttpMessageConverter)
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
	
	//댓글 별점 수정 
	@PutMapping("/replyStar")
	public int updateStar(@RequestBody Reply reply) {
		return service.updateStar(reply);	
	}
	
	@GetMapping("/reply/count/{replyTargetNo}")
    public int getReplyCount(@PathVariable int replyTargetNo) {
        return service.getReplyCount(replyTargetNo);
    }
	

}
