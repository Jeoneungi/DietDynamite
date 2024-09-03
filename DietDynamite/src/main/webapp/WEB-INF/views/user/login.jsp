<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/user/login.css">
    <script src="/resources/js/user/login.js" defer></script>
    <title>login</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
    <main>
        <section class="container">
                    <from>
                        <div class="login-area">
                            <p>로그인</p>
                            <span class="userInput" id="spanId">아이디<input type="text" id="userId"></span>
                            <span class="userInput" id="spanPw">비밀번호<input type="password" id="userPw"></span>
                            <span>
                                <span>아이디 저장<input type="checkbox"></span>
                                <span><a>아이디</a>/<a>비밀번호 찾기</a></span>
                                <span>회원 가입</span>
                            </span>
                            <button id="LoginBtn">Login</button>
                        </div>
                    </from>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>