<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />
        <link rel="stylesheet" href="/resources/css/functionPage/bmr.css">
        <script src="/resources/js/functionPage/bmr.js" defer></script>
        <title>기능 페이지</title>
    </head>
    <body>
        <jsp:include page="/WEB-INF/views/layout/header.jsp" />
        <main>
            <section class="container-BMR"> 

                <div class="functionPage-nav">
                        <div id="bmiNav-page"><a href="/functionPage/bmi">BMI 지수 측정</a></div>
                        <div id="bmrNav-page"><a href="/functionPage/bmr">기초 대사량 계산</a></div>
                </div>

                <div class="BMR-Area">

                    <div class="top">
                        <i></i>
                        <div class="tipBox">생명을 유지하는데 필요한 최소한의 에너지량을 말합니다.<br>
                            체온유지나 호흡, 심장박동 등 기초적인 생명활동을 위한 신진대사에 쓰이는 에너지량으로<br> 
                            보통 휴식상태 또는 움직이지 않고 가만히 있을 때 기초대사량만큼의 에너지를 소모합니다</div>
                    </div>

                    <div class="mid">
                        
                        <div class="mid-top">
                            <div class="inputSty"><span class="spanSty">성별</span>
                                <select id="gen" value="${loginUser.userGender}">
                                    <option value="0">선택</option>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </div>
                            <div class="inputSty"><span class="spanSty">체중</span><input type="text" id="wei" class="docInput" maxlength="5" value="${loginUser.userProfileWeight}">
                                <p>kg</p>
                            </div>
                        </div>


                        <div class="mid-mid">
                            <div class="inputSty"><span class="spanSty">신장</span><input type="text" id="hei" class="docInput" maxlength="5" value="${loginUser.userProfileHeight}">
                                <p>cm</p>
                            </div>
                            <div class="inputSty"><span class="spanSty">나이</span><input type="text" id="old" class="docInput" maxlength="5" value="${loginUser.userProfileHeight}">
                                <p>만(세)</p>
                            </div>
                        </div>

                        <div class="mid-bot">
                            <div class="inputSty"><span class="spanSty orange">칼로리</span><p id="cal"></p>
                                <p>Kcal</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


        </main>
        <jsp:include page="/WEB-INF/views/layout/footer.jsp" />
    </body>

    </html>