var Calendar = FullCalendar.Calendar;	// FULL CALENDAR
var calendar;	// CALENDAR 쓸 변수
var calendarEl = document.getElementById('calendar');	// CALENDAR 렌더링할 위치

// DB 에서 workout 페이지에 필요한 모든 데이터 가져오기
let total_workout_data = []

// 캘린더용 데이터 변수
let workout_data_for_calendar = [];

// 각 차트 변수 모음
let barChart;
let barChartXData =[];
const barChartYDataForHealth = [];
const barChartYDataForRunning = [];
const barChartYDataForSwimming = [];
const barChartYDataForEtc = [];
let workout_data_for_barCharts = [];

let doughnutChart
let doughnutChartLabelData = [];
let doughnutChartValueData = [];
let doughnutChartColorData = [];
let workout_data_for_doughnutChart = []

let lineChart
let lineChartLabelData = [];
let lineChartValueData = [];
let body_data_for_lineChart = [];

$(document).ready(function () {
    getUserWorkouts();
});

// 유저 운동 데이터 GET
function getUserWorkouts() {
    const request_url = `/rest/mypage/getUserWorkouts?userNo=${loginUserNo}`
    $.ajax({
        type: "get",
        url: request_url,
        dataType: "json",
        success: function (res) {
            if (res.length > 0) {
                total_workout_data = res

                // 달력 데이터 생성, 렌더
                processingCalendarData(total_workout_data)

                // 운동 통계 바 차트 데이터 생성, 렌더
                processingBarchartData(total_workout_data)

                // 테이블 데이터 생성, 렌더
                processingTableData(total_workout_data)

                // 도넛차트 데이터 생성, 렌더
                processingDonughtchartData(total_workout_data)

                // 라인차트 데이터 생성 ,렌더
                processingLinechartData(total_workout_data)
            }else{
                processingCalendarData([])
                processingBarchartData([])
                processingTableData([])
                processingDonughtchartData([])
                processingLinechartData([])
            }
        }
    });
}

// 달력 데이터 변환
function processingCalendarData(total_workout_data) {
    workout_data_for_calendar = total_workout_data.map(item => {
        let data = {}
        data["id"] = item["userWorkoutNo"]
        data["start"] = item["workoutDate"]
        data["name"] = item["workoutName"]
        data["time"] = item["workoutTime"] + "분"

        return data
    })

    createCalendar(workout_data_for_calendar);
    calendar.render();
}

// 운동 통계 바 차트 데이터 변환
function processingBarchartData(total_workout_data) {
    total_workout_data.map(item =>{
        switch(item["analysisTypeNo"]){
            case 1 : barChartYDataForRunning.push(item["workoutDistance"]);break;
            case 2 : barChartYDataForSwimming.push(item["workoutDistance"]);break;
            case 7 : barChartYDataForEtc.push(item["workoutTime"]);break;
            default : barChartYDataForHealth.push(item["workoutTime"]);break;
        }
        barChartXData.push(item["workoutDate"].substring(5))
    })
    workout_data_for_barCharts = createBarchartData(barChartXData, barChartYDataForRunning, "km")
    barChart = createBarchart("barChart", workout_data_for_barCharts)  // "Element id" 및 데이터 입력
}

// 바차트 케이스별 데이터 변경
function changeBarChartData(id) {
    switch (id) {
        case 1: {  // 런닝
            updateBarChartData(barChart, barChartXData, barChartYDataForRunning, "km")
        } break;
        case 2: {  // 헬스
            updateBarChartData(barChart, barChartXData, barChartYDataForHealth, "분")
        } break;
        case 3: {  // 수영
            updateBarChartData(barChart, barChartXData, barChartYDataForSwimming, "km")
        } break;
        case 4: {  // 기타
            updateBarChartData(barChart, barChartXData, barChartYDataForEtc, "분")
        } break;
    }
}

