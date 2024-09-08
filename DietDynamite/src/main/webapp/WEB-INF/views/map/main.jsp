<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>

  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />

      <link rel="stylesheet" href="/resources/css/map/map.css">
      <script>const kakaoKey = ${ kakaoKey }</script>
      <script src="/resources/js/map/map.js" defer></script>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}"></script>

      <title>지도</title>
  </head>
  

  <body class="MAP">
  <header>
    <c:if test="${!empty loginUser}">
      <div class="header-top">
        <div class="header-top-user box-hover dropdown">
          <c:if test="${empty loginUser.getUserImage()}">
            <img class="user-image" src="/resources/images/profile/user_img1.jpg">
          </c:if>
          <c:if test="${!empty loginUser.getUserImage()}">
            <img class="user-image" src="${loginUser.getUserImage()}" />
          </c:if>
          <div class="user-name dropdown-toggle" data-bs-toggle="dropdown">
            <a class="text-hover__blue fs-14__b"> ${loginUser.getUserId()}</a>
          </div>
          <ul class="dropdown-menu">
            <li class="d-flex dropdown-item">
              <div class="d-flex">
                <img class="user-image" src="/resources/images/profile/user_img1.jpg">
                <p class="fs-20__ex">기아 타이거즈</p>
              </div>
              <div class="d-flex">
                <a class="text-hover__blue" href="/src/pages/teams/teams.jsp">
                  팀페이지 </a> <a class="text-hover__blue" href="/src/pages/news/news.jsp"> 뉴스 </a>
              </div>
            </li>
  
            <hr class="hr__gray">
            <p class="header-title fc__gray fs-20__b">컨텐츠</p>
  
            <li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myComment">내 댓글</a>
            </li>
            <li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myComment">내 게시글</a>
            </li>
            <li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myComment">내 스크랩</a>
            </li>
  
            <p class="header-title fc__gray fs-20__b">개인 정보</p>
            <li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myInfo">내 정보 관리</a>
            </li>
            <li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/resign">회원 탈퇴</a></li>
  
            <c:if test="${loginUser.getUserAtuhority() == 'A' }">
              <p class="header-title fc__gray fs-20__b">회원 관리</p>
              <li><a class="dropdown-item fs-20__b text-hover__blue"
                  href="/admin/profile/userManagement">유저 관리</a></li>
              <li><a class="dropdown-item fs-20__b text-hover__blue"
                  href="/admin/profile/reportManagement">신고 관리</a></li>
            </c:if>
            <li>
              <a class="dropdown-item logout fs-12 text-hover__blue" href="/user/logout">로그아웃</a>
            </li>
          </ul>
        </div>
      </div>
    </c:if>
    <c:if test="${empty loginUser}">
      <div class="header-top">
        <div class="header-top-user box-hover" onclick="location.href='/user/login'">
          <img class="user-image" src="/resources/images/profile/user_img1.jpg">
          <div class="user-name">
            <a class="text-hover__gray fs-14__b">로그인후 이용해주세요</a>
          </div>
        </div>
      </div>
    </c:if>

  </header>
    <div class="popup-buttons">
      <a href="/">
        <button id="mainBtn" class="popup-btn">
          <img src="/resources/images/logo.png" class="icon">
        </button>
      </a>

      <button id="homeBtn" class="popup-btn">
        <br><i class="fas fa-map-marker-alt fc__orange"></i>
        <br><span>지도홈</span>
      </button>

      <button id="saveBtn" class="popup-btn">
        <i class="fas fa-star fc__orange"></i>
        <br><span>저장</span>
      </button>
    </div>


    <div class="area">
      <div class="info-container">
        <div class="info">
          <input type="text" id="keyword" placeholder="키워드를 입력하세요">
          <button id="searchBtn" class="base__orange">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <div id="favorites-container" style="display: none;">
          <h3 class="fs-18">즐겨찾기 목록</h3>
          <ul id="favorites">
            <!-- 즐겨찾기 목록이 여기에 추가될 예정-->
          </ul>
        </div>
        <div id="result-list" style="display: none;"></div>
      </div>

      <div class="map-container">
        <div id="map"></div>
      </div>
    </div>
  </body>

  </html>