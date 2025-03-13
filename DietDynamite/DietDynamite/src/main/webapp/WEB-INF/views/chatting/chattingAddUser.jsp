<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>

<div class="add-user-container card__white hide">
    <div class="add-user-header base__lorange">
        <p class="fc__white fs-15"> 대화 상대 검색 </p>
    </div>
    <div class="add-user-search">
        <input class="search" type="text" name="search_input" placeholder="사용자 닉네임을 검색해주세요."/>
    </div>
    <div class="add-user-result d-flex">
        <ul class="w-100">
        </ul>
        
    </div>

    <div class="add-user-btns">
        <button class="btn-medium__lorange" onclick="inviteUser()"> 초대 </button>
        <button class="btn-medium__gray" onclick="hideAddUserTab()"> 취소 </button>
    </div>
</div>

