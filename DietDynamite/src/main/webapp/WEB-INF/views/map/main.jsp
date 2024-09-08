<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

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
    <div class="popup-buttons">
    <a href = "/">
      <button id ="mainBtn"class="popup-btn">
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