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

</head>
<body>
	<jsp:include page="/WEB-INF/views/layout/header.jsp" />
	<main>
		<section>
			<h6 class="fs-20__b">운동 정보</h6>

			<article class="search-area">
				<form action="/board/1" method="GET">

					<fieldset>
						<!-- form태그 내 영역 구분 -->
						<!-- 
                        input의 name 속성 == 제출 시 key
                        input에 입력된 내용 == 제출 시 value
                        autocomplete="off" : 브라우저 제공 자동완성 off
                    -->
						<input type="search" name="query" id="query"
							placeholder="운동명을 입력해주세요" autocomplete="off"
							value="${param.query}">
						<!-- 검색 버튼 -->
						<!-- button type="submit" 이 기본값 -->
						<button id="searchBtn" class="fa-solid fa-magnifying-glass"></button>
					</fieldset>
					<div id="result"
						style="position: absolute; background-color: white; z-index: 1200"></div>
				</form>
			</article>

			<div class="food-container">
				<p class="fs-16" style="margin-left: 30px">배구</p>
				<span class="fs-14" style="margin-left: 30px">스포츠</span> <span
					class="fs-14" style="margin-left: 400px">MET 계수 : 4</span>
			</div>

			<div class="food-container">
				<p class="fs-16" style="margin-left: 30px">농구</p>
				<span class="fs-14" style="margin-left: 30px">스포츠</span> <span
					class="fs-14" style="margin-left: 400px">MET 계수 : 5</span>
			</div>

			<div class="workout-title fs-16">배구(스포츠)</div>

			<div class="workout-container">
				<div class="workout-number fs-16">
					<span>운동시간</span> <input type="number" size="10px" style="border:none"> <span>00분</span>
				</div>
				<div class="workout-number fs-16">
					<span>현재체중</span> <input type="number" size="10px" style="border:none"> <span>00kg</span>
				</div>
			</div>

			<hr>

			<span>예상 소모 칼로리</span> <span class="fs-16" style="margin-left: 400px">
				00kcal</span>
		</section>


		<section id="side-manu">
			<jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp" />
		</section>
	</main>
	<jsp:include page="/WEB-INF/views/layout/footer.jsp" />
</body>
</html>