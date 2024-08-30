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
    <link rel="stylesheet" href="/resources/css/diary/diaryList.css">
</head>
<body>
   <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
   
    <main>
        <section id="diary-list">
            <h6 class="fs-20__b">다이어트 일기</h6>
                <table>
                    <thead>
                        <tr class="base__orange fs-14__b">
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                            <th>좋아요</th>
                        </tr>
                    </thead>

                    <tbody>
                         <tr>
                            <td>100</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr class="base__llorange">
                            <td>99</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr>
                            <td>98</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr class="base__llorange">
                            <td>97</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr>
                            <td>96</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr class="base__llorange">
                            <td>95</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr>
                            <td>94</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr class="base__llorange">
                            <td>93</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr>
                            <td>92</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>

                        <tr class="base__llorange">
                            <td>91</td>
                            <td>다이어트힘들어[0]</td>
                            <td>유저일</td>
                            <td>1시간전</td>
                            <td>20</td>
                            <td>5</td>
                        </tr>
                       
                    </tbody>
                </table>

                <ul>
                    <li><a href="#">&lt;&lt;</a></li>
                    <li><a href="#">&lt;</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">6</a></li>
                    <li><a href="#">7</a></li>
                    <li><a href="#">8</a></li>
                    <li><a href="#">9</a></li>
                    <li><a href="#">10</a></li>
                    <li><a href="#">&gt;</a></li>
                    <li><a href="#">&gt;&gt;</a></li>
                </ul>
                <div class="diary-search">
                    <form action="#" method="get" id="diarySearch">

                        <select name="key" id="searchKey">
                            <option value="t">제목</option>
                            <option value="c">내용</option>
                            <option value="tc">제목+내용</tion>
                            <option value="w">작성자</option>
                        </select>
        
                        <input type="text" name="query"  id="searchQuery" placeholder="검색어를 입력해주세요.">
        
                        <button class="btn-medium__lorange">검색</button>
                    </form>
                </div>
        </section>
        <section id="side-manu">
            <jsp:include page="/WEB-INF/views/diary/mainSideMenu.jsp"/>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>