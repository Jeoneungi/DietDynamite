<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

	<div id="replyListContainer">
		<div id="replyList">
		</div>
	</div>


	<!-- 댓글 작성 부분 -->
	<div class="reply-write-area">
		<textarea id="replyContent"></textarea>
		<button id="addReply">
			댓글<br> 등록
		</button>
	</div>
	
	<jsp:include page="/WEB-INF/views/common/updateModal.jsp" />

</div>