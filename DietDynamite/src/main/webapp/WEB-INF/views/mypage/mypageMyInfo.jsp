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
    <link rel="stylesheet" href="/resources/css/mypage/mypageMyInfo.css">
    <script src="/resources/js/mypage/mypageSidebar.js" defer></script>
    <script src="/resources/js/mypage/mypageMyInfo.js" defer></script>
	<script>
		// 패스워드 인증을 받았는지 여부 체크
		const passwordCheck = "${passwordCheck}";
	</script>
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
                <p class="content-title fs-18__b"> 내 정보 관리</p>
                <p class="fs-15 fc__gray"> 개인 정보를 확인하고 수정할 수 있습니다.</p>
                <div class="user-profile d-flex">
			    	<c:if test="${empty loginUser.getUserImage()}">
			    		<img src="/resources/images/profile/user_img1.jpg" onclick="changeImgModal()"/>
			    	</c:if>
			   		<c:if test="${!empty loginUser.getUserImage()}">
			    		<img src="${loginUser.getUserImage()}" onclick="changeImgModal()"/>
			    	</c:if>
			        <p> ${!empty loginUser.getUserId() ? loginUser.getUserId() : "등록된 아이디가 없습니다"} </p>
			        <p> ${!empty loginUser.getUserEmail() ? loginUser.getUserEmail() : "등록된 이메일이 없습니다."}</p>
			    </div>
            
                <!-- 컨텐츠 > 메인 -->
                <div class="profile-info">
                	<div class="info-header-container">
	                	<p class="info-header fs-15__b"> 로그인 정보 </p>	 
                	</div>
                	<div class="info-contents card__white">
                		<div>
                			<p class="fc__orange fs-15__b"> 이메일 </p>
                			<input type="hidden" name="userEmail" value="${loginUser.getUserEmail()}">
                			<p class="fc__gray fs-15__b text-hover__black" data-type="email" onclick="showModal(this)"> 
                				${!empty loginUser.getUserEmail() ? loginUser.getUserEmail() : '등록된 이메일이 없습니다'} <span> > </span>
                			</p>
                		</div>
                		<div>
                			<p class="fc__orange fs-15__b"> 비밀번호 </p>
                			<p class="fc__gray fs-15__b text-hover__black" data-type="pw"  onclick="showModal(this)"> 
                				비밀번호 변경 <span> > </span>
                			</p>
                		</div>
                		<div>
                			<p class="fc__orange fs-15__b"> 닉네임 </p>
                			<input type="hidden" name="userNickname" value="${loginUser.getUserNickname()}">
                			<p class="fc__gray fs-15__b text-hover__black" data-type="nickname"  onclick="showModal(this)"> 
                				${!empty loginUser.getUserNickname() ? loginUser.getUserNickname() : '등록된 닉네임이 없습니다'} <span> > </span>
                			</p>
                		</div>
                	</div>
                </div>
                
                <!-- Button trigger modal -->
                <div class="profile-info">
                	<p class="info-header fs-15__b"> 신체정보 </p>
                	<div class="info-contents card__white">
                		<div>
                			<p class="fc__orange fs-15__b"> 나이 </p>
                			<input type="hidden" name="userBirthDay" value="${loginUser.getUserBirthDay()}">
                			<p class="fc__gray fs-15__b text-hover__black" data-type="bd"  onclick="showModal(this)"> 
                				${!empty loginUser.getUserBirthDay() ? loginUser.getUserBirthDay() : '등록된 생일이 없습니다'} <span> > </span>
                			</p>
							
                		</div>
                		<div>
                			<p class="fc__orange fs-15__b"> 키 </p>
                			<input type="hidden" name="userHeight" value="${loginUser.getUserProfileHeight()}">
							<p class="fc__gray fs-15__b text-hover__black" data-type="height"  onclick="showModal(this)"> 
								${!empty loginUser.getUserProfileHeight() ? loginUser.getUserProfileHeight() : '등록된 키가 없습니다'}  <span> > </span>
							</p>
                		</div>
                		<div>
                			<p class="fc__orange fs-15__b"> 몸무게 </p>
                			<input type="hidden" name="userWeight" value="${loginUser.getUserProfileWeight()}">
                			<p class="fc__gray fs-15__b text-hover__black" data-type="weight"  onclick="showModal(this)"> 
                				${!empty loginUser.getUserProfileWeight() ? loginUser.getUserProfileWeight() : '등록된 몸무게가 없습니다'} <span> > </span>
                		</p>
                		</div>
                	</div>
                </div>
                <div class="profile-info">
                	<p class="info-header fs-15__b"> 기타 정보 </p>
                	<div class="info-contents card__white">
                		<div>
                			<p class="fc__orange fs-15__b"> 로그인 기록 </p>
                			<p class="fc__gray fs-15__b text-hover__black"  data-type="loginHistory" onclick="showModal(this)"> 
                				로그인 기록 확인 <span> > </span>
                			</p>
                		</div>
                	</div>
                </div>
            </div>
        </section>
    </main>
	
    <jsp:include page="/WEB-INF/views/common/commonModal.jsp"></jsp:include>
    <jsp:include page="/WEB-INF/views/common/changeImgModal.jsp"></jsp:include>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>