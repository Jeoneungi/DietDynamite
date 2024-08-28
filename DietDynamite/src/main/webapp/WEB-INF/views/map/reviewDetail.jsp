<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

  <!DOCTYPE html>
  <html lang="ko">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>리뷰 상세</title>
    <link rel="stylesheet" href="/resources/css/map/reviewDetail.css">
  </head>

  <body>
    <header>
      <div class="logo">
        <a href="/">
          <img src="/resources/images/user_img1.png" alt="Logo">
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="#">커뮤니티</a></li>
          <li><a href="#">기능</a></li>
          <li><a href="/map/places">지도</a></li>
          <li><a href="#">정보마당</a></li>
        </ul>
      </nav>
      <div class="user-info">
        <img src="/resources/images/user_img1.png" alt="Profile" class="profile-img">
        <span class="email">test email</span>
      </div>
    </header>

    <main>
      <section class="store-info">
        <h2>가게명: <span id="place-name"></span></h2>
        <div id="map" style="width: 100%; height: 500px;"></div>
      </section>

      <section id="store-details">
        <h1 id="place-name">가게명</h1>
        <p id="place-address">주소</p>
        <p id="place-phone">전화번호</p>
      </section>

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

    <footer>
      <p>저작권 2024. 회사명. 모든 권리 보유.</p>
    </footer>

    <script>
      let mapId = ${place}
      console.log(mapId)
    </script>
  </body>
  <script src="/resources/js/map/reviewDetail.js"></script>
  </html>