<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

  <!DOCTYPE html>
  <html lang="ko">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script>
      let mapId = ${place}
      console.log(mapId)
    </script>
    
    
    <link rel="stylesheet" href="/resources/css/map/reviewDetail.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <script> const kakaoKey = ${kakaoKey} </script>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}"></script>
    <script src="/resources/js/map/reviewDetail.js"></script>

    <title>reviewDeteail</title>
  </head>

  <body>
      <jsp:include page="/WEB-INF/views/layout/header.jsp" />

    <main>
      <!-- 가게 정보 섹션 -->
      <section class="store-info">
        <div id="place-img" class="place-img">
            <div class="overlay">
                <h2 id="place-name">가게 명</h2>
                <p id="review-count">리뷰 갯수</p>
                <button id="map-btn">지도</button>
            </div>
        </div>
    </section>

      <!-- 가게 상세 정보 섹션 -->
      <section id="store-details">
          <h1 id="place-name">가게명</h1>
          <p id="place-address">주소</p>
          <p id="place-phone">전화번호</p>
      </section>

      <!-- 리뷰 섹션 -->
      <section class="reviews">
          <div class="rating">리뷰 10</div>
          <div class="review-item">
              <p>너무 맛있고 사장님이 친절합니다!!! 강추 드려요</p>
              <div class="review-meta">
                  <span class="review-date">2024.08.27</span>
                  <span class="like">좋아요 ♥</span>
              </div>
          </div>
      </section>
    </main>

   <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
  </body>
  </html>