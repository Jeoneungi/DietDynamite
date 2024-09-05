<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/user/signup.css">
    <script src="/resources/js/user/signup.js" defer></script>
    <script src="https://kit.fontawesome.com/3970146fa7.js" crossorigin="anonymous"></script>
    <title>signup</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
    <main>
        <section class="container">
                    <from>
                        <div class="signup-area">
                            <p>회원가입</p>

                            <span class="userInput" id="spanId"><label for="userId">아이디</label>
                                <input type="text" id="userId" name="userId" placeholder="영어 소문자 시작 영어/숫자 포함 8자~16자">
                                <i class="fa-solid fa-circle-check"></i></span>

                            <span class="userInput" id="spanPw"><label for="userPw">비밀번호</label>
                                <input type="password" id="userPw" name="userPw">
                                <i class="fa-solid fa-circle-check"></i></span>

                            <span class="userInput" id="spanPwc"><label for="userPwc">비밀번호 확인</label>
                                <input type="password" id="userPwc" name="userPwc">
                                <i class="fa-solid fa-circle-check"></i></span>

                            <span class="userInput" id="spanEmail"><label for="userEmail">이메일</label>
                                <input type="text" id="userEmail" name="userEmail">
                                <i class="fa-solid fa-circle-check"></i></span>
                                
                            <span class="userInput" id="spanNick"><label for="userNickname">닉네임</label>
                                <input type="text" id="userNickname" name="userNickname">
                                <i class="fa-solid fa-circle-check"></i></span>

                            <h1>회원 정보</h1>

                            <span class="userInput" id="spanH"><label for="userProH">키</label>
                                <input type="text" id="userProH" name="userProfileHeight">cm</span>

                            <span class="userInput" id="spanW"><label for="userProW">몸무게</label>
                                <input type="text" id="userProW" name="userProfileWeight">kg</span>

                            <span class="userInput" id="spanBd"><label for="userDB">생년월일</label>
                                <input type="text" id="userDB" name="userBirthDay"></span>
                                
                            <span class="userInput" id="spanGender"><label for="">성별</label>
                                남자<input type="checkbox"> 여자<input type="checkbox"></span>

                            <button id="SignUpBtn">SignUp</button>

                        </div>
                    </from>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>