// 30일 운동기록 데이터 변환
function processingTableData() {
    let totalCal = 0;
    let totalRunningDistacne = 0;
    let totalSwimmingDistacne = 0;
    let totalChestTime = 0;
    let totalBackTime = 0;
    let totalAbsTime = 0;
    let totalLegsTime = 0;
    let totalArmsTime = 0;
    let totalEtcTime = 0;

    total_workout_data.map(item =>{
        totalCal += item["workoutCal"];
        switch(item["analysisTypeNo"]){
            case 1 : totalRunningDistacne += item["workoutDistance"];break;
            case 2 : totalSwimmingDistacne += item["workoutDistance"];break;
            case 3 : totalChestTime += item["workoutTime"];break;
            case 4 : totalBackTime += item["workoutTime"];break;
            case 5 : totalAbsTime += item["workoutTime"];break;
            case 6 : totalLegsTime += item["workoutTime"];break;
            case 8 : totalArmsTime += item["workoutTime"];break;
            case 7 : totalEtcTime += item["workoutTime"];break;
        }
    })

    $(".table_cal").text(totalCal + "Kcal")
    $(".table_run").text(totalRunningDistacne + "km")
    $(".table_swim").text(totalSwimmingDistacne + "km")
    $(".table_chest").text(totalChestTime + "분")
    $(".table_back").text(totalBackTime + "분")
    $(".table_abs").text(totalAbsTime + "분")
    $(".table_legs").text(totalLegsTime + "분")
    $(".table_arms").text(totalArmsTime + "분")
    $(".table_etc").text(totalEtcTime + "분")
    
}

// 운동기록 도넛차트 데이터 변환
function processingDonughtchartData(total_workout_data) {
    let totalRunningCal = 0;
    let totalSwimmingCal = 0;
    let totalHealthCal = 0;
    let totalEtcCal = 0;
    let totalCal = 0;

    total_workout_data.map(item =>{
        console.log(item)
        switch(item["analysisTypeNo"]){
            case 1 : totalRunningCal += item["workoutCal"];break;
            case 2 : totalSwimmingCal += item["workoutCal"];break;
            case 7 : totalEtcCal += item["workoutCal"];break;
            default : totalHealthCal += item["workoutCal"];break;
        }
    })

    totalCal = totalRunningCal  + totalSwimmingCal + totalHealthCal + totalEtcCal

    // Doughnutchart 데이터 생성, 렌더 (%)
    doughnutChartLabelData = ["헬스", "런닝", "수영", "기타"]
    doughnutChartColorData = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(30, 27, 132)',
    ]
    
    if (totalCal != 0){
        doughnutChartValueData = [
            totalHealthCal/totalCal * 100, 
            totalRunningCal/totalCal * 100 , 
            totalSwimmingCal/totalCal * 100, 
            totalEtcCal/totalCal * 100
        ]
        $(".doughnutChart-center").text(totalCal + "Kcal")
        $(".dougnut-helath").text( Math.ceil(totalHealthCal/totalCal * 100)  + "%")
        $(".dougnut-run").text( Math.ceil(totalRunningCal/totalCal * 100)  + "%")
        $(".dougnut-swim").text( Math.ceil(totalSwimmingCal/totalCal * 100)  + "%")
        $(".dougnut-etc").text(  Math.ceil(totalEtcCal/totalCal * 100)  + "%")
    }

    workout_data_for_doughnutChart = createDonughtchartData(doughnutChartLabelData, doughnutChartValueData, "%", doughnutChartColorData)
    doughnutChart = createDonughtchart("doughnutChart", workout_data_for_doughnutChart)  // "Element id" 및 데이터 입력
}

// 신체 지수 변경 기록 차트 데이터 변환
function processingLinechartData(total_workout_data) {
    total_workout_data.map(item =>{
        lineChartLabelData.push(item["workoutDate"].substring(5))
        lineChartValueData.push(item["userWeight"])
    })
    
    // 라인차트 데이터 생성, 렌더
    body_data_for_lineChart = createLinechartData(lineChartLabelData, lineChartValueData, "kg")
    lineChart = createLinechart("lineChart", body_data_for_lineChart)  // "Element id" 및 데이터 입력
}