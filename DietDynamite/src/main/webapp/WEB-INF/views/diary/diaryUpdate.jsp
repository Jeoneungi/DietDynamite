<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
    <script src="https://kit.fontawesome.com/4bef400c33.js" crossorigin="anonymous"></script>

</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-detail">
            <h3 class="fs-20__b">다이어트 일기</h3>
            <form action="/diary/${boardType}/${boardNo}/update" method="POST" class="board-write" id="boardUpdateFrm" 
            enctype="multipart/form-data">  
           
            <input type="text" name="boardTitle" placeholder="제목" value="${board.boardTitle}" id="diaryTitle" class="fs-16"/>
          
            <div class="img-box">
                <div class="boardImg diaryImg">
                    <label for="img0">
                          <img class="preview" src="${board.boardImg}" data-original-src="${board.boardImg}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img0" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
            </div>

           <span class="fs-12 info_color">*오늘먹은음식 혹은 오늘한 운동을 클릭하면 검색해 추가 할수있습니다. 누적칼로리및 몸무게 증감량은 자동으로 계산됩니다.</span>
            <div class="diaryInfo">
             
                <div class="section">
                    <div class="section-title">오늘 먹은 음식</div>
                    <div class="item">
                       
                    </div>
                    <div class="section-title">오늘한 운동</div>
                    <div class="item">
                        
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">누적 칼로리</div>
                    <div class="item">
                     
                    </div>
             
                    <div class="section-title">몸무게 증감량 예상</div>
                        <div class="item">
                          
                        </div>
                    </div>
              
            </div>
           

            </div>
            <div class="diary-content">
                <h6 class="fs-14" >일기</h6>
                 <textarea class="fs-12" name="boardContent">${board.boardContent}</textarea>
            </div>
            
            <div class="diary-button">
            <button class="btn-medium__lorange" type="submit" id="writebtn">등록</button>
            </div>
            <input type="hidden" name="deleteList" value="">
            <input type="hidden" name="cp" value="${param.cp}">

            </form>
        </section>
            <section id="side-manu">
                <jsp:include page="/WEB-INF/views/main/mainSideMenu.jsp"/>
            </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
    <script src="/resources/js/diary/diaryUpdate.js"></script>

</body>
</html>