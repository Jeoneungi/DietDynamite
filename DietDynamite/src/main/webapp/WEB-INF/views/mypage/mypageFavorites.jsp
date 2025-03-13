<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/mypage/mypageFavorites.css">
    <script src="/resources/js/mypage/mypageSidebar.js" defer></script>
    <script src="/resources/js/mypage/mypageFavorites.js" defer></script>

    <title>My Page</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>

    <main>
        <section class="container">
        	<!-- 사이드바 -->
         	<jsp:include page="/WEB-INF/views/mypage/mypageSidebar.jsp"></jsp:include>   
         
            <!-- 메인컨텐츠 -->
            <div class="favorites-content">
                <p class="content-title fs-18__b"> 즐겨찾는 공간</p>
                <p class="fs-15 fc__gray"> 다이어트 지도에서 즐겨찾기한 공간을 표시합니다.</p>
                                <!-- 컨텐츠 > 메인 -->
                <div class="favorites-info">
                	<div id="favorites-data" class="content-elements"></div>
 				</div>
 				<div id="favorites-pagination"></div>
            </div>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>