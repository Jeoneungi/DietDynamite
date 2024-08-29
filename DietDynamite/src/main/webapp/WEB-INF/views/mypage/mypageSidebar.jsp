<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="profile-left">
    <div class="user-nav mt-20">
        <div>
            <p class="fc__gray fs-14"> 나의 일지 </p>
            <ul class="ml-20">
                <li class="text-hover__orange"> <a class="${page == 'myComment' ? 'fc__orange' : '' }" href="#">운동 기록</a></li>
                <li class="text-hover__orange"> <a class="${page == 'myBoard' ? 'fc__orange' : '' }" href="#">즐겨찾는 공간</a></li>
            </ul>
        </div>
        <div>
            <p class="fc__gray fs-14"> 활동 기록 </p>
            <ul class="ml-20">
                <li class="text-hover__orange"> <a class="${page == 'myInfo' ? 'fc__orange' : '' }" href="#">나의 댓글</a></li>
                <li class="text-hover__orange"> <a class="${page == 'resign' ? 'fc__orange' : '' }" href="#">나의 게시글</a></li>
            </ul>
        </div>
        <div>
            <p class="fc__gray fs-14"> 개인 정보 </p>
            <ul class="ml-20">
                <li class="text-hover__orange"> <a class="${page == 'myInfo' ? 'fc__orange' : '' }" href="#">내 정보 관리</a></li>
                <li class="text-hover__orange"> <a class="${page == 'resign' ? 'fc__orange' : '' }" href="#">회원 탈퇴</a></li>
            </ul>
        </div>
        
        <c:if test="${loginUser.getUserAuthority() == 'A'}"> 
        <div>
            <p class="fc__gray fs-14"> 회원 관리 </p>
            <ul class="ml-20">
                <li class="text-hover__orange"> <a class="${page == 'userManagement' ? 'fc__orange' : '' }" href="#">유저 관리</a> </li>
                <li class="text-hover__orange"> <a class="${page == 'reportManagement' ? 'fc__orange' : '' }" href="#">신고 관리</a> </li>
            </ul>
        </div>
        </c:if>
    </div>
</div>
