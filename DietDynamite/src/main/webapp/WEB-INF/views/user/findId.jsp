<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/user/findId.css">
    <script src="/resources/js/user/findId.js" defer></script>
    <title>login</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
    <main>
        <section class="container">
                    <form action="/user/findId" method="POST">
                        <div class="findId-area">
                            <p>아이디 찾기</p>
                            <span class="userInput" id="spanId">아이디<input type="text" name="userId" id="userId"></span>
                            <span class="userInput" id="spanEmail">이메일<input type="text" name="userEmail"id="userEmail"></span>
                            <button id="findIdBtn">아이디 찾기</button>
                        </div>
                    </form>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>