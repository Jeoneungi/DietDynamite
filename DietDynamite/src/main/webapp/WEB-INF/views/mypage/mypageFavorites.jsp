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

    <title>MLB - Na</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>

    <main>
        <section class="container">
        	<!-- 사이드바 -->
         	<jsp:include page="/WEB-INF/views/mypage/mypageSidebar.jsp"></jsp:include>   
         
            <!-- 메인컨텐츠 -->
            <div class="workout-content">
            	
            </div>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>