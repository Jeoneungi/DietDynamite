<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/map/reviewDetail.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <script>let mapId = `${place}`</script>
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
                    <h2 id="place-name"> ${name}</h2>
                    <p id="review-count">리뷰 갯수</p>
                    <button id="map-btn">지도</button>
                </div>
            </div>
        </section>

        <!-- 가게 상세 정보 섹션 -->
        <section id="store-details">
            <h1 id="place-name">${name}</h1>
            <p id="place-address">${address}</p>
            <p id="place-phone">${phone}</p>
        </section>

        <section class="starPoint">
          <p>회원 닉네임:<p>
          <div class="rating" id="rating-stars"></div>
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

                <!-- 리뷰 항목이 여기에 추가됩니다. -->
            <!-- <div id="loading" class="loading">Loading...</div> -->
        </section>
    </main>

    <jsp:include page="/WEB-INF/views/layout/footer.jsp" />
</body>

</html>
