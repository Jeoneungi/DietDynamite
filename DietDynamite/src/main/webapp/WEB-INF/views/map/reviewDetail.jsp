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
			<link rel="stylesheet" href="/resources/css/map/placeModal.css">


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
                <p id="review-count">댓글 갯수: <span id="review-count-value" class="fs-16">0</span></p>
							<button id="map-btn">지도</button>
							<c:if test="${!empty loginUser}">
								<button id="favorite-btn" 
									data-place-name="${place.placeName}"
									data-place-longitude="${place.placeLongitude}"
									data-place-latitude="${place.placeLatitude}"
									data-place-address="${place.placeAddress}"
									data-place-phone="${place.placePhone}"
									data-place-api-id="${place.placeApiId}"
									data-place-major-category="${place.placeMajorCategory}"
									data-place-minor-category="${place.placeMinorCategory}">
									<i class="fa-regular fa-bookmark"></i>
								</button>
							</c:if>

							<c:if test="${empty loginUser}">
								<button id="favorite-btn" 
									data-place-name="${place.placeName}"
									data-place-longitude="${place.placeLongitude}"
									data-place-latitude="${place.placeLatitude}"
									data-place-address="${place.placeAddress}"
									data-place-phone="${place.placePhone}"
									data-place-api-id="${place.placeApiId}"
									data-place-major-category="${place.placeMajorCategory}"
									data-place-minor-category="${place.placeMinorCategory}">
								</button>
							</c:if>

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
						<p>${loginUser.userId}님 평가해주세요!</p>
						<div class="rating" id="rating-stars"></div>
					</c:if>

					<c:if test="${empty loginUser}">
						<p>로그인 후 댓글을 달아보세요!</p>
						<div class="rating" id="rating-stars" style="display : none"></div>
					</c:if>
				</section>


				<div id="replyListContainer">
					<div id="replyList">
					/* 댓글 목록  */
					</div>
				</div>



				<div id="rating-stars" class="rating-stars">
					<!-- 별점 UI가 여기에 생성됩니다. -->
				</div>

				<div id="rating-modal" class="modal">
					<div class="modal-content">
						<h2 class="fs-16">${place.placeName}</h2>
						<p>
							<span id="modal-rating"></span>
						</p>
						<div class="rating" id="modal-rating-stars">
							<!-- 별점 UI가 여기에 생성됩니다. -->
						</div>
						<textarea id="review-content" placeholder="리뷰를 작성해 주세요"
							style="resize: none; height: 200px;"></textarea>
						<div class="modal-buttons">
							<button id="cancel-button" class="modal-button base__red btn-exsmall__lorange">취소</button>
							<button id="submit-button" class="btn-exsmall__lorange modal-button">등록</button>
						</div>
					</div>
				</div>

			</main>

			<jsp:include page="/WEB-INF/views/common/updateModal.jsp" />
			
			<jsp:include page="/WEB-INF/views/layout/footer.jsp" />


			<!-- 댓글 작성에 필요한 정보 reviewDetail.js 로 넘기기 -->
			<script>
				window.replyTargetNo = "${place.placeApiId}";
				window.loginUserNo = "${loginUser.userNo}";
			</script>


		</body>

		</html>
