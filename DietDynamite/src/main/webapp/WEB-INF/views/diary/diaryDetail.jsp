<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>



<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>다이어트일기</title>
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/diary/diaryDetail.css">
    <link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
    <script src="https://kit.fontawesome.com/4bef400c33.js" crossorigin="anonymous"></script>

</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-detail">
            <h3 class="fs-20__b">다이어트 일기 <span class="fs-14 fc__gray">- 다이어트 일기</span></h3>
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
                <li class="fs-12 fc__gray">조회수  ${board.boardCnt} </li>
                <li class="fs-12 fc__gray">작성일 ${board.createDt}</li>
            </ul>
            
            <c:if test="${!empty board.boardImg}">
            <div>
                <img src="${board.boardImg}">
            </div>
            </c:if>

            <div class="diaryInfo">
                <div class="section">
                    <div class="section-title">오늘 먹은 음식</div>
                    <div class="item">
                        <span class="fs-12__b">비스킷(과자)</span>
                        <span class="item-content">300g</span>
                        <span class="item-content">446 Kcal</span>
                    </div>
                    <div class="section-title">오늘한 운동</div>
                    <div class="item">
                        <span class="fs-12__b">당구</span>
                        <span class="item-content">1시간</span>
                        <span class="item-content">184Kcal</span>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">누적 칼로리</div>
                    <div class="item">
                        <span class="fs-12__b">섭취</span>
                        <span class="item-content">446 Kcal</span>
                        <span class="fs-12__b">소모</span>
                        <span class="item-content">184Kcal</span>
                        <span class="fs-12__b">누적</span>
                        <span class="item-content">262Kcal</span>
                    </div>
             
                    <div class="section-title">몸무게 증감량 예상</div>
                        <div class="item">
                            <span class="fs-12__b">증가</span>
                            <span class="item-content">4.01kg</span>
                            <span class="fs-12__b">감소</span>
                            <span class="item-content">1.65kg</span>
                            <span class="fs-12__b">몸무게</span>
                            <span class="item-content">2.36kg 증가 예상</span>
                        </div>
                    </div>
              
            </div>
            <div class="diary-content">
                <h6 class="fs-14">일기</h6>
                <span>${board.boardContent}</span>
            </div>
            <div class="diary-button">
            <c:if test="${loginUser.userNo == board.userNo}">
            <button class="btn-medium__lorange" id="updateBtn">수정</button>
            <button class="btn-medium__lorange">삭제</button>
            </c:if>
            <button class="btn-medium__lorange" id="goToListBtn">목록으로</button>
            </div>
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
    </script>

    <script src="/resources/js/diary/diaryDetail.js"></script>
</body>
</html>