<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>

<div class="chatting-container card__white hide">
    <jsp:include page="/WEB-INF/views/chatting/chattingAddUser.jsp"></jsp:include>

    <!-- 채팅 기능 헤더 -->
    <div class="chatting-header base__lorange d-flex">
        <div class="chatting-add-div d-flex" onclick="showAddUserTab()">
            <p class="fs-18__ex fc__white">채팅</p>
            <button class="btn-exsmall__orange"> + </button>
        </div>
        <div class="chatting-info-div d-flex">
            <div class="participant-profiles">
                <img class="participant-profile" src="/resources/images/profile/user_img1.jpg">
            </div>
            <div class="chatting-room-info d-flex">
                <!-- 채팅방 정보 표기 -->
                <div>
                    <p class="fs-15__b fc__white"> 단체 채팅방2 </p>
                    <div class="participant-info d-flex">
                        <img class="participant-number-icon" src="/resources/images/icons/human.png">
                        <p class="participant-number fs-15"> 3 </p>
                    </div>
                </div>
                <!-- 닫기버튼 -->
                <button class="btn-exsmall__orange base__red" style="width: 30px; height: 30px;" onclick="hideChattingTab()">
                    X
                </button>
            </div>
        </div>
    </div>

    <!-- 채팅 기능 내용 -->
    <div class="chatting-content">
        <!-- 채팅방 정보 -->
        <ul class="chatting-list">
            <li class="chatting-item" chat-no="1">
                <div class="item-profile">
                    <img src="/resources/images/profile/user_img1.jpg">
                </div>
                <div class="item-body d-flex">
                    <div class="d-flex">
                        <p class="chatting-room-name">유저닉네임1</p>
                        <div class="participant-number d-flex ml-10">
                            <img class="participant-number-icon" src="/resources/images/icons/human.png">
                            <p class="participant-number fs-10"> 2 </p>
                        </div>
                    </div>
                    <div class="chtting-room-info d-flex mt-4">
                        <p> 최근 보내진 메시지 </p>
                        <p class="not-read-count fs-10">3</p>
                    </div>
                </div>
            </li>
            <li class="chatting-item" chat-no="1">
                <div class="item-profile">
                    <img src="/resources/images/profile/user_img1.jpg">
                </div>
                <div class="item-body d-flex">
                    <div class="d-flex">
                        <p class="chatting-room-name">단체채팅방1</p>
                        <div class="participant-number d-flex ml-10">
                            <img class="participant-number-icon" src="/resources/images/icons/human.png">
                            <p class="participant-number fs-10"> 3 </p>
                        </div>
                    </div>
                    <div class="chtting-room-info d-flex mt-4">
                        <p> 최근 보내진 메시지 </p>
                        <p class="not-read-count fs-10">3</p>
                    </div>
                </div>
            </li>
            <li class="chatting-item room-selected" chat-no="1">
                <div class="item-profile">
                    <img src="/resources/images/profile/user_img1.jpg">
                </div>
                <div class="item-body d-flex">
                    <div class="d-flex">
                        <p class="chatting-room-name">단체채팅방1</p>
                        <div class="participant-number d-flex ml-10">
                            <img class="participant-number-icon" src="/resources/images/icons/human.png">
                            <p class="participant-number fs-10"> 3 </p>
                        </div>
                    </div>
                    <div class="chtting-room-info d-flex mt-4">
                        <p> 최근 보내진 메시지 </p>
                        <p class="not-read-count fs-10">3</p>
                    </div>
                </div>
            </li>
        </ul>

        <!-- 채팅 표시 및 입력창 -->
        <div class="chatting-text-area">
            <ul class="chatting-display-area">
                <li class="my-chat">
                    <span class="chatDate">14:01</span>
                    <p class="chat">가나다라마바사</p>
                </li>
  
                <li class="target-chat">
                    <img src="/resources/images/profile/user_img1.jpg">
                    <div>
                       <b>이번유저</b>   <br>
                       <p class="chat">
                          안녕하세요?? 반갑습니다.<br>
                          ㅎㅎㅎㅎㅎ
                       </p>
                       <span class="chatDate">14:05</span>
                    </div>
                </li>

                <li class="my-chat">
                    <span class="chatDate">14:01</span>
                    <p class="chat">가나다라마바사</p>
                </li>

                <li class="my-chat">
                    <span class="chatDate">14:01</span>
                    <p class="chat">가나다라마바사</p>
                </li>
            </ul>
            

            <div class="chatting-input-area d-flex">
                <textarea id="inputChatting" class="fs-12" rows="3"></textarea>
                <button id="send" class="btn-exsmall__orange">보내기</button>
            </div>
        </div>
    </div>
</div>