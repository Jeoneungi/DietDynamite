<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
            
            <ul>
                <li><img src="/resources/images/profile/user_img1.jpg"></li>
                <li class="fs-14">test email</li>
                <li class="fs-14"> <i class="fa-regular fa-heart" id="boardLike"></i><span>1</span></li>
                <!-- <i class="fa-solid fa-heart" id="boardLike"></i>  -->  
                <li class="fs-12 fc__gray">조회수 25</li>
                <li class="fs-12 fc__gray">작성일 2024년 08월 27일 01:12:34</li>
            </ul>
            
            <div>
                <img src="/resources/images/logo.png">
            </div>

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
                <span>그만먹자!!</span>
            </div>
            <div class="diary-button">
            <button class="btn-medium__lorange">수정</button>
            <button class="btn-medium__lorange">삭제</button>
            <button class="btn-medium__lorange">목록으로</button>
            </div>
        </section>
            <section id="side-manu">
                <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
            </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>