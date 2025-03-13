<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <c:set var="pagination" value="${map.pagination}" />
        <c:set var="recipeList" value="${map.recipeList}" />

        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp" />
            <link rel="stylesheet" href="/resources/css/recipe/recipeMain.css">
            <link rel="stylesheet" href="/resources/css/recipe/recipeModal.css">
            <link rel="stylesheet" href="/resources/css/recipe/recipeInsert.css">

            <script src="/resources/js/recipe/recipeMain.js" defer></script>
            <title>레시피</title>
        </head>

        <body>

            <jsp:include page="/WEB-INF/views/layout/header.jsp" />
            <jsp:include page="/WEB-INF/views/recipe/recipeModal.jsp" />
            <jsp:include page="/WEB-INF/views/recipe/recipeInsert.jsp" />
            <jsp:include page="/WEB-INF/views/recipe/recipeUpdate.jsp" />
            <main>
                <section class="container">
                    <span class="mainText">
                        <h1>다이어트 레시피</h1>
                        <p>비건레시피</p>
                    </span>
                    <div class="recipe-nav">
                        <a href="#">전체 레시피</a>
                        <a href="#">인기 레시피</a>
                        <a href="#">비건 레시피</a>
                        <a href="#">가성비 레시피</a>
                    </div>

                    <div class="recipe-board">
                        <c:choose>
                            <%-- 게시글 목록 조회 결과가 비어있다면--%>
                                <c:when test="${empty recipeList}">
                                    <tr>
                                        <th colspan="6">게시글이 존재하지 않습니다.</th>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach var="recipe" items="${recipeList}" varStatus="status">
                                        <div class="recipe-area">
                                            <div class="rNo">${recipe.recipeNo}</div>
                                            <div class="recipe-top">
                                                <a class="recipe-tilte">${recipe.recipeTitle}</a>
                                                <span class="price-area">비용 : <a
                                                        class="price">${recipe.recipePrice}</a>원</span>
                                                <span class="cookTime-area">조리시간 : <a
                                                        class="cookTime">${recipe.recipeCookTime}</a></span>
                                            </div>
                                            <div class="recipe-info">
                                                <div class="sum-area">

                                                    <c:if test="${empty recipe.recipeImage}">
                                                    <img src="/resources/images/recipe/recipeImage.webp">
                                                    </c:if>

                                                    <c:if test="${!empty recipe.recipeImage}">
                                                    <img src="${recipe.recipeImage}" alt="">
                                                    </c:if>

                                                </div>
                                                <div class="tip-area">
                                                    <div class="content">${recipe.recipeContent}</div>
                                                    <div class="nutrition-area">
                                                        <span class="cal-area">100g 칼로리 : <a
                                                                class="cal">${recipe.recipeCal}</a>Kacl </span>
                                                        <div class="tdg-area">
                                                            <span><span class="tdg">탄수화물 : </span> <a
                                                                    class="hydro">${recipe.recipeHydro}</a>g</span>
                                                            <span><span class="tdg">단백질 : </span> <a
                                                                    class="protein">${recipe.recipeProtein}</a>g</span>
                                                            <span><span class="tdg">지방 : </span> <a
                                                                    class="fat">${recipe.recipeFat}</a>g</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </c:otherwise>
                        </c:choose>

                        <button id="insert">레시피 작성</button>

                        <div class="page">
                            <ul>
                                <li><a href="/recipe/main?cp=1">&lt;&lt;</a></li>
                                <li><a href="/recipe/main?cp=${pagination.prevPage}">&lt;</a></li>

                                <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}">
                                    <c:choose>
                                        <c:when test="${i==pagination.currentPage}">
                                            <li><a class="current">${i}</a></li>
                                        </c:when>
                                        <c:otherwise>
                                            <li><a href="/recipe/main?cp=${i}">${i}</a></li>
                                        </c:otherwise>
                                    </c:choose>

                                </c:forEach>

                                <li><a href="/recipe/main?cp=${pagination.nextPage}">&gt;</a></li>
                                <li><a href="/recipe/main?cp=${pagination.maxPage}">&gt;&gt;</a></li>
                            </ul>
                        </div>

                </section>
            </main>
            <jsp:include page="/WEB-INF/views/layout/footer.jsp" />
            <script src="/resources/js/recipe/recipeMain.js"></script>
            <script src="/resources/js/recipe/recipeInsert.js"></script>
            <script src="/resources/js/recipe/recipeUpdate.js"></script>
        </body>

        </html>