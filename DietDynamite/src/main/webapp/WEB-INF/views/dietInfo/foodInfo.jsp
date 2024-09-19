<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />
<link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
<link rel="stylesheet" href="/resources/css/common.css">
<link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
<link rel="stylesheet" href="/resources/css/dietInfo/foodInfo.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://kit.fontawesome.com/4bef400c33.js"
	crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


</head>
<body>
	<jsp:include page="/WEB-INF/views/layout/header.jsp" />

	<main>
		<section>
			<h6 class="fs-20__b">음식 정보</h6>

			<article class="search-area">
				<form action="#" method="GET">

					<fieldset>
						<!-- form태그 내 영역 구분 -->

						<!-- 
                        input의 name 속성 == 제출 시 key
                        input에 입력된 내용 == 제출 시 value
                        autocomplete="off" : 브라우저 제공 자동완성 off
                    -->
						<input type="search" name="query" id="query"
							placeholder="음식명을 입력해주세요" autocomplete="off"
							value="${param.query}">
						<!-- 검색 버튼 -->
						<!-- button type="submit" 이 기본값 -->
						<button id="searchBtn" class="fa-solid fa-magnifying-glass"></button>
					</fieldset>
				</form>
			</article>




			<div id="food-cont"></div>


			<div class="food-info" id="food-info-box"></div>
			<table id="food-table"></table>

			<div id="reply-title"></div>
			<div id="reply-body"></div>

		 		 	 
		</section>

		<section id="side-manu">
			<jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp" />
		</section>
	</main>
	<jsp:include page="/WEB-INF/views/common/updateModal.jsp" />
	<jsp:include page="/WEB-INF/views/layout/footer.jsp" />
	<script src="/resources/js/dietInfo/foodInfo.js"></script>

</body>
</html>