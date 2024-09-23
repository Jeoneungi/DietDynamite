package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.dd.model.dao.ReplyDAO;
import com.kh.dd.model.dto.Reply;
import com.kh.dd.common.utility.Util;

@Service
public class ReplyServiceImpl implements ReplyService {
	
	@Autowired
	private ReplyDAO dao;

	// 댓글 목록 조회 서비스
	@Override
	public List<Reply> select(Map<String, Object> map) {
		return dao.select(map);
	}

	// 댓글 등록 서비스
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insert(Reply map) {
		map.setReplyContent( Util.XSSHandling( map.getReplyContent() ));
		return dao.insert(map);
	}

	// 댓글 삭제 서비스
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int delete(int replyNo) {
		return dao.delete(replyNo);
	}

	// 댓글 수정 서비스
	@Override
	public int update(Reply reply) {
		reply.setReplyContent( Util.XSSHandling( reply.getReplyContent()));
		
		return dao.update(reply);
	}
	
	// 댓글 별점 수정 서비스  
	@Override
	public int updateStar(Reply reply) {
		return dao.updateStar(reply);
	}
	
	@Override
	public int getReplyCount(int replyTargetNo) {
        return dao.getReplyCount(replyTargetNo);
    }

}
