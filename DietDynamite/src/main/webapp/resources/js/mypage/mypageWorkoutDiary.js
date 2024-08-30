var Calendar = FullCalendar.Calendar;	// FULL CALENDAR
var calendar;	// CALENDAR 쓸 변수
var calendarEl = document.getElementById('calendar');	// CALENDAR 렌더링할 위치

// DB 에서 workout 페이지에 필요한 모든 데이터 가져오기
let total_workout_data = [

]

// 캘린더용 데이터 변수
let workout_data_for_calendar;

// 각 차트 변수 모음

let barChart;
let barChartXData;
let barChartYData;
let workout_data_for_barCharts

let doughnutChart
let doughnutChartLabelData;
let doughnutChartValueData;
let doughnutChartColorData;
let workout_data_for_doughnutChart

let lineChart
let lineChartLabelData;
let lineChartValueData;
let body_data_for_lineChart;


$(document).ready(function() {

  // 캘린더 생성 후 렌더링
  workout_data_for_calendar = [
    {id : 'loginUserNo',start : '2024-08-26',name : "바벨 스쿼트",time : "30분"},
    {id : 'loginUserNo',start : '2024-08-27',name : "달리기",time : "30분"},
    {id : 'loginUserNo',start : '2024-08-28',name : "수영",time : "30분"},
    {id : 'loginUserNo',start : '2024-08-29',name : "바벨 스쿼트",time : "15분"},
    {id : 'loginUserNo',start : '2024-08-29',name : "수영",time : "25분"},
  ]
  createCalendar(workout_data_for_calendar);
  calendar.render();

  // Barchart 데이터 생성, 렌더
  barChartXData = ['08-01', '08-02', '08-03', '08-04', '08-05','08-06', '08-07', '08-08', '08-09', '08-10']
  barChartYData = [30, 17, 25, 42, 31,30, 17, 25, 42, 31]
  workout_data_for_barCharts = createBarchartData(barChartXData, barChartYData, "km")
  barChart = createBarchart("barChart", workout_data_for_barCharts)  // "Element id" 및 데이터 입력

  // Doughnutchart 데이터 생성, 렌더
  doughnutChartLabelData = ["헬스", "런닝", "수영", "기타"]
  doughnutChartValueData = [30, 30 ,30, 25 ]
  doughnutChartColorData = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(30, 27, 132)',
  ]
  workout_data_for_doughnutChart = createDonughtchartData(doughnutChartLabelData, doughnutChartValueData, "%", doughnutChartColorData)
  doughnutChart = createDonughtchart("doughnutChart", workout_data_for_doughnutChart)  // "Element id" 및 데이터 입력

  // 라인차트 데이터 생성, 렌더
  lineChartLabelData = ['08-01', '08-02', '08-03', '08-04', '08-05','08-06', '08-07', '08-08', '08-09', '08-10']
  lineChartValueData = [60, 61, 60, 62, 61,60, 67, 65, 62, 61]
  body_data_for_lineChart = createLinechartData(lineChartLabelData, lineChartValueData, "kg")
  lineChart = createLinechart("lineChart", body_data_for_lineChart)  // "Element id" 및 데이터 입력

});


// 바차트 케이스별 다른 데이터 생성
function changeBarChartData(id){
  switch(id){
    case 1 : {  // 런닝
      barChartYData = [30, 17, 203, 15, 76, 20, 15, 35, 62, 1]
      updateBarChartData(barChart, barChartXData, barChartYData, "km")
    }break;
    case 2 : {  // 헬스
      barChartYData = [30, 17, 53, 15, 76, 20, 15, 35, 62, 1]
      updateBarChartData(barChart, barChartXData, barChartYData, "분")
    }break;
    case 3 : {  // 수영
      barChartYData = [30, 17, 13, 15, 66, 20, 15, 35, 62, 1]
      updateBarChartData(barChart, barChartXData, barChartYData, "km")
    }break;
    case 4 : {  // 기타
      barChartYData = [30, 17, 203, 15, 56, 20, 15, 25, 62, 1]
      updateBarChartData(barChart, barChartXData, barChartYData, "분")
    }break;
  }
}
