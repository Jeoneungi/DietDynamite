let userData = [];

$(document).ready(function () {
	// 유저 데이터
	getUserInfos();

});

// userInfo 얻는 함수
function getUserInfos(){
	const request_url = `/rest/mypage/getAllUserInfo`;
	
	$.ajax({
		type: "GET",
		url: request_url,
		dataType: "json",
		success: function (res) {
            userData = res;

            if (userData.length > 0){
                paginationActive("user", userData, adminTemplate);
            }
			
        },
		error : function(request, status, error){
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
  
    paginationActive("user", userData, adminTemplate);
}

// 관리자용 페이지네이션 템플릿 함수 (User)
function adminTemplate(data, id) {
	let item = ""
    item += `
        <table class="manage-table">
            <thead>
                <tr> 
                    <td>No</td> 
                    <td>Id</td> 
                    <td>Email</td> 
                    <td>Role</td> 
                    <td>Number</td> 
                    <td>상세</td> 
                </tr>
            </thead>
            <tbody>
        `

    $.each(data, function(index, d){
        item += 
            `<tr>
                <input type="hidden" class="userBirthDay" value='${d.userBirthDay}'> 
                <input type="hidden" class="deleteDate" value='${d.deleteDate}'> 
                <td class="userNo">${d.userNo}</td> 
                <td class="userId" disabled>${d.userId}</td> 
                <td class="userEmail">${d.userEmail}</td> 
                <td class="userNickname">${d.userNickname}</td> 
                <td class="userAuthority">${d.userAuthority}</td> 
                <td data-num=${d.userNo}><img class="edit" src="/resources/images/icons/edit.png"></td> 
            </tr>`
        })

    item += `</tbody>
                </table>`


    return item;
}

// 페이지네이션 실행 함수
function paginationActive(id, datas, template){
	
	// 한 페이지당 개수 정하기
	let page_size = 20;

    $(`#${id}-pagination`).pagination({
        dataSource: datas,
        pageSize: page_size,
        callback: function(data, pagination) {
            let html = template(data,id);
            $(`#${id}-data`).html(html);	// 데이터 페이지네이션
            let currentPage = pagination.pageNumber;	// 현재 페이지 번호
            // 페이지네이션 변경
            let pagingEl = $(`.paginationjs-page[data-num='${currentPage}'] a`);
            pagingEl.css({
                fontSize : "14px",
                textDecoration : "underline"
            })
        }
    })
    
    // edit 수행
    $(".edit").on("click", function(){
        let data = {
            userNo : $(this).parent().parent().find(".userNo").text(),
            userId : $(this).parent().parent().find(".userId").text(),
            userEmail : $(this).parent().parent().find(".userEmail").text(),
            userAuthority : $(this).parent().parent().find(".userAuthority").text(),
            userNickname : $(this).parent().parent().find(".userNickname").text(),
            userBirthDay : $(this).parent().parent().find(".userBirthDay").val(),
            deleteDate : $(this).parent().parent().find(".deleteDate").val()
        }
        
        showModal(id, data, $(this))
        
    })
}
	
	

function showModal(id, data ,el){
	let modalEl = $('#adminModal');

    modalEl.find(".modal-title").html(`<p class="fs-14 fc__white">회원관리 / 회원번호 : <span class="userNo">${data.userNo}</span></p>`)
            
    modalEl.find(".modal-body").html(`
        <div class="modal-row">
            <div>
                <label for="user_id"> USER ID </label>
                <input type="text" id="user_id" name="user_id" value="${data.userId}" disabled>				
            </div>
            <div>
                <label for="user_email"> USER EMAIL </label>
                <input type="text" id="user_email" name="user_email" value="${data.userEmail}" disabled>								
            </div>
        </div>
        <div  class="modal-row">
            <div>
                <label for="user_auth"> USER ROLE </label>
                <input type="text" id="user_auth" name="user_auth" value="${data.userAuthority}">				
            </div>
            <div>
                <label for="user_nickname"> USER ADDRESS </label>
                <input type="text" id="user_nickname" name="user_nickname" value="${data.userNickname}" disabled>								
            </div>
        </div>
        <div  class="modal-row">
            <div>
                <label for="user_birthday"> USER BIRTHDAY </label>
                <input type="text" id="user_birthday" name="user_birthday" value="${data.userBirthDay}" disabled>				
            </div>
                <div>
                <label for="user_deletedDt"> DELETED DATE </label>
                <input type="text" id="user_deletedDt" name="user_deletedDt" value="${data.deleteDate}" disabled>								
            </div>
        </div>
        
        <div class="modal-btns">
            <button class="btn-medium__lorange modifyBtn"> 수정 </button>
            <button class="btn-medium__gray cancelBtn" data-bs-dismiss="modal"> 취소 </button>
            <button class="btn-medium__red deleteBtn"> 삭제</button>
        </div>
        `
    );
	

	// modifyBtn 에 수정 이벤트 추가 && 부모의 Element 전달 (데이터 변경용)
	modalEl.find(".modifyBtn").on("click", function() {
		updateUserInfo(el);
	});

	// deleteBtn 에 삭제 이벤트 추가
	modalEl.find(".deleteBtn").on("click", function() {
		deleteUser(el);
	});
	
	modalEl.modal('show');
}

// 유저 수정
function updateUserInfo(el){
	let modalEl = $('#adminModal');
	let adminModal = bootstrap.Modal.getInstance(modalEl);

	const userNo = $(".modal-title .userNo").text();
	let userAuthority = $(".modal-body input[name='user_auth']").val().toUpperCase();

	if (authValidate(userAuthority)){
        const data = {
            userNo,
			userAuthority
		}
        
        const request_url = `/rest/mypage/updateUserAuth`;
		$.ajax({
			type: "POST",
			url: request_url,
            contentType:"application/json",
			data : JSON.stringify(data),
			dataType: "json",
			success: function (res) {
  
				let isSuccess = res["result"] == 0 ? false : true

				if (isSuccess){
					el.parent().parent().find(".userAuthority").text(userAuthority)
					toastPop("info", res.message)
				} else{
					toastPop("warn", res.message)
				}
			},
			error : function(request, status, error){
				toastPop("warn", "권한 변경에 실패하였습니다.")
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
		adminModal.hide();
	}
}

// 유저 삭제일 업데이트
function deleteUser(el){
	let modalEl = $('#adminModal');
	let adminModal = bootstrap.Modal.getInstance(modalEl);

	const userNo = $(".modal-title .userNo").text();
    const data = {
        userNo
    }
    const request_url = `/rest/mypage/deleteUser`;

	$.ajax({
		type: "DELETE",
		url: request_url,
        contentType:"application/json",
		data : JSON.stringify(data),
		dataType: "json",
        success: function (res) {
            console.log(res)
            let isDeleted = res["result"] == 0 ? false : true

            if (isDeleted){
                el.parent().parent().find(".deleteDate").val(res["deleteTime"])
                toastPop("info", res.message)
            } else{
                toastPop("warn", res.message)
            }
        },
        error : function(request, status, error){
            toastPop("warn", "유저 탈퇴에 실패하였습니다.")
            console.log(request);
            console.log(status);
            console.log(error);
        }
	});

	adminModal.hide();

}

// 유저 검색 기능 생성
function searchUser(){
	let searchType = $("[name='search_category']").val();	// id, eamil, address
	let searchParam = $("[name='search_input']").val();
	
	const request_url = `/rest/mypage/searchUserInfo`;
	
	$.ajax({
		type: "GET",
		url: request_url,
		data: {
			searchType,
			searchParam
		},
		dataType: "json",
		success: function (res) {
            userData = res;
            
            if (userData.length > 0){
                paginationActive("user", userData, adminTemplate);
            }
        },
		error : function(request, status, error){
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}