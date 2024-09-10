<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/mypage/mypageUserManagement.css">
    <script src="/resources/js/mypage/mypageSidebar.js" defer></script>
    <script src="/resources/js/mypage/mypageUserManagement.js" defer></script>
    
    <title>MLB - Na</title>
</head>
<body>
	<jsp:include page="/WEB-INF/views/layout/header.jsp"/>
	
	<main>
        <section class="container">
        	<!-- 사이드바 -->
            <jsp:include page="/WEB-INF/views/mypage/mypageSidebar.jsp"></jsp:include>   
            
            <!-- 메인컨텐츠 -->
            <div class="profile-content">
            	<!-- 컨텐츠 헤더 -->
                <p class="content-title fs-18__b"> 유저 정보 관리</p>
                <p class="fs-15 fc__gray"> 유저의 정보확인 및 권한정보를 변경할 수 있습니다.</p>

              	<div class="content-header mt-20 d-flex">
	                <div class="search-area">
                  		<select class="search-category" name="search_category">
	                    	<option value="1" selected> 아이디 </option>
	                    	<option value="2" > 이메일 </option>
	                    	<option value="3" > 닉네임 </option>
                  		</select>
	                  <input type="text" name="search_input">
	                  <button class="search" onclick="searchUser()">검색</button>
	                </div>
              	</div>
              	<!-- 컨텐츠 메인 -->
              	<div class="content-main">
                  	<div id="user-data" class="content-elements"></div>
              	</div>
              	<div id="user-pagination"></div>
            </div>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/adminModal.jsp"></jsp:include>
   	<jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
   	
</body>
</html>