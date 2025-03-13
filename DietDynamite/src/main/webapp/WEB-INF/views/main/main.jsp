<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>
<c:forEach items="${challengeTypeList}" var="challengeType">
	<c:if test="${challengeType.CHALLENGE_NO == challengeNo}">
		<c:set var="challengeName" value="${challengeType.CHALLENGE_NAME}" />
	</c:if>
</c:forEach>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>다이너마이트D.DD</title>
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
    <link rel="stylesheet" href="/resources/css/main/main.css">
    <link rel="stylesheet" href="/resources/css/diary/diaryList.css">
    <link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="main-menu">
          <ul>
            <li><a href="#" class="fs-16" onclick="showContent('challenge',this)">챌린지</a></li>
            <li><a href="#" class="fs-16" onclick="showContent('diary',this)">다이어트일기</a></li>
            <li><a href="#" class="fs-16" onclick="showContent('food',this)">음식정보</a></li>
            <li><a href="#" class="fs-16" onclick="showContent('exercise',this)">운동정보</a></li>
            <li><a href="#" class="fs-16" onclick="showContent('recipe',this)">레시피</a></li>
          </ul>

          <div id="content">
            <div id="challenge" class="tab-content" style="display:none;">
                <div class="challengeList-area">
                    <ul class=challenge-list>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/0'">전 체</button></li>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/1'">30일 아침식사 챌린지</button></button></li>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/2'">30일 유산소 운동 챌린지</button></li>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/3'">30일 눈바디 챌린지</button></li>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/4'">30일 몸무게 재기 챌린지</button></li>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/5'">30일 계단 운동 챌린지</button></li>
                    <li> <button class="btn-medium__lorange" onclick="location.href='/challenge/6'">30일 스트레칭 챌린지</button></li>
                    </ul>
                </div>
            </div>
            <div id="diary" class="tab-content" style="display:none;">
                <!-- 다이어리 내용 -->
              <ul class="diary-list">
                <li><a href="/diary/1/100"><img src="/resources/images/diary/diaryWork.jpg"><p>100번째 게시글</p></a></li>
                <li><a href="/diary/1/99"><img src="/resources/images/diary/diaryWork.jpg"><p>99번째 게시글</p></a></li>
                <li><a href="/diary/1/98"><img src="/resources/images/diary/diaryWork.jpg"><p>98번째 게시글</p></a></li>
                <li><a href="/diary/1/97"><img src="/resources/images/diary/diaryWork.jpg"><p>97번째 게시글</p></a></li>
                <li><a href="/diary/1/96"><img src="/resources/images/diary/diaryWork.jpg"><p>96번째 게시글</p></a></li>
                <li><a href="/diary/1/95"><img src="/resources/images/diary/diaryWork.jpg"><p>95번째 게시글</p></a></li>
                <li><a href="/diary/1/94"><img src="/resources/images/diary/diaryWork.jpg"><p>94번째 게시글</p></a></li>
                <li><a href="/diary/1/93"><img src="/resources/images/diary/diaryWork.jpg"><p>93번째 게시글</p></a></li>
                <li><a href="/diary/1/92"><img src="/resources/images/diary/diaryWork.jpg"><p>92번째 게시글</p></a></li>
            </ul>

           
            </div>
            <div id="food" class="tab-content" style="display:none;">
                <div>
                <p class="fs-16">dardaby커널스슈퍼믹스팝콘(과자) / 55g / 473kcal</span></p>
                

                <table class="food-table">
                <tbody><tr>
                    <td>단백질</td>
                    <td>4(g)</td>
                    <td>지방</td>
                    <td>20(g)</td>
                </tr>
                <tr>
                    <td>당류</td>
                    <td>34.55(g)</td>
                    <td>탄수화물</td>
                    <td>72.73(g)</td>
                </tr>
                <tr>
                    <td>식이섬유</td>
                    <td>050(g)</td>
                    <td>나트륨</td>
                    <td>182(g)</td>
                </tr>
                <tr>
                    <td>콜레스테롤</td>
                    <td>16.36(g)</td>
                    <td>포화지방</td>
                    <td>9.09(g)</td>
                </tr>
                <tr>
                    <td>트랜스지방</td>
                    <td>10(g)</td>
                    <td>제조자</td>
                    <td>(주)제이앤이</td>
                </tr>
                </tbody>
                </table>
                </div>

                <div>
                <p class="fs-16">33한체다치즈팝콘(과자) / 150g /478kcal</p>
                    <table class="food-table">
                        <tbody>
                        <tr>
                            <td>단백질</td>
                            <td>9.34(g)</td>
                            <td>지방</td>
                            <td>19.5(g)</td>
                        </tr>
                        <tr>
                            <td>당류</td>
                            <td>4.58(g)</td>
                            <td>탄수화물</td>
                            <td>66.2(g)</td>
                        </tr>
                        <tr>
                            <td>식이섬유</td>
                            <td>050(g)</td>
                            <td>나트륨</td>
                            <td>594(g)</td>
                        </tr>
                        <tr>
                            <td>콜레스테롤</td>
                            <td>11.9(g)</td>
                            <td>포화지방</td>
                            <td>11.6(g)</td>
                        </tr>
                        <tr>
                            <td>트랜스지방</td>
                            <td>20(g)</td>
                            <td>제조자</td>
                            <td>대한푸드텍(주)</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                

            </div>

            <div id="exercise" class="tab-content" style="display:none;">

            <section>
			<h6 class="fs-20__b">운동 정보</h6>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/aKzE3NNFEi4?si=tOKTUmocim-uUjuM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

			<div id="food-cont" class="food-cont">
			</div>

			<div id="workout-info-box" class="workout-info-box">
			</div>
		    </section>



            <div id="recipe" class="tab-content" style="display:none;">
                <h2>레시피 정보</h2>
                <!-- 레시피 내용 추가 -->
            </div>
          </div>
        </section>
        <section id="side_menu">
            <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
    <script src="/resources/js/main/main.js"></script>
    <%-- <script src="/resources/js/dietInfo/workoutInfo.js"></script> --%>
    <script src="/resources/js/dietInfo/foodInfo.js"></script>

</body>
</html>