//======================================================================================================================================================================
// 바 차트(barChart) ====================================================================================================================================================
const barChartdataSample = {
    labels: ['01일', '02일', '03일'],   // X축 데이터
    datasets: [{
        label: '분',                    // 레전드
        data: [50, 232, 23],            // Y축 데이터
        borderWidth: 1,
        backgroundColor: '#FFAB5E',     // 막대 내부 색상 설정
        borderColor: '#FF7400',         // 막대 테두리 설정
        borderWidth: 1
    }],
} 

// 바 차트 데이터 생성
function createBarchartData(xDataArr, yDataArr, unit){
    const data = {
        labels: xDataArr,               // X축 데이터
        datasets: [{
            label: unit,                // 레전드
            data: yDataArr,             // Y축 데이터
            borderWidth: 1,
            backgroundColor: '#FFAB5E', // 막대 내부 색상 설정
            borderColor: '#FF7400',     // 막대 테두리 설정
            borderWidth: 1              // 막대 굵기
        }],
    }

    return data;
}

// 바 차트 생성
function createBarchart(chartid, data){
    const ctx = document.getElementById(chartid);

    const barChart = new Chart(ctx, {
      type: 'bar',  // 타입
      data: data,   // 데이터 입력
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })

    return barChart;
}

// 바 차트 데이터 전부 삭제
function removeBarChartDataAll(chart){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.length = 0     // 내부 배열의 길이를 0 으로 만들어서 완전 제거
        dataset.data.label = ""      // 라벨 비우기
        // dataset.data.pop();
    });
    chart.update();
}

// 바 차트 데이터 전부 추가
function addBarChartDataAll(chart, xData, yData, unit){
    chart.data.labels = [...xData];
    chart.data.datasets.forEach((dataset) => {
        dataset.label = unit
        dataset.data = [...yData]
    });
    chart.update();
}

// 바 차트 업데이트(추가/삭제)
function updateBarChartData(chart, xData, yData, unit){
    removeBarChartDataAll(chart);
    addBarChartDataAll(chart, xData, yData, unit);
}

//======================================================================================================================================================================
// 도넛차트(donughtChart) ===========================================================================================================================
const donughtChartdataSample = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
} 

// 도넛차트 데이터 생성
function createDonughtchartData(labelDataArr, valueDataArr, unit, colorSetArr){
    const data = {
        labels: labelDataArr,
        datasets: [{
          label: unit,
          data: valueDataArr,
          backgroundColor: colorSetArr,
          hoverOffset: 4
        }]
      };

    return data;
}

// 도넛차트 생성
function createDonughtchart(chartid, data){
    const ctx = document.getElementById(chartid);

    const donughtChart = new Chart(ctx, {
      type: 'doughnut',  // 타입
      data: data   // 데이터 입력
    })

    return donughtChart;
}

// 도넛차트 데이터 전부 삭제
function removeDonughtchartDataAll(chart){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.length = 0     // 내부 배열의 길이를 0 으로 만들어서 완전 제거
        dataset.data.label = ""      // 라벨 비우기
        dataset.backgroundColor.length = 0  // 컬러 데이터 비우기
        // dataset.data.pop();
    });
    chart.update();
}

// 도넛차트 데이터 전부 추가
function addDonughtchartDataAll(labelDataArr, valueDataArr, unit, colorSetArr){
    chart.data.labels = [...labelDataArr];
    chart.data.datasets.forEach((dataset) => {
        dataset.label = unit
        dataset.data = [...valueDataArr]
        dataset.backgroundColor = [...colorSetArr]
    });
    chart.update();
}

// 도넛차트 업데이트(추가/삭제)
function updateDonughtchartData(chart, labelDataArr, valueDataArr, unit, colorSetArr){
    removeBarChartDataAll(chart);
    addBarChartDataAll(chart, labelDataArr, valueDataArr, unit, colorSetArr);
}


//======================================================================================================================================================================
// 라인차트(donughtChart) ===========================================================================================================================
const lineChartdataSample = {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
} 

// 라인차트 데이터 생성
function createLinechartData(labelDataArr, valueDataArr, unit){
    const data = {
        labels: labelDataArr,
        datasets: [{
            label: unit,
            data: valueDataArr,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
      };

    return data;
}

// 라인차트 생성
function createLinechart(chartid, data){
    const ctx = document.getElementById(chartid);

    const lineChart = new Chart(ctx, {
      type: 'line',  // 타입
      data: data   // 데이터 입력
    })

    return lineChart;
}

//  라인차트 데이터 전부 삭제
function removeLinechartDataAll(chart){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.length = 0     // 내부 배열의 길이를 0 으로 만들어서 완전 제거
        dataset.data.label = ""      // 라벨 비우기
    });
    chart.update();
}

// 라인차트 데이터 전부 추가
function addLinechartDataAll(labelDataArr, valueDataArr, unit){
    chart.data.labels = [...labelDataArr];
    chart.data.datasets.forEach((dataset) => {
        dataset.label = unit
        dataset.data = [...valueDataArr]
    });
    chart.update();
}

// 라인차트 업데이트(추가/삭제)
function updateLinechartData(chart, labelDataArr, valueDataArr, unit){
    removeBarChartDataAll(chart);
    addBarChartDataAll(chart, labelDataArr, valueDataArr, unit);
}

