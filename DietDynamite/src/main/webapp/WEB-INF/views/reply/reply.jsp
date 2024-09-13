<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="replyArea">
	<!-- 댓글 목록 -->
	<div class="reply-list-area">
		<ul id="replyList">
			<c:forEach items="${board.replyList}" var="reply">
				<!-- 부모 댓글 -->
				<li class="reply-row">
					<p class="reply-writer">
						<!-- 프로필 이미지 -->
						<c:choose>
							<c:when test="${empty reply.userImage}">
								<img src="/resources/images/profile/user.png">
							</c:when>
							<c:otherwise>
								<img src="${reply.userImage}">
							</c:otherwise>
						</c:choose>

						<!-- 닉네임 -->
						<span>${reply.userNickname}</span>

						<!-- 작성일 -->
						<span class="reply-date"> ${reply.replyDT}</span>
					</p> <!-- 댓글 내용 -->
					<p class="reply-content">${reply.replyContent}</p> <!-- 버튼 영역 -->
					<div class="reply-btn-area">
						<button>답글</button>

						<!-- 로그인 회원과 댓글 작성자가 같은 경우 -->
						<c:if test="${loginMember.memberNo == reply.userNo}">
							<button>수정</button>
							<button>삭제</button>
						</c:if>
					</div>
				</li>
			</c:forEach>

		</ul>
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