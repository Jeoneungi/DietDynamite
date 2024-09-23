package com.kh.dd.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.dd.model.dto.Reply;

@Repository
public class ReplyDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/**댓글 목록 조회 DAO
	 * @param boardNo
	 * @return cList
	 */
	public List<Reply> select(Map<String, Object> map) {
								// board-mapper.xml에 작성된 select 이용
		
	
		System.out.println("replyTypeNo : " + map.get("replyTypeNo"));
		
		Integer replyTypeNo = (Integer) map.get("replyTypeNo");

	    if (replyTypeNo != null && replyTypeNo.equals(3)) {
	        return sqlSession.selectList("diaryMapper.selectReplyList3", map);
	    }

	    if (replyTypeNo != null && replyTypeNo.equals(4)) {
	    	return sqlSession.selectList("diaryMapper.selectReplyList4", map);
	    }
	
		return sqlSession.selectList("diaryMapper.selectReplyList", map);
	}
	
	
	/** 댓글 등록 DAO
	 * @param map -> replyTypeNo, replyTargetNo 포함된 맵
	 * @return result
	 *
	 */
	public int insert(Reply map) {
		System.out.println(map);		
		return sqlSession.insert("replyMapper.insert", map);
	}

	/** 댓글 삭제 DAO
	 * @param commentNo
	 * @return result
	 */
	public int delete(int replyNo) {
		return sqlSession.update("replyMapper.delete", replyNo);
	}

	/** 댓글 수정 DAO
	 * @param comment
	 * @return result
	 */
	public int update(Reply reply) {
		// TODO Auto-generated method stub
		return sqlSession.update("replyMapper.update", reply);
	}


	/** 댓글 별점 수정 서비스 
	 * @param reply
	 * @return result 
	 */
	public int updateStar(Reply reply) {
		return sqlSession.update("replyMapper.updateStar",reply);
	}


	public int getReplyCount(int replyTargetNo) {
		
		return sqlSession.selectOne("replyMapper.getReplyCount",replyTargetNo);
	}

}
