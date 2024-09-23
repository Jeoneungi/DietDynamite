<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

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
    <link rel="stylesheet" href="/resources/css/diary/diarywirte.css">
    <link rel="stylesheet" href="/resources/css/diary/diaryModal.css">
    <script src="https://kit.fontawesome.com/4bef400c33.js" crossorigin="anonymous"></script>

</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-detail">
            <h3 class="fs-20__b">다이어트 일기</h3>
            <form action="/diary/${boardType}/${boardNo}/update" method="POST" class="board-write" id="boardUpdateFrm" 
            enctype="multipart/form-data">  
           
            <input type="text" name="boardTitle" placeholder="제목" value="${board.boardTitle}" id="boardTitle" class="fs-16"/>
          
            <div class="img-box">
                <div class="boardImg diaryImg">
                    <label for="img0">
                          <img class="preview" src="${board.boardImg}" data-original-src="${board.boardImg}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img0" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
            </div>

           <span class="fs-12 info_color">*오늘먹은음식 혹은 오늘한 운동을 클릭하면 검색해 추가 할수있습니다. 누적칼로리및 몸무게 증감량은 자동으로 계산됩니다.</span>
            <div class="diaryInfo">
                <div class="section">
                    <div class="section-title" id="openFoodBtn">오늘 먹은 음식</div>
                        <div id="foodItemsContainer">
                            <c:if test="${!empty foodItems}">

                                <c:forEach var="food" items="${foodItems}">
                                    <div class="item food-entry" id="food-item">
                                    <span class="fs-12__b">${food.foodName}</span>
                                    <span class="item-content">${food.totalWeight}g</span>
                                    <span class="item-content">${food.totalCalories} Kcal</span>
                                    <button class="delete-food-btn">삭제</button> 

                                    </div>
                                </c:forEach>
                            </c:if>
                        </div>
                  

                    <div class="section-title" id="openExerciseBtn">오늘한 운동</div>
                        <div id="workItemsContainer">
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
                </div>
                
                <div class="section">
                    <div class="section-title">누적 칼로리</div>
                        <div class="item" id="totalCal">
                            <c:if test="${not empty totalIntake}">
                                    <span span class="fs-12__b">섭취</span>
                                    <span class="item-content">${totalIntake} Kcal</span>
                                    <span class="fs-12__b">소모</span>
                                    <span class="item-content">${totalBurned} Kcal</span>
                                    <span class="fs-12__b">누적</span>
                                    <span class="item-content">${totalIntake - totalBurned} Kcal</span>
                                    
                            </c:if>
                        </div>
             
                    <div class="section-title">몸무게 증감량 예상</div>
                        <div class="item" id="totalKg">
                         <c:if test="${not empty weightGain || not empty weightLoss || not empty expectedWeightChange}">
                          <span class="fs-12__b">체중 변화:</span>
                          <span class="item-content">${expectedWeightChange} kg</span>
                         </c:if>
                        </div>
                </div>
              
            </div>
           

            </div>
            <div class="diary-content">
                <h6 class="fs-14" >일기</h6>
                 <textarea class="fs-12" name="boardContent" id="boardContent">${board.boardContent}</textarea>
            </div>
            
            <div class="diary-button">
            <button class="btn-medium__lorange" type="submit" id="writebtn">등록</button>
            </div>
            <input type="hidden" name="deleteList" value="">
            <input type="hidden" name="cp" value="${param.cp}">

            </form>
        </section>
            <section id="side-manu">
                <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
            </section>
    </main>
    <jsp:include page="/WEB-INF/views/diary/diaryFood.jsp"/>
    <jsp:include page="/WEB-INF/views/diary/diaryWork.jsp"/>


    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
    <script src="/resources/js/diary/diaryUpdate.js"></script>
    <script src="/resources/js/diary/diaryUpdateInfo.js"></script>


</body>
</html>