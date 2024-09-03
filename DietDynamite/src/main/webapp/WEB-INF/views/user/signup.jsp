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
    <title>signup</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
    <main>
        <section class="container">
                    <from>
                        <div class="signup-area">
                            <p>회원가입</p>
                            <span class="userInput" id="spanId">아이디<input type="text" id="userId"></span>
                            <span class="userInput" id="spanPw">비밀번호<input type="text" id="userPw"></span>
                            <span class="userInput" id="spanPwc">비밀번호 확인<input type="text" id="userPw"></span>
                            <span class="userInput" id="spanEmail">이메일<input type="text" id="userPw"></span>
                            <span class="userInput" id="spanNick">닉네임<input type="text" id="userPw"></span>
                            <span>회원 정보</span>
                            <span class="userInput" id="spanH">키<input type="text" id="userPw">cm</span>
                            <span class="userInput" id="spanW">몸무게<input type="text" id="userPw">kg</span>
                            <span class="userInput" id="spanBd">생년월일<input type="text" id="userPw"></span>
                            <button id="SignUpBtn">SignUp</button>
                        </div>
                    </from>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>