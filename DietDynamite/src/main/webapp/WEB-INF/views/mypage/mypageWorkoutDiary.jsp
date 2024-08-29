<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/WEB-INF/views/layout/header-dependencies.jsp"/>
    <link rel="stylesheet" href="/resources/css/mypage/mypageSidebar.css">
    <link rel="stylesheet" href="/resources/css/mypage/mypageWorkoutDiary.css">
    <script src="/resources/js/mypage/mypageSidebar.js" defer></script>
    <script src="/resources/js/mypage/mypageWorkoutDiary.js" defer></script>

	<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.14/index.global.min.js'></script>

    <title>MLB - Na</title>
</head>
<body>
    <jsp:include page="/WEB-INF/views/layout/header.jsp"/>
    <main>
        <section class="container">
        	<!-- 사이드바 -->
         	<jsp:include page="/WEB-INF/views/mypage/mypageSidebar.jsp"></jsp:include>   
         
            <!-- 컨텐츠 컨테이너 -->
            <div class="workout-content">
               	<!-- 컨텐츠 헤더 -->
                <p class="content-title fs-18__b"> 운동 기록 </p>
                <p class="fs-15 fc__gray"> 저장한 운동기록을 확인할 수 있습니다.</p>
            	
            	<!-- 컨텐츠 메인 -->
            	<div class="workout-calendar">
            		<p> 운동 일지 </p>
           			<!-- 달력 api -->
				    <div id="calendar-container">
				  		<div id="calendar"></div>
					</div>
            	</div>
            	<div class="workout-analysis">
            		<p class="fs-18__b"> 운동 통계 </p>
            		<div class="workout-analysis-select d-flex">
            			<p> 런닝 </p>
            			<p> 헬스 </p>
            			<p> 수영 </p>
            			<p> 기타 </p>
            		</div>
            		<div class="barchart-analysis"> 막대그래프 </div>
            		<div class="table-analysis">
            			<p> 30일간 운동 기록<p>
            			<table>
            				<tr>
            					<td>소모된 총 칼로리</td>
            					<td> 53120 Kcal</td>
            					<td>가슴으로 밀어낸 시간</td>
            					<td> 230분</td>
            					<td>배를 접었다 편 시간</td>
            					<td> 230분</td>
            				</tr>
            				<tr>
            					<td>뜀박질한 총 거리</td>
            					<td> 523 km</td>
            					<td>등으로 밀어낸 시간</td>
            					<td> 230분</td>
            					<td>팔을 접었다 편 시간</td>
            					<td> 230분</td>
            				</tr>
            				<tr>
            					<td>물장구 친 총 거리</td>
            					<td> 7 km</td>
            					<td>앉았다 일어난 시간</td>
            					<td> 50 분</td>
            					<td>기타 운동 시간</td>
            					<td> 60분</td>
            				</tr>
            			</table>
            		</div>
            		<div class="piechart-analysis">
            			<div> 파이차트 </div>
            			<div>
            				<table>
	            				<tr>
	            					<td>헬스</td>
	            					<td>30%</td>
	            				</tr>
	            				<tr>
	            					<td>런닝</td>
	            					<td> 30%</td>
	            				</tr>
	            				<tr>
	            					<td>수영</td>
	            					<td> 30%</td>
	            				</tr>
	            				<tr>
	            					<td>기타</td>
	            					<td> 25%</td>
	            				</tr>
	            			</table>
            			</div>
            		</div>
            	</div>
				<div class="weight-analysis">
            		<p class="fs-18__b"> 신체 지수 변경 기록 </p>
            		<div> 라인차트</div>
            		<p> 줄어든 뱃살 무게 <span> 20 kg </span></p>
				</div>
			</div>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>