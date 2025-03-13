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
                       <form action="/user/signup" method="POST" onsubmit="signup(event)">
                        <div class="signup-area">
                            <p>회원가입</p>

                            <span class="userInput" id="spanId"><label for="user_id">아이디</label>
                                <input type="text" id="user_id" name="userId" placeholder="영어 소문자 포함 5자 이상 13자 이하" maxlength="13">
                            </span> 


                            <span class="userInput" id="spanPw"><label for="user_pw">비밀번호</label>
                                <input type="password" id="user_pw" name="userPw"  placeholder="영어 소문자, 대문자, 숫자 포함 10자 이상 20자 이하" maxlength="20">
                                </span>

                            <span class="userInput" id="spanPwc"><label for="user_pWc">비밀번호 확인</label>
                                <input type="password" id="user_pWc" name="userPwc" placeholder="비밀번호 재입력" maxlength="20">
                           </span>

                            <span class="userInput" id="spanEmail"><label for="user_email">이메일</label>
                                <input type="text" id="user_email" name="userEmail" placeholder="gildong@naver.com">
                            </span>
                                
                            <span class="userInput" id="spanNick"><label for="user_nickname">닉네임</label>
                                <input type="text" id="user_nickname" name="userNickname" placeholder="2자 이상 8자 이하" max="8">
                            </span>

                            <h1>회원 정보</h1>

                            <span class="userInput" id="spanH"><label for="user_height">키</label>
                                <input type="text" id="user_height" name="ProfileHeight">cm</span>

                            <span class="userInput" id="spanW"><label for="user_weight">몸무게</label>
                                <input type="text" id="user_weight" name="ProfileWeight">kg</span>

                            <span class="userInput" id="spanBd"><label for="user_bd">생년월일</label>
                                <input type="text" id="user_bd" name="BirthDay" placeholder="19981027"></span>
                                
                            <span class="userInput" id="spanGender"><label for="">성별</label>
                                <input type="checkbox" id="manCb" class="cb" value="M" onchange="checkboxCheck(this)"><label class="gendercb" for="manCb">남자</label>
                                <input type="checkbox" id="girlCb" class="cb" value="F" onchange="checkboxCheck(this)"><label class="gendercb" for="girlCb">여자</label>
                            </span>
                                <input name="Gender" id="userGender" value="">

                            <button id="SignUpBtn">SignUp</button>

                        </div>
                    </form>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>