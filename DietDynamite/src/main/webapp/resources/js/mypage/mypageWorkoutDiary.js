var Calendar = FullCalendar.Calendar;	// FULL CALENDAR
var calendar;	// CALENDAR 쓸 변수
var calendarEl = document.getElementById('calendar');	// CALENDAR 렌더링할 위치

// DB 에서 workout 페이지에 필요한 모든 데이터 가져오기
let total_workout_data = [

]
// 캘린더에 필요한 데이터만 정리할 배열
/*  [ 캘린더 데이터 설명 ]
        1. 캘린더 기본 key 
                id, start           
            가져오는 방법
                data.event.id
        
        2. 캘린더 사용자 추가 key
                id,start 를 제외한 나머지
            가져오는 방법
                data.event.extendedProps
    */    
let workout_data_for_calendar = [
  {
    id : 'loginUserNo',
    start : '2024-08-29',
    name : "바벨 스쿼트",
    time : "30분"
  },
  {
    id : 'loginUserNo',
    start : '2024-08-28',
    name : "바벨 스쿼트",
    time : "30분"
  },
  {
    id : 'loginUserNo',
    start : '2024-08-27',
    name : "바벨 스쿼트",
    time : "30분"
  },
  {
    id : 'loginUserNo',
    start : '2024-08-27',
    name : "수영",
    time : "30분"
  }
]

// 3. 캘린더 생성 후 렌더링
createCalendar(workout_data_for_calendar);
calendar.render();

// createCalendar함수
function createCalendar(data){
	
	calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: '',
      center: 'prev title next',
      right: ''
    },
    editable: false,
    droppable: false, // this allows things to be dropped onto the calendar
    drop: function(info) {
      // is the "remove after drop" checkbox checked?
      if (checkbox.checked) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },
    // 한국어 변환
    locale:'ko',
    
    // 일 빼기
    dayCellContent : function(info){
      var number=document.createElement("a");
      number.classList.add("fc-daygrid-day-number");
      number.innerHTML =info.dayNumberText.replace("일","");
      return {
        html:number.outerHTML
      };
    },
    contentHeight:"auto", // 스크롤바 없애기

    // 데이터 - 매개변수로 받아온 data를 events에 넣어줌
    events: data,
    
    eventContent: function(d){
    // id,start 정보는 d.event.id , d.event.start 에 있다.
    if( d.event.id !== ""){    // 
        return {
          // id,start 를 제외한 모든 event관련 정보는 d.event.extendedProps에 있다.
          html: `<div class="workout">
                    <p class="fs-12">${d.event.extendedProps.name}</p> <span class="fs-12">${d.event.extendedProps.time}</span>
                  </div>
                `
        }
      }
    }
  });
}
$(document).ready(function() {
});