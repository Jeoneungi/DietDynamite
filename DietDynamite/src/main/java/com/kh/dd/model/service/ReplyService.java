package com.kh.dd.model.service;

import java.util.List;
import java.util.Map;

import com.kh.dd.model.dto.Reply;

public interface ReplyService {

	/** 댓글 목록 조회 서비스
	 * @param boardNo
	 * @return cList
	 */
	List<Reply> select(Map<String, Object> map);

	/** 댓글 등록 서비스
	 * @param map
	 * @return result
	 */
	int insert(Reply map);

	/** 댓글 삭제 서비스
	 * @param commentNo
	 * @return result
	 */
	int delete(int replyNo);

	/** 댓글 수정 서비스
	 * @param comment
	 * @return result
	 */
	int update(Reply reply);

}
