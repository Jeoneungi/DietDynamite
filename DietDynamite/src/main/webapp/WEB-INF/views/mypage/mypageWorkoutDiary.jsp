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

	<!-- 캘린더 -->
	<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.14/index.global.min.js'></script>
	<script src="/resources/util/fullCalendar.js" defer></script>
	<!-- 그래프 -->
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<script src="/resources/util/chart.js" defer></script>


    <title>My Sport Record</title>
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
                <p class="fs-12 fc__gray"> 저장한 운동기록을 확인할 수 있습니다.</p>
            	
            	<!-- 컨텐츠 메인 -->
            	<div class="workout-calendar">
            		<p class="fs-16__b mt-20"> 운동 일지 </p>
           			<!-- 달력 api -->
				    <div id="calendar-container">
				  		<div id="calendar"></div>
					</div>
            	</div>
            	<div class="workout-analysis">
            		<p class="fs-16__b mt-20"> 운동 통계 </p>
            		<div class="workout-analysis-select d-flex">
            			<button class="btn-exsmall__lorange" onclick="changeBarChartData(1)"> 런닝 </button>
            			<button class="btn-exsmall__lorange" onclick="changeBarChartData(2)"> 헬스 </button>
            			<button class="btn-exsmall__lorange" onclick="changeBarChartData(3)"> 수영 </button>
            			<%-- <button class="btn-exsmall__lorange" onclick="changeBarChartData(4)"> 기타 </button> --%>
            		</div>
            		<div class="barchart-analysis">
            			<canvas id="barChart"></canvas>
            		</div>
            		<div class="table-analysis">
            			<p class="fs-14__b mt-20"> 30일간 운동 기록<p>
            			<div>
	            			<table>
	            				<tr>
	            					<td>소모된 총 칼로리</td>
	            					<td class="table_cal"> 53120 Kcal</td>
	            					<td>가슴으로 밀어낸 시간</td>
	            					<td class="table_chest"> 230분</td>
	            					<td>배를 접었다 편 시간</td>
	            					<td class="table_abs"> 230분</td>
	            				</tr>
	            				<tr>
	            					<td>뜀박질한 총 거리</td>
	            					<td class="table_run"> 523 km</td>
	            					<td>등으로 밀어낸 시간</td>
	            					<td class="table_back"> 230분</td>
	            					<td>팔을 접었다 편 시간</td>
	            					<td class="table_arms"> 230분</td>
	            				</tr>
	            				<tr>
	            					<td>물장구 친 총 거리</td>
	            					<td class="table_swim"> 7 km</td>
	            					<td>앉았다 일어난 시간</td>
	            					<td class="table_legs"> 50 분</td>
	            					<td>기타 운동 시간</td>
	            					<td class="table_etc"> 60분</td>
	            				</tr>
	            			</table>
            			</div>
            		</div>
            		<div class="piechart-analysis">
            			<p class="fs-14__b mt-20"> 30일간 운동 기록<p>
            			<div class="d-flex">
            				<div class="doughnutChart-container">
	            				<canvas id="doughnutChart"></canvas>
	            				<p class="doughnutChart-center">0 Kcal </p>
            				</div>
            				<div class="doughnutChartLegend">
	            				<table>
		            				<tr>
		            					<td>헬스</td>
		            					<td class="dougnut-helath">0%</td>
		            				</tr>
		            				<tr>
		            					<td>런닝</td>
		            					<td class="dougnut-run"> 0%</td>
		            				</tr>
		            				<tr>
		            					<td>수영</td>
		            					<td class="dougnut-swim"> 0%</td>
		            				</tr>
		            				<tr>
		            					<td>기타</td>
		            					<td class="dougnut-etc"> 0%</td>
		            				</tr>
		            			</table>
            				</div>
            			</div>
            		</div>
            	</div>
				<div class="weight-analysis mt-20">
            		<p class="fs-14__b mt-14">  신체 지수 변경 기록 </p>
      				<div class="lineChart-container">
          				<canvas id="lineChart"></canvas>
       				</div>
				</div>
			</div>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/layout/footer.jsp"/>
</body>
</html>