<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>

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
					<a class="text-hoverlue fs-14__b"> ${loginUser.getUserId()}</a>
				</div>
				<ul class="dropdown-menu">
					<p class="header-title fc__gray fs-18">나의 일지</p>

					<li><a class="dropdown-item fs-18 text-hoverlue" href="/mypage/workoutDiary">운동 기록</a>
					</li>
					<li><a class="dropdown-item fs-18 text-hoverlue" href="/mypage/favorites">즐겨찾는 공간</a>
					</li>

					<p class="header-title fc__gray fs-18">활동 기록</p>
					<li><a class="dropdown-item fs-18 text-hoverlue" href="/mypage/myReply">나의 댓글</a>
					</li>
					<li><a class="dropdown-item fs-18 text-hoverlue" href="/mypage/myBoard">나의 게시글</a></li>

					<p class="header-title fc__gray fs-18">개인 정보</p>
					<li><a class="dropdown-item fs-18 text-hoverlue" href="/mypage/myInfo">개인 정보 관리</a>
					</li>
					<li><a class="dropdown-item fs-18 text-hoverlue" href="/mypage/resign">회원 탈퇴</a></li>

					<c:if test="${loginUser.getUserAuthority() == 'A' }">
						<p class="header-title fc__gray fs-18">회원 관리</p>
						<li><a class="dropdown-item fs-18 text-hoverlue"
								href="/mypage/userManagement">유저 관리</a></li>
					</c:if>
					<li>
						<a class="dropdown-item logout fs-12 text-hoverlue" href="/user/logout">로그아웃</a>
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
	<div class="header-bot d-flex linear_orange">
		<div class="header-bot-logo">
			<img class="logo" src="/resources/images/logo.png"/>
		</div>
		<div class="header-nav">
			<div>
				<ul class="d-flex">
					<li><a class="fs-18 fc__white text-hover__white" href="#">커뮤니티</a>
					</li>
					<li><a class="fs-18 fc__white text-hover__white" href="#">기능</a>
					</li>
					<li><a class="fs-18 fc__white text-hover__white" href="#">지도</a>
					</li>
					<li><a class="fs-18 fc__white text-hover__white" href="#">정보마당</a>
					</li>
				</ul>
			</div>
			<div class="header-nav-sub">
				
				<ul>
					<li><a class="fs-14 fc__white text-hover__white" href="/diary/1">다이어트 일기</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="/functionPage/bmi">BMI 지수 측정</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="/functionPage/bmr">기초 대사량 측정</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="/challenge/0">챌린지</a>
					</li>
				</ul>
				<ul>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능2</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능2</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능2</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능2</a>
					</li>
				</ul>
				<ul>
					<li><a class="fs-14 fc__white text-hover__white" href="/map/places">지도 검색</a>
					</li>
				</ul>
				<ul>
					<li><a class="fs-14 fc__white text-hover__white" href="/dietInfo/foodInfo">음식정보</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="/dietInfo/workoutInfo">운동정보</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="/recipe/main">다이어트 레시피</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능4</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</header>