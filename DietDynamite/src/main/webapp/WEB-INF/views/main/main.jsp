<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>다이너마이트D.DD</title>
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
    <link rel="stylesheet" href="/resources/css/main/main.css">
</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="main-menu">
          <ul>
            <li><a herf="#" class="fs-16" onclick="showContent('challenge')">챌린지</a></li>
            <li><a herf="#" class="fs-16" onclick="showContent('diary')">다이어트일기</a></li>
            <li><a herf="#" class="fs-16" onclick="showContent('food')">음식정보</a></li>
            <li><a href="#" class="fs-16" onclick="showContent('exercise')">운동정보</a></li>
            <li><a href="#" class="fs-16" onclick="showContent('recipe')">레시피</a></li>
          </ul>

          <div id="content">
            <div id="content">
            <div id="challenge" class="tab-content">
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
                <div class="challenge-item">
                    <img src="/resources/images/logo.png"><br>
                    <span>30일 달리기 챌린지</span>
                </div>
            </div>

               
        </section>
        <section id="side_menu">
            <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
     <script src="/resources/js/main/main.js"></script>
</body>
</html>