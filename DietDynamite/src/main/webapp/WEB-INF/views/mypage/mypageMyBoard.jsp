<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/mypage/mypageMyBoard.css">
    <script src="/resources/js/mypage/mypageSidebar.js" defer></script>
    <script src="/resources/js/mypage/mypageMyBoard.js" defer></script>
    
    <title>My Board</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>

    <main>
        <section class="container">
        	<!-- 사이드바 -->
            <jsp:include page="/WEB-INF/views/mypage/mypageSidebar.jsp"></jsp:include>   
            
            <!-- 메인컨텐츠 -->
            <div class="profile-content">
            	<!-- 컨텐츠 > 헤더 -->
                <p class="content-title fs-18__b"> 나의 게시글</p>
                <p class="fs-15 fc__gray"> 내가 작성한 게시글을 확인하고 수정할 수 있습니다.</p>
                
                <hr class="hr__gray mt-20">
                
                <!-- 컨텐츠 > 메인 -->
                <div class="content-main">
                    <div id="board-data" class="content-elements"></div>
                </div>
                <div id="board-pagination"></div>
                <!-- 컨텐츠 메인 종료 -->
            </div>
        </section>
    </main>
	<jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>