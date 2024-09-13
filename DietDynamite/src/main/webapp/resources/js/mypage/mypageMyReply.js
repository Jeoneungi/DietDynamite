let replyData = [];

$(document).ready(function () {
	// Get Community
	getMyReply();
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
			}
			paginationActive("reply", replyData, paginationTemplate);
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
                  <input type="checkbox" class="replyCheck checkbox__red" id="post-check" name="post-check" value=${d.replyNo}>
                  <div>
                      <p class="fc__orange"> <span>${d.replyTypeName}</span> - [${d.replyTargetTitle}]</p>
                      <p type="text" class="item-text">${d.replyContent}</p> 
                  </div>
              </div>
              <div class="element-edit" data-index="${index}" data-replyno="${d.replyNo}">
                    <img class="edit" src="/resources/images/icons/edit.png"/>
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
        
        // 이벤트 리스너 생성
        $(".element-edit").on("click", function(){
            let data = replyData[$(this).data("index")]
            showUpdateModal($(this), data)
        })

	}
}

// 게시글 삭제 함수
function deleteMyReply(){
    let checkboxes = $(".replyCheck:checked")
	
	const deleteReplyTarget = [];
	
	for (let checkbox of checkboxes){
		deleteReplyTarget.push(checkbox.value)
	}
    
	
    console.log(deleteReplyTarget)
	// let request_url = `${contextPath}/api/profile/deleteMyReplyMany`
	// $.ajax({
	// 	type: "POST",
	// 	url: request_url,
	// 	dataType: "json",
	// 	data:{
	// 		replyNos : deleteRepyTarget.join(',')
	// 	},
	// 	async: false,
	// 	success: function (res) {
	// 		let isGetData = res.hasOwnProperty("data");
			
	// 		if(isGetData){
	// 			getMycomments()
	// 			toastPop("info", "성공적으로 삭제하였습니다.");
	// 		}
	// 		else{
	// 			toastPop("warn", "댓글 가져오는데 실패하였습니다.");
	// 		}

	// 	}
	// });
}

// 댓글 수정(ReplyUpdate) 모달 생성
function showUpdateModal(el, data){    
    console.log(data)

	// let replyUpdateModal = $('#updateModal');
	
	// let item = "댓글";
	// replyUpdateModal.find(".modal-title").html(`<p class="fs-14 fc__white">${item} 수정</p>`)
	// replyUpdateModal.find(".modal-body").html(`
	// 					<div class="modal-row">
	// 						<textarea name="update-reply-content" rows="5" cols="30" placeholder="수정할 댓글을 입력해주세요" ></textarea>
	// 					</div>`)

	// replyUpdateModal.modal('show');
	
	// replyUpdateModal.find(".acceptBtn").one("click", function(){
	// 	updateReply(el, replyUpdateModal)
	// })
}

// 댓글 수정 함수
function updateReply(el, modal){
	let replyUpdateModalBootStrap = bootstrap.Modal.getInstance(modal);
	let replyContent = modal.find("textarea[name='update-reply-content']").val();
	let replyNo = parseInt($(el).data("replyno"));
	
	// if (loginUser == ""){
	// 	toastPop("warn", "로그인 후 이용해주세요");
	// 	return;
	// }
	
	// 요청
	const request_url = ``;
	
	if (replyContent.trim() != ""){
		console.log("댓글 no", replyNo)
		console.log("댓글 내용", replyContent)

		// bootstrap 모달 숨기기
		replyUpdateModalBootStrap.hide()
		
		
		// $.ajax({
		// 	type: "POST",
		// 	url: request_url,
		// 	data : {
		// 		replyNo,
		// 		replyContent
		// 	},
		// 	dataType: "json",
		// 	success: function (res) {
		// 		let isInsertReply = res.hasOwnProperty("data");
				
		// 		if(isInsertReply){
		// 			// 댓글 데이터 찾아서 변경, 페이지네이션 재실행
		// 			getMycomments();
		// 			// 모달 종료
		// 			updateReplyModal.hide();
		// 		}
				
		// 		else{
		// 			toastPop("warn", res.message)
		// 		}
		// 	}
		// });
	} else{
		toastPop("warn", "댓글을 입력해주세요")
	}
}

// 취소 누를경우, AccepBtn 에 있는 이벤트리스너 제거
function deleteEventListener(el) {
	let acceptBtn = $(el).parent().find(".acceptBtn")
	acceptBtn.off("click");
}