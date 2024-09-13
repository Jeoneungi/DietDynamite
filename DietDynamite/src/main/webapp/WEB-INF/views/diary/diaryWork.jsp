<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!-- 운동 목록 모달 -->
<div id="exerciseListModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="fs-16">운동 찾기</h2>
            <span class="close-btn fs-16">&times;</span>
        </div>
        <div class="modal-body">
            <fieldset class="search-area">
                <form action="#" method="GET">
                    <button id="exerciseSearchBtn" class="fa-solid fa-magnifying-glass"></button>
                    <input type="search" id="exerciseQuery" name="workquery" placeholder="운동 검색" autocomplete="off" class="search-bar fs-12" value="${param.query}">
                </form>
            </fieldset>
            <div class="exercise-items" id="exerciseItems">
               <%-- 운동항목들어갈예정 --%>
            </div>
        </div>
    </div>
</div>

<!-- 운동 상세 모달 -->
<div id="exerciseDetailModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="fs-16">운동 정보</h2>
            <span class="close-btn fs-16">&times;</span>
        </div>
        <div class="modal-body">
            <fieldset class="search-area">
                <form action="#" method="GET">
                    <button id="searchBtn2" class="fa-solid fa-magnifying-glass"></button>
                    <input type="text" id="exerciseDetailQuery" placeholder="운동 검색" class="search-bar fs-12" value="${param.query}">
                </form>
            </fieldset>
            <div class="exercise-details2">
                <div class="badge fs-12" id="exerciseDetailBadge">500회 이상</div>
                <p class="exercise-name fs-12" id="exerciseDetailName">역도</p>
                <p class="calories fs-12" style="color: #FFA45B;" id="exerciseDetailCalories" data-calories="446">446kcal</p>
                <div class="workoutDeatilitem">
                    <span>운동시간 : </span>
                    <input type="text" id="exerciseMinute" placeholder="60" class="search-bar fs-12" value="${param.minute}">
                    <span>(분단위 입력)</span>
                </div>
                <div class="workoutDeatilitem">
                    <span>몸무게 : </span>
                    <input type="text" id="exerciseKg" placeholder="60" class="search-bar fs-12" value="${param.kg}">
                    <span>kg</span>
                </div>
                
                <button class="btn-medium__lorange" id="exerciseAddToDiaryBtn">오늘 일기에 추가하기</button>
            </div>
        </div>
    </div>
</div>
