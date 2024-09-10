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
					<a class="text-hover__blue fs-14__b"> ${loginUser.getUserId()}</a>
				</div>
				<ul class="dropdown-menu">
					<li class="d-flex dropdown-item">
						<div class="d-flex">
							<img class="user-image" src="/resources/images/profile/user_img1.jpg">
							<p class="fs-20__ex">기아 타이거즈</p>
						</div>
						<div class="d-flex">
							<a class="text-hover__blue" href="/src/pages/teams/teams.jsp">
								팀페이지 </a> <a class="text-hover__blue" href="/src/pages/news/news.jsp"> 뉴스 </a>
						</div>
					</li>

					<hr class="hr__gray">
					<p class="header-title fc__gray fs-20__b">컨텐츠</p>

					<li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myComment">내 댓글</a>
					</li>
					<li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myComment">내 게시글</a>
					</li>
					<li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myComment">내 스크랩</a>
					</li>

					<p class="header-title fc__gray fs-20__b">개인 정보</p>
					<li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/myInfo">내 정보 관리</a>
					</li>
					<li><a class="dropdown-item fs-20__b text-hover__blue" href="/profile/resign">회원 탈퇴</a></li>

					<c:if test="${loginUser.getUserAtuhority() == 'A' }">
						<p class="header-title fc__gray fs-20__b">회원 관리</p>
						<li><a class="dropdown-item fs-20__b text-hover__blue"
								href="/admin/profile/userManagement">유저 관리</a></li>
						<li><a class="dropdown-item fs-20__b text-hover__blue"
								href="/admin/profile/reportManagement">신고 관리</a></li>
					</c:if>
					<li>
						<a class="dropdown-item logout fs-12 text-hover__blue" href="/user/logout">로그아웃</a>
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
			<img class="logo" src="/resources/images/logo.png" />
		</div>
		<div class="header-nav">
			<div>
				<ul class="d-flex">
					<li><a class="fs-20 fc__white text-hover__white" href="#">커뮤니티</a>
					</li>
					<li><a class="fs-20 fc__white text-hover__white" href="#">기능</a>
					</li>
					<li><a class="fs-20 fc__white text-hover__white" href="/map/places">지도</a>
					</li>
					<li><a class="fs-20 fc__white text-hover__white" href="#">정보마당</a>
					</li>
				</ul>
			</div>
			<div class="header-nav-sub">
				
				<ul>
					<li><a class="fs-14 fc__white text-hover__white" href="/diary/1">다이어트 일기</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능1</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능1</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능1</a>
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
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능3</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능3</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능3</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능3</a>
					</li>
				</ul>
				<ul>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능4</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능4</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능4</a>
					</li>
					<li><a class="fs-14 fc__white text-hover__white" href="#">기능4</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</header>