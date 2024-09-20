let replyData = [];

$(document).ready(function () {
	// Get Community
	getMyReply();
});

// 내 게시글 가져오는 함수
function getMyReply(){
	let request_url = `/rest/mypage/getUserReplies`
	$.ajax({
		type: "GET",
		url: request_url,
		dataType: "json",
		data : {
			userNo : loginUserNo
		},
		success: function (res) {
			if (res.length > 0){
				replyData = res
				paginationActive("reply", replyData, paginationTemplate);
			}else{
				const replyContainer = document.getElementById("reply-data")
				replyContainer.innerHTML = `<p> 데이터가 없습니다 </p>`
			}
		}
	});
}

// 일반 유저 페이지네이션 템플릿 함수
function paginationTemplate(data, id) {
    let item = "";

    // 타입 [ 1: 일반게시글 / 2: 다이어트 레시피 / 3: 지도 상세 / 4: 음식정보]
    $.each(data, function(index, d){
        item += 
            `<div class="item checkbox__blue small-square box-shadow">
              <div class="element-text">
                  <div>
                      <p class="fc__orange"> <span>${d.replyTypeName}</span> - [${d.replyTargetTitle}]</p>
                      <p type="text" class="item-text">${d.replyContent}</p> 
                  </div>
              </div>
              <div class="element-edit">
                    <img class="edit" src="/resources/images/icons/edit.png" onclick="showUpdateReply(${d.replyNo},this)"/>
                    <img class="delete" src="/resources/images/icons/bin.png" onclick="deleteReply(${d.replyNo})"/>
              </div>
          </div>`
    })

    return item;
}

// 페이지네이션 실행 함수
function paginationActive(id, datas, template){
	
	// 한 페이지당 개수 정하기
	let page_size = 10;
	
	// 각 조건에 맞게 페이지네이션 실행
	if ( $(`#${id}-pagination`).length > 0 ){

        $(`#${id}-pagination`).pagination({
		    dataSource: datas,
		 	
		    pageSize: page_size,
		    
		    callback: function(data, pagination) {
		        var html = template(data,id);
		        
		        $(`#${id}-data`).html(html);	// 데이터 페이지네이션

				var currentPage = pagination.pageNumber;	// 현재 페이지 번호
				
				// 페이지네이션 스타일 변경
				var pagingEl = $(`.paginationjs-page[data-num='${currentPage}'] a`);
				pagingEl.css({
					fontSize : "14px",
					textDecoration : "underline"
				})
			}
		})
        
        // 이벤트 리스너 생성
        $(".element-edit").on("click", function(){
            let data = replyData[$(this).data("index")]
            showUpdateModal($(this), data)
        })

	}
}