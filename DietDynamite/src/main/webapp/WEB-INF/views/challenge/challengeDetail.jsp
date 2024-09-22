<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>





<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>챌린지</title>
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/challenge/challengeList.css">
    <link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
    <link rel="stylesheet" href="/resources/css/reply/reply-style.css">
    
    <script src="https://kit.fontawesome.com/4bef400c33.js" crossorigin="anonymous"></script>

</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-detail">
            <h3 class="fs-14 fc__gray"> <span class="fs-20__b">${board.challengeName} 챌린지 </span> ${challengeInfo.challengeDays}일차 </h3>
            <h4 class="fs-16"> ${board.boardTitle}</h4>
            <ul>
                <li>
                <c:choose>
                    <c:when  test="${empty board.userImg}">
                        <img src="/resources/images/profile/user_img1.jpg">
                    </c:when>
                    <c:otherwise>
                        <img src="${board.userImg}">
                    </c:otherwise>
                </c:choose>
                <li class="fs-14">${board.userNickname}</li>
                <li class="fs-14">                 
                <c:if test="${empty likeCheck}">
                <i class="fa-regular fa-heart" id="boardLike"></i>
                </c:if>
                <c:if test="${!empty likeCheck}">
                 <i class="fa-solid fa-heart" id="boardLike"></i>
                </c:if>
                <span>${board.likeCount}</span></li>

                <c:if test="${!empty badgeList}">
                    <div class="challenge-badge">
                        <c:forEach var="badge" items="${badgeList}">
                            <img src="${badge.CHALLENGE_PIC}">
                        </c:forEach>                  
                    </div>
                </c:if>

                <li class="fs-12 fc__gray">조회수 ${board.boardCnt} </li>
                <li class="fs-12 fc__gray">작성일 ${board.createDt}</li>
            </ul>
            
            <c:if test="${!empty board.boardImg}">
            <div>
                <img src="${board.boardImg}">
            </div>
            </c:if>

            <div class="diary-content">
                <h6 class="fs-14">챌린지 내용</h6>
                <span>${board.boardContent}</span>
            </div>
            <div class="diary-button">
            <c:if test="${loginUser.userNo == board.userNo}">
            <button class="btn-medium__lorange" id="updateBtn">수정</button>
            <button class="btn-medium__lorange" id="deleteBtn">삭제</button>
            </c:if>
            <button class="btn-medium__lorange" id="goToListBtn">목록으로</button>
            </div>
            
            <!-- 댓글 include-->
           <jsp:include page="/WEB-INF/views/reply/reply.jsp"/>
            
            
        </section>
            <section id="side-manu">
                <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
            </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>

        
    <script>
        window.boardNo = "${board.boardNo}";
        window.loginUserNo = "${loginUser.userNo}";
        window.boardType = "${board.boardType}";
        window.challengeNo = "${board.challengeNo}";
        window.todayResult = "${challengeInfo.todayResult}";
        window.challengeSecession = "${challengeInfo.challengeSecession}";


    </script>

    <script src="/resources/js/challenge/challengeDetail.js"></script>
    <script src="/resources/js/reply/reply.js"></script>
    
</body>
</html>