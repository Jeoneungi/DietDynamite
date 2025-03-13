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
                    <form action="/user/login" method="POST">
                        <div class="login-area">
                            <p>로그인</p>
                            <span class="userInput" id="spanId">아이디<input type="text" name="userId" id="userId"></span>
                            <span class="userInput" id="spanPw">비밀번호<input type="password" name="userPw"id="userPw"></span>
                            <span>
                                <span>자동 로그인<input type="checkbox" id="autoLogin" name="autoLogin"><label for="autoLogin" id="autoLabel"></label></span>
                                <span><a>아이디</a>/<a>비밀번호 찾기</a></span>
                                <span><a href="/user/signup">회원 가입</a></span>
                            </span>
                            <button id="LoginBtn">Login</button>
                        </div>
                    </form>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>