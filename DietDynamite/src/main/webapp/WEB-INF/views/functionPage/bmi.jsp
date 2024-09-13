<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />
        <link rel="stylesheet" href="/resources/css/functionPage/bmi.css">
        <script src="/resources/js/functionPage/bmi.js" defer></script>
        <title>기능 페이지</title>
    </head>

    <body>
        <jsp:include page="/WEB-INF/views/layout/header.jsp" />
        <main>
            <section class="container-BMI"> 

            <div class="functionPage-nav">
                        <div id="bmiNav-page"><a href="/functionPage/bmi">BMI 지수 측정</a></div>
                        <div id="bmrNav-page"><a href="/functionPage/bmr">기초 대사량 계산</a></div>
                </div>

                <div class="BMI-Area">

                    <div class="top">
                        <i></i>
                        <div class="tipBox">체질량지수(BMI = body mass index)는 카우프지수로 비만을 평가하기 지수이며 세계적으로 쓰이는 공통표준 지수입니다.<br>
                            체지방의 정도를 표준체중보다 비교적 정확하게 반영할 수 있고 매우 간단히 규정할 수 있는 장점이 있습니다.</div>
                    </div>

                    <div class="mid">
                        
                        <div class="mid-top">
                            <div class="inputSty"><span class="spanSty">신장</span><input type="text" id="hei" class="docInput" maxlength="5" value="${loginUser.userProfileHeight}">
                                <p>cm</p>
                            </div>
                            <div class="inputSty"><span class="spanSty">체중</span><input type="text" id="wei" class="docInput" maxlength="5" value="${loginUser.userProfileWeight}">
                                <p>kg</p>
                            </div>
                        </div>

                        <div class="mid-bot">
                            <div class="inputSty"><span class="spanSty orange">BMI</span><p id="bmi"></p></div>
                            <div class="inputSty"><span class="spanSty orange">나의 상태</span><p id="myst"></p></div>
                        </div>
                    </div>

                    <div class="bot">
                        <div class="StandardBox">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>저체중</th>
                                        <th>정상 체중</th>
                                        <th>비만전단계</th>
                                        <th>1단계 비만</th>
                                        <th>2단계 비만</th>
                                        <th>3단계 비만</th>
                                    </tr>

                                    <tr>
                                        <td>18.5kg/㎡</td>
                                        <td>18.5~22.9kg/㎡</td>
                                        <td>23~24.9kg/㎡</td>
                                        <td>25~29kg/㎡</td>
                                        <td>30~34.9kg/㎡</td>
                                        <td>≥35kg/㎡</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


        </main>
        <jsp:include page="/WEB-INF/views/layout/footer.jsp" />
    </body>

    </html>