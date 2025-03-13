    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <!-- 음식 목록 모달 -->
    <div id="foodListModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="fs-16">음식 찾기</h2>
                <span class="close-btn fs-16">&times;</span>
            </div>
            <div class="modal-body">
                <fieldset class="search-area">
                    <form action="#" method="GET">
                        <button id="searchBtn" class="fa-solid fa-magnifying-glass"></button>
                        <input type="search" id="query" name="query" placeholder="음식 검색"  autocomplete="off" class="search-bar fs-12" value="${param.query}">
                    </form>
                </fieldset>
                <div class="food-items" id="fooditems">
                   <%-- 음식항목들어갈예정 --%>
                </div>
            </div>
        </div>
    </div>

    <!-- 음식 상세 모달 -->
    <div id="foodDetailModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="fs-16">음식 정보</h2>
                <span class="close-btn fs-16">&times;</span>
            </div>
            <div class="modal-body">
                <fieldset class="search-area">
                    <form action="#" method="GET">
                    <button id="searchBtn" class="fa-solid fa-magnifying-glass"></button>
                        <input type="text" id="query" placeholder="음식 검색" class="search-bar fs-12" value="${param.query}">
                        
                    </form>
                </fieldset>
                  <div class="food-details2">
                    <div class="badge fs-12" id="foodBadge">500회 이상</div>
                    <p class="food-name fs-12" id="foodName">비스킷(과자)</p>
                    <p class="serving-size fs-12" id="foodWeight">150g</p>
                    <p class="calories fs-12" style="color: #FFA45B;" id="calories" data-calories="446">446kcal</p>
                    <!-- 수량 선택기 -->
                    <div class="quantity-selector">
                        <button class="quantity-minus" id="quantityMinus">-</button>
                        <input type="text" class="quantity" id="quantityInput" value="1" readonly>
                        <button class="quantity-plus" id="quantityPlus">+</button>
                    </div>
                    <button class="btn-medium__lorange" id="addToDiaryBtn">오늘 일기에 추가하기</button>
                </div>
            </div>
        </div>
    </div>