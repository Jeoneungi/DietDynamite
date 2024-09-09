<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>

  <!DOCTYPE html>
  <html lang="ko">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/map/reviewDetail.css">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/map/modal.css">


    <script>let mapId = ${ place.placeApiId }</script>
    <script>const kakaoKey = '${kakaoKey}'</script>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}"></script>
    <script src="/resources/js/map/reviewDetail.js" defer></script>
    <title>Review Detail</title>

  </head>

  <body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp" />
    <main>
      <!-- 가게 정보 섹션 -->
      <section class="store-info">
        <div id="place-img" class="place-img">
          <div class="overlay">
            <h2 id="place-name">${place.placeName}</h2>
            <p id="review-count">리뷰 갯수</p>
            <button id="map-btn" class="fs-16">지도</button>
            <button id="favorite-btn" data-place-api-id="${placeApiId}">
              <i class="fa-regular fa-bookmark fs-16"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- 가게 상세 정보 섹션 -->
      <section id="store-details">
        <h1 id="place-name">${place.placeName}</h1>
        <p id="place-address">${place.placeAddress}</p>
        <p id="place-phone">${place.placePhone}</p>
      </section>

      <section class="starPoint">
        <c:if test="${!empty loginUser}">
          <p>${loginUser.userId} 님 평가해주세요!</p>
          <div class="rating" id="rating-stars"></div>
        </c:if>

        <c:if test="${empty loginUser}">
          <p>로그인 후 리뷰를 달아보세요!</p>
        </c:if>
      </section>

      <!-- 리뷰 섹션 -->
      <section class="reviews">
        <div id="review-list" class="review-list">
          <div class="review-item">
            <img src="/resources/images/profile/user_img1.jpg" alt="User Image">
            <div class="review-content">

              <p>test email</p>
              <p>너무 맛있고 사장님이 친절합니다!!! 강추 드려요</p>

              <div class="rating" style="font-size: 30px;">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
              </div>

              <div class="review-meta">
                <span class="like">♥ 좋아요 ${review.likes}</span>
                <span class="review-date"> 2024-08-30 ${review.date}</span>
              </div>
            </div>
          </div>

          <div class="review-item">
            <img src="/resources/images/profile/user_img1.jpg" alt="User Image">
            <div class="review-content">

              <p>test email</p>
              <p>너무 맛있고 사장님이 친절합니다!!! 강추 드려요</p>

              <div class="rating" style="font-size: 30px;">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
              </div>

              <div class="review-meta">
                <span class="like">♥ 좋아요 ${review.likes}</span>
                <span class="review-date">${review.date}</span>
              </div>
            </div>
          </div>
          <div class="review-item">
            <img src="/resources/images/profile/user_img1.jpg" alt="User Image">
            <div class="review-content">

              <p>test email</p>
              <p>너무 맛있고 사장님이 친절합니다!!! 강추 드려요</p>

              <div class="rating" style="font-size: 30px;">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
              </div>

              <div class="review-meta">
                <span class="like">♥ 좋아요 ${review.likes}</span>
                <span class="review-date">${review.date}</span>
              </div>
            </div>
          </div>
          <div class="review-item">
            <img src="/resources/images/profile/user_img1.jpg" alt="User Image">
            <div class="review-content">

              <p>test email</p>
              <p>너무 맛있고 사장님이 친절합니다!!! 강추 드려요</p>

              <div class="rating" style="font-size: 30px;">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
              </div>

              <div class="review-meta">
                <span class="like">♥ 좋아요 ${review.likes}</span>
                <span class="review-date">${review.date}</span>
              </div>
            </div>
          </div>
          <div class="review-item">
            <img src="/resources/images/profile/user_img1.jpg" alt="User Image">
            <div class="review-content">

              <p>test email</p>
              <p>너무 맛있고 사장님이 친절합니다!!! 강추 드려요</p>

              <div class="rating" style="font-size: 30px;">
                ☆☆☆☆
              </div>

              <div class="review-meta">
                <span class="like">♥ 좋아요 ${review.likes}</span>
                <span class="review-date">${review.date}</span>
              </div>
            </div>
          </div>


      </section>

      <!-- <div id="loading" class="loading">Loading...</div> -->
      </section>

      <div id="rating-stars" class="rating-stars">
        <!-- 별점 UI가 여기에 생성됩니다. -->
      </div>

      <div id="rating-modal" class="modal">
        <div class="modal-content">
          <h2 class="fs-16">${place.placeName}</h2>
          <p><span id="modal-rating"></span></p>
          <div class="rating" id="modal-rating-stars">
            <!-- 별점 UI가 여기에 생성됩니다. -->
          </div>
          <textarea id="review-content" placeholder="리뷰를 작성해 주세요" style="resize: none; height: 400px;"></textarea>
          <div class="modal-buttons">
            <button id="cancel-button" class="modal-button">취소</button>
            <button id="submit-button" class="modal-button">등록</button>
          </div>
        </div>
      </div>
      <div id="review-list">
      </div>

    </main>

    <jsp:include page="/WEB-INF/views/layout/footer.jsp" />
  </body>

  </html>