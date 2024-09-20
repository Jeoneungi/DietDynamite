let boardData = [];

$(document).ready(function () {
	// Get Community
	getMyBoard();
});

// 체크박스 전체선택 함수
function allChecks(){
	let allCheck = $("#check-all")	// 체크박스 전체선택 요소
    allCheck.prop("checked", false);	// 페이지 옮기면 취소
    
	let chekcboxes = $("input[type='checkbox']")
	
	allCheck.on("click", ()=>{
	    if(allCheck.prop("checked") == true){
	        $(chekcboxes).prop("checked", true);
	    }
	})
}

// 내 게시글 가져오는 함수
function getMyBoard(){
	let request_url = `/rest/mypage/getAllBoardsByUser`
	$.ajax({
		type: "GET",
		url: request_url,
		dataType: "json",
		data : {
			userNo : loginUserNo
		},
		success: function (res) {
			if (res.length > 0){
				boardData = res
				paginationActive("board", boardData, paginationTemplate);
			}else{
				const boardContainer = document.getElementById("board-data")
				boardContainer.innerHTML = `<p> 데이터가 없습니다 </p>`
			}
		}
	});
}

// 일반 유저 페이지네이션 템플릿 함수
function paginationTemplate(data, id) {
    let item = "";

    $.each(data, function(index, d){
        item += 
            `<div class="item small-square box-shadow">
                <div class="element-text">
                    <div>
                        <div class="d-flex">
                            <p class="fc__orange"> <span>${d.boardTypeName}</span> </p>
                        </div>
                        <p class="item-text"> ${d.boardTitle} </p>
                    </div>
                </div>
                <div class="element-edit">
					${d.boardType == 1 ? 
						`<img class="edit" src="/resources/images/icons/edit.png" onclick="location.href='/diary/1/${d.boardNo}'">`
						:
						`<img class="edit" src="/resources/images/icons/edit.png" onclick="location.href='/challenge/${d.boardNo}'">`
					}
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
		        
		        // 체크박스 전체선택 함수
		        allChecks();
		
				var currentPage = pagination.pageNumber;	// 현재 페이지 번호
				
				// 페이지네이션 스타일 변경
				var pagingEl = $(`.paginationjs-page[data-num='${currentPage}'] a`);
				pagingEl.css({
					fontSize : "14px",
					textDecoration : "underline"
				})
			}
		})
	}
}

// 게시글 삭제 함수
function deleteMyBoard(){
	let checkboxes = $(".boardCheck:checked")
	
	const deleteTarget = [];
	
	for (let checkbox of checkboxes){
		deleteTarget.push(checkbox.value)
	}

    console.log(deleteTarget)
	
	// let request_url = `${contextPath}/api/profile/deleteMyCommMany`
	// $.ajax({
	// 	type: "POST",
	// 	url: request_url,
	// 	dataType: "json",
	// 	data:{
	// 		commNos : deleteTarget.join(',')
	// 	},
	// 	async: false,
	// 	success: function (res) {
	// 		let isGetData = res.hasOwnProperty("data");
			
	// 		if(isGetData){
	// 			getMyCommunity()
	// 			toastPop("info", "성공적으로 삭제하였습니다.");
	// 		}
	// 		else{
	// 			toastPop("warn", "게시글을 가져오는데 실패하였습니다.");
	// 		}

	// 	}
	// });
}