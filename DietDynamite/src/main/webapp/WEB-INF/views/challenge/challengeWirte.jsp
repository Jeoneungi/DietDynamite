<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="challengeTypeList" value="${map.challengeTypeList}"/>


<!-- <c:set var="challengeBoardList" value="${map.challengeBoardList}"/> -->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/common.css">
    <link rel="stylesheet" href="/resources/css/main/mainSideMenu.css">
    <link rel="stylesheet" href="/resources/css/diary/diarywirte.css">
    <link rel="stylesheet" href="/resources/css/diary/diaryModal.css">
    <script src="https://kit.fontawesome.com/4bef400c33.js" crossorigin="anonymous"></script>
    
</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-detail">
            <h3 class="fs-20__b">챌린지 작성</h3>
            <form action="/challenge/${challengeNo}/insert" method="POST" class="board-write" id="diaryWriteFrm" 
            enctype="multipart/form-data">
           
            <label for="challengeSelect">챌린지 선택:</label>
            <select id="challengeSelect" name="challengeType">
                <c:forEach var="challenge" items="${challengeTypeList}" varStatus="status" >
                    <option value="${status.index + 1}">${challenge}</option>
                </c:forEach>
            </select>



            <input type="text" name="boardTitle" placeholder="제목" id="diaryTitle" class="fs-16"/>
          
            <div class="img-box">
                <div class="boardImg diaryImg">
                    <label for="img0">
                        <img class="preview" src="">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img0" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
            </div>

            <div class="diary-content">
                <h6 class="fs-14" >챌린지 내용</h6>
                 <textarea class="fs-12" name="boardContent"></textarea>
            </div>
            
            <div class="diary-button">
            <button class="btn-medium__lorange" type="submit" id="writebtn">등록</button>
            </div>
            </form>
        </section>
            <section id="side-manu">
                <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
            </section>
    </main>

    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
    <script src="/resources/js/challenge/challengeWirte.js"></script>


</body>
</html>