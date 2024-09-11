<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="diaryList" value="${map.diaryList}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
    <link rel="stylesheet" href="/resources/css/challenge/challengeList.css">
</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="challenge-list">
            <h6 class="fs-20__b">챌린지</h6>
            	
            	<div class="section">
            		<div class="section-title">전 체</div>
            		<div class="section-title">30일 체지방 줄이기</div>
            		<div class="section-title">챌린지 2</div>
            		<div class="section-title">챌린지 3</div>
            		<div class="section-title">챌린지 4</div>
            		<div class="section-title">챌린지 5</div>
            		<div class="section-title">챌린지 6</div>
            		<div class="section-title">챌린지 7</div>
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
					<%-- 
                    <tbody>
                       <c:choose>
                            <c:when test="${empty diaryList}">
                            <tr>
                                <th colspan="6">게시글이 존재하지 않습니다.</th>
                            </tr>
                            </c:when>

                        <c:otherwise>
                                <c:forEach var="board" items="${diaryList}" varStatus="status">
                                <tr class="${status.index % 2 == 1 ? 'base__llorange' : ''}">
                                    <td>${board.boardNo}</td>
                                    <td> 
                                        <a href="/diary/${boardType}/${board.boardNo}?cp=${pagination.currentPage}">${board.boardTitle}</a>   
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
                --%> </table>
                <%-- 
                <ul>
                    <li><a href="/diary/${boardType}?cp=1">&lt;&lt;</a></li>
                    <li><a href="/diary/${boardType}?cp=${pagination.prevPage}">&lt;</a></li>

                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}">
                        <c:choose>
                            <c:when test="${i==pagination.currentPage}">
                                <li><a class="current">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <li><a href="/diary/${boardType}?cp=${i}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    
                    </c:forEach>

                    <li><a href="/diary/${boardType}?cp=${pagination.nextPage}">&gt;</a></li>
                    <li><a href="/diary/${boardType}?cp=${pagination.maxPage}">&gt;&gt;</a></li>
                </ul>
					--%>
                <div class="diary-search">
                    <form action="#" method="get" id="diarySearch">

                        <select name="key" id="searchKey">
                            <option value="t">제목</option>
                            <option value="c">내용</option>
                            <option value="tc">제목+내용</option>
                            <option value="w">작성자</option>
                        </select>
        
                        <input type="text" name="query"  id="searchQuery" placeholder="검색어를 입력해주세요.">
        
                        <button class="btn-medium__lorange">검색</button>
                    </form>
                </div>
        </section>
        <section id="side-manu">
            <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>