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
    <link rel="stylesheet" href="/resources/css/reply/reply-style.css">
    <script src="https://kit.fontawesome.com/6c46ba8282.js" crossorigin="anonymous"></script>



</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-detail">
            <h3 class="fs-20__b">다이어트 일기 <span class="fs-14 fc__gray">- 다이어트 일기</span></h3>
            <h4 class="fs-16">${board.boardTitle}</h4>
            <ul>
                <li>
                <c:choose>
                    <c:when test="${empty board.userImg}">
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
                <li class="fs-12 fc__gray">조회수 ${board.boardCnt}</li>
                <li class="fs-12 fc__gray">작성일 ${board.createDt}</li>
            </ul>
            
            <c:if test="${!empty board.boardImg}">
            <div>
                <img src="${board.boardImg}">
            </div>
            </c:if>

            <div class="diaryInfo">
                <!-- 음식 정보 표시 -->
                <div class="section">
                        <div class="section-title" id="openFoodBtn">오늘 먹은 음식</div>
                    <c:if test="${!empty foodItems}">
                            <div class="item" id="food-item">
                        <c:forEach var="food" items="${foodItems}">
                                <span class="fs-12__b">${food.foodName}</span>
                                <span class="item-content">${food.totalWeight}g</span>
                                <span class="item-content">${food.totalCalories} Kcal</span>
                        </c:forEach>
                            </div>
                    </c:if>
                    

                    <!-- 운동 정보 표시 -->
                        <div class="section-title" id="openExerciseBtn">오늘 한 운동</div>
                    <c:if test="${!empty workoutItems}">
                        <c:forEach var="workout" items="${workoutItems}">
                            <div class="item" id="work-item">
                                <span class="fs-12__b">${workout.workoutName}</span>
                                <span class="item-content">${workout.duration}분</span>
                                <span class="item-content">${workout.caloriesBurned} Kcal</span>
                            </div>
                        </c:forEach>
                    </c:if>
                </div>

                        
                <!-- 누적 칼로리 계산 및 표시 -->
                <c:if test="${!empty totalIntake || !empty totalBurned}">
                    <div class="section">
                        <div class="section-title">누적 칼로리</div>
                        <div class="item">
                            <span class="fs-12__b">섭취</span>
                            <span class="item-content">${totalIntake} Kcal</span>
                            <span class="fs-12__b">소모</span>
                            <span class="item-content">${totalBurned} Kcal</span>
                            <span class="fs-12__b">누적</span>
                            <span class="item-content">${totalIntake - totalBurned} Kcal</span>
                        </div>

                    <!-- 몸무게 증감량 예상 -->
                    <c:if test="${!empty weightGain || !empty weightLoss || !empty expectedWeightChange}">
                    <div class="section-title">몸무게 증감량 예상</div>
                    <div class="item">
                        <span class="fs-12__b">체중 변화:</span>
                        <span class="item-content">${expectedWeightChange} kg</span>
                    </div>
                     </c:if>

                    </div>
                </c:if>
                            
    
            </div>
          
            <div class="diary-content">
                <h6 class="fs-14">일기</h6>
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
        window.likeCheck = "${likeCheck}";
    </script>

    <script src="/resources/js/diary/diaryDetail.js"></script>
    <script src="/resources/js/reply/reply.js"></script>
    <script src="/resources/js/diary/diaryFoodWork.js"></script>

</body>
</html>
