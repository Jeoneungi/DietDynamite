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
			<h6 class="fs-20__b">음식 정보</h6>

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
							placeholder="음식명을 입력해주세요" autocomplete="off"
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
				<span class="base__lorange fs-14">500회 이상</span> <br> <br>
				<p class="fs-16">비스킷(과자)</p>
				<span class="fs-16">중량 : 150g</span>
				<span class="fc__orange fs-16"style="margin-left:400px">열량 : 446kcal</span>
			</div>
			
			<div class="food-container">
				<span class="base__lorange fs-14">500회 이상</span> <br> <br>
				<p class="fs-16">비스킷(과자)</p>
				<span class="fs-16">중량 : 150g</span>
				<span class="fc__orange fs-16"style="margin-left:400px">열량 : 446kcal</span>
			</div>

			<div class="food-info">
				<span class="base__lorange fs-14">500회 이상</span> <br> <br>
				<p class="fs-16">비스킷(과자) / 150g</p>
				<p class="fc__orange fs-16">446kcal</p>
				<textarea rows="8" cols="50">그래프 자리</textarea>
			</div>

			<table>
				<!-- key:value로 받아와서 tr for문 돌리는 방법으로 -->
				<tr>
					<td>에너지</td>
					<td>100(kcal)</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>단백질</td>
					<td>100(g)</td>
					<td>지방</td>
					<td>100(g)</td>
				</tr>
				<tr>
					<td>탄수화물</td>
					<td>100(ga)</td>
					<td>당류</td>
					<td>50(g)</td>
				</tr>
				<tr>
					<td>탄수화물</td>
					<td>100(ga)</td>
					<td>당류</td>
					<td>50(g)</td>
				</tr>
				<tr>
					<td>탄수화물</td>
					<td>100(ga)</td>
					<td>당류</td>
					<td>50(g)</td>
				</tr>
				<tr>
					<td>탄수화물</td>
					<td>100(ga)</td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<br>
			<span class="fs-16">다이어터 한줄평</span>
			<i class="fa fa-thumbs-up" style="font-size: 24px; color: #FFAB5E; margin-left:5px;"></i>
			<span class="fs-16">(500)</span>
			<br>
			<button class="btn btn-exsmall__orange" style="margin-left:550px; width:80px;">한줄평작성</button>
			
			
			
			<div class="comment-container">
				<span style="flex-basis: 100%; text-align: right; margin-right:20px">2024-09-11</span>
				<img src="/resources/images/challenge/cardio.png" alt="Thumbnail"
					class="comment-thumbnail">
				<div class="comment-details">
					<span class="comment-id">유저일</span>
					<i class="fa fa-thumbs-up" id="thumbIcon" style="font-size: 24px; cursor: pointer; color: black;"></i>
					<div class="comment-content">한줄댓글 콘텐츠가 작성되는 부분입니다.</div>
					<div class="comment-actions">
						<button class="btn btn-medium__lorange" style="width: 50px">수정</button>
						<button class="btn btn-medium__red" style="width: 50px">삭제</button>
					</div>
				</div>
			</div>
		</section>

		<section id="side-manu">
			<jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp" />
		</section>
	</main>
	<jsp:include page="/WEB-INF/views/layout/footer.jsp" />
	<script>
			const thumbIcon = document.getElementById('thumbIcon');
			thumbIcon.addEventListener('click', () => {
			console.log(thumbIcon.style.color);
  			thumbIcon.style.color = thumbIcon.style.color === 'black' ? '#FFAB5E' : 'black';
			});
	</script>
</body>
</html>