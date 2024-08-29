<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/mypage/mypageMyReply.css">
    <script src="/resources/js/mypage/mypageSidebar.js" defer></script>
    <script src="/resources/js/mypage/mypageMyReply.js" defer></script>
    
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
            	<!-- 컨텐츠 > 헤더 -->
                <p class="content-title fs-18__b"> 나의 댓글</p>
                <p class="fs-15 fc__gray"> 내가 댓글을 확인하고 수정할 수 있습니다.</p>
                
                <hr class="hr__gray mt-20">
                <div class="content-header d-flex">
                    <div class="checkbox__red small-square">
                        <input type="checkbox" id="check-all" name="check-all">
                        <label for="check-all" class="fs-12">전체 선택</label>
                    </div>
                    <div onclick="deleteMyReply()">
                        <img src="/resources/images/icons/bin.png">
                        <span> 선택 삭제 </span>
                    </div>
                </div>
                
                <!-- 컨텐츠 > 메인 -->
                <div class="content-main">
                    <div id="reply-data" class="content-elements"></div>
                </div>
                <div id="reply-pagination"></div>
                <!-- 컨텐츠 메인 종료 -->
            </div>
        </section>
    </main>
   	<!-- 모달 -->
	<jsp:include page="/WEB-INF/views/common/promptModal.jsp" />
	<jsp:include page="/WEB-INF/views/common/updateModal.jsp" />
	<jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>