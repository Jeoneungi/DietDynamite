/*  [ 캘린더 데이터 설명 ] - 캘린더 샘플 데이터
    1. 캘린더 기본 key 
            id, start           
        가져오는 방법
            data.event.id
    
    2. 캘린더 사용자 추가 key
            id,start 를 제외한 나머지
        가져오는 방법
            data.event.extendedProps
*/
let calendarSampleData = [
  {id : 'loginUserNo',start : '2024-08-26',name : "바벨 스쿼트",time : "30분"},
  {id : 'loginUserNo',start : '2024-08-27',name : "달리기",time : "30분"},
  {id : 'loginUserNo',start : '2024-08-28',name : "수영",time : "30분"},
  {id : 'loginUserNo',start : '2024-08-29',name : "바벨 스쿼트",time : "15분"},
  {id : 'loginUserNo',start : '2024-08-29',name : "수영",time : "25분"},
]

// createCalendar함수 생성
function createCalendar(data){
	calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: '',
      center: 'prev title next',
      right: ''
    },
    editable: false,
    droppable: false, // 캘린더 드롭다운 옵션

    drop: function(info) {
      // is the "remove after drop" checkbox checked?
      if (checkbox.checked) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },

    // 한국어 변환
    locale:'ko',
    
    // 일 정보 빼기
    dayCellContent : function(info){
      var number=document.createElement("a");
      number.classList.add("fc-daygrid-day-number");
      number.innerHTML =info.dayNumberText.replace("일","");
      return {
        html:number.outerHTML
      };
    },
    contentHeight:"auto", // 스크롤바 없애기

    // events : 데이터 입력 속성
    events: data,
  
    eventContent: function(d){  
    if( d.event.id !== ""){   // 최상단 "[ 캘린더 데이터 설명 ] - 캘린더 샘플 데이터" 참조
        return {
          
          html: `<div class="calendar-inside-content base__orange">
                    <p class="fs-12 mr-6">${d.event.extendedProps.name}</p> 
                    <p class="fs-10 fc__dwhite">${d.event.extendedProps.time}</p>
                  </div>
                `
        }
      }
    }
  });
}