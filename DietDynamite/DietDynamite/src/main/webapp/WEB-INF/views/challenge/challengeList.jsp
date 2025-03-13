<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="challengeList" value="${map.challengeList}"/>



<c:forEach items="${challengeTypeList}" var="challengeType">
	<c:if test="${challengeType.CHALLENGE_NO == challengeNo}">
		<c:set var="challengeName" value="${challengeType.CHALLENGE_NAME}" />
	</c:if>
</c:forEach>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />
<link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
<link rel="stylesheet" href="/resources/css/common.css">
<link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
<link rel="stylesheet" href="/resources/css/challenge/challengeList.css">
</head>
<body>
	<jsp:include page="/WEB-INF/views/layout/header.jsp" />

	<main>
		<section id="challenge-list">
			<h6 class="fs-20__b">챌린지</h6>



			<div class="challengeList-area">
				<button class="btn-medium__lorange listBox" style="font-size: 18px; color: black;"
					onclick="location.href='/challenge/0'">전 체</button>
							
				<!-- 버튼 클릭하면 해당 챌린지 페이지로 이동하게 JSP 구현 -->
				<c:forEach var="challenge" items="${challengeTypeList}"
					varStatus="status">
					<button class="btn-medium__lorange listBox"
						onclick="location.href='/challenge/${status.index + 1}'">${challenge.CHALLENGE_NAME}</button>
				</c:forEach>
			</div>
			<table>
				<thead>
					<tr class="base__orange fs-14__b">
						<th>글번호</th>
						<th>도전과제</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일</th>
						<th>조회수</th>
						<th>좋아요</th>
					</tr>
				</thead>
				<tbody>
					<c:choose>
						<c:when test="${empty challengeList}">
							<tr>
								<th colspan="6">게시글이 존재하지 않습니다.</th>
							</tr>
						</c:when>
                        <c:otherwise>
							<c:forEach var="board" items="${challengeList}"
								varStatus="status">
								<tr class="${status.index % 2 == 1 ? 'base__llorange' : ''}">
									<td>${board.boardNo}</td>
									<td>${board.challengeName}</td>
									<td><a
										href="/challenge/${board.challengeNo}/${board.boardNo}?cp=${pagination.currentPage}">${board.boardTitle}</a>
									</td>
									<td>${board.userNickname}</td>
									<td>${board.createDt}</td>
									<td>${board.boardCnt}</td>
									<td>${board.likeCount}</td>
								</tr>
							</c:forEach>
						</c:otherwise>
					</c:choose>


				</tbody>
			</table>
			<div class="diary-btn-area">

				<!-- 로그인 상태일 경우 글쓰기 버튼 노출 -->
				<c:if test="${!empty loginUser}">
					<button class="btn-medium__lorange" id="insertBtn">글쓰기</button>
				</c:if>

			</div>


			<ul>
				<li><a href="/challenge/${challengeNo}?cp=1">&lt;&lt;</a></li>
				<li><a
					href="/challenge/${challengeNo}?cp=${pagination.prevPage}">&lt;</a></li>

				<c:forEach var="i" begin="${pagination.startPage}"
					end="${pagination.endPage}">
					<c:choose>
						<c:when test="${i==pagination.currentPage}">
							<li><a class="current">${i}</a></li>
						</c:when>
						<c:otherwise>
							<li><a href="/challenge/${challengeNo}?cp=${i}">${i}</a></li>
						</c:otherwise>
					</c:choose>

				</c:forEach>

				<li><a
					href="/challenge/${challengeNo}?cp=${pagination.nextPage}">&gt;</a></li>
				<li><a
					href="/challenge/${challengeNo}?cp=${pagination.maxPage}">&gt;&gt;</a></li>
			</ul>
			<div class="diary-search">
				<form action="#" method="get" id="diarySearch">

					<select name="key" id="searchKey">
						<option value="t">제목</option>
						<option value="c">내용</option>
						<option value="tc">제목+내용</option>
						<option value="w">작성자</option>
					</select> <input type="text" name="query" id="searchQuery"
						placeholder="검색어를 입력해주세요.">

					<button class="btn-medium__lorange">검색</button>
				</form>
			</div>
		</section>
		<section id="side-manu">
			<jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp" />
		</section>
	</main>
	<jsp:include page="/WEB-INF/views/layout/footer.jsp" />
	<script src="/resources/js/challenge/challenge.js"></script>

</body>
</html>