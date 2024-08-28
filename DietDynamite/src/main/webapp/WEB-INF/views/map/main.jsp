<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <title>카카오 지도 API 예제</title>

    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}"></script>

     <script>
        const kakaoKey = ${kakaoKey}
    </script>

    <script src="https://kit.fontawesome.com/4bef400c33.js" crossorigin="anonymous"></script>

    <script src="/resources/js/map/map.js"></script>
    <link rel="stylesheet" href="/resources/css/map/map.css">
</head>
<body class="MAP">
    <div class="area">
        <div class="info-container">
            <div class="info">
                <input type="text" id="keyword" placeholder="키워드를 입력하세요">
                <button id="searchBtn">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div id="favorites-container">
                <h3>즐겨찾기 목록</h3>
                <ul id="favorites">
                    <!-- 즐겨찾기 목록이 여기에 추가될 예정입니다. -->
                </ul>
            </div>
            <div id="result-list" style="display: none;"></div>
        </div>

        <div class="map-container">
            <div id="map"></div>
        </div>
    </div>
</body>
</html>
