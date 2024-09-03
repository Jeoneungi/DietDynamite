let userData = [];

$(document).ready(function () {
	// 유저 데이터
	getUserInfos();

});

// userInfo 얻는 함수
function getUserInfos(){
	// const request_url = `/api/admin/profile/getAllUsersData`;
	
	// $.ajax({
	// 	type: "GET",
	// 	url: request_url,
	// 	dataType: "json",
	// 	success: function (res) {
	// 		let isGetData = res.hasOwnProperty("data")
	// 		if (isGetData){
	// 			userData = res.data;
	// 			paginationActive("user", userData, adminTemplate);
	// 		}
    //     },
	// 	error : function(request, status, error){
	// 		console.log(request);
	// 		console.log(status);
	// 		console.log(error);
	// 	}
	// });
    userData = [
        {userNo : 1, userId : "유저1", userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",   userAuthority : "A", deletedDate : "2024-09-03"},
        {userNo : 2, userId : "유저2" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : "2024-09-03"},
        {userNo : 3, userId : "유저3" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : ""},
        {userNo : 4, userId : "유저4" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : ""},
        {userNo : 5, userId : "유저5" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : ""},
        {userNo : 6, userId : "유저6" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : "2024-09-03"},
        {userNo : 7, userId : "유저7" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : ""},
        {userNo : 9, userId : "유저8" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",  userAuthority : "A", deletedDate : ""},
        {userNo : 10, userId : "유저9" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01", userAuthority : "A", deletedDate : ""},
        {userNo : 11, userId : "유저10" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 12, userId : "유저11" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : "2024-09-03"},
        {userNo : 13, userId : "유저12" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 14, userId : "유저13" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 15, userId : "유저14" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 16, userId : "유저15" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 17, userId : "유저16" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 19, userId : "유저17" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
        {userNo : 19, userId : "유저18" , userEmail : "test@test.com", userNickname : "김군1",userBirthDay : "1990-01-01",userAuthority : "A", deletedDate : ""},
    ]
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
                <input type="hidden" class="deletedDate" value='${d.deletedDate}'> 
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
            deletedDate : $(this).parent().parent().find(".deletedDate").val()
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
                <input type="text" id="user_deletedDt" name="user_deletedDt" value="${data.deletedDate}" disabled>								
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
        
        // const request_url = `${contextPath}/api/admin/profile/updateUserInfo`
		// $.ajax({
		// 	type: "POST",
		// 	url: request_url,
		// 	data : data,
		// 	dataType: "json",
		// 	async : false,
		// 	success: function (res) {
		// 		let isUpdated = res.hasOwnProperty("data")
		// 		if (isUpdated){
		// 			el.parent().parent().find(".userAuthority").text(userAuthority)
		// 			el.parent().parent().find(".userState").text(userState)
		// 			toastPop("info", res.message)
		// 		} else{
		// 			toastPop("warn", res.message)
		// 		}
		// 	},
		// 	error : function(request, status, error){
		// 		toastPop("warn", "권한 변경에 실패하였습니다.")
		// 		console.log(request);
		// 		console.log(status);
		// 		console.log(error);
		// 	}
		// });

        console.log(data)

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

    // const request_url = `${contextPath}/api/admin/profile/deleteUser`

	// $.ajax({
	// 	type: "POST",
	// 	url: request_url,
	// 	data : data,
	// 	dataType: "json",
	// 	async : false,
	// 	success: function (res) {
	// 		let isDeleted = res.hasOwnProperty("data")
	// 		if (isDeleted){
	// 			el.parent().parent().find(".deletedDate").val(res.data)
	// 			toastPop("info", res.message)
	// 		} else{
	// 			toastPop("warn", res.message)
	// 		}
	// 	},
	// 	error : function(request, status, error){
	// 		toastPop("warn", "유저 삭제에에 실패하였습니다.")
	// 		console.log(request);
	// 		console.log(status);
	// 		console.log(error);
	// 	}
	// });

    console.log(data)

	adminModal.hide();

}

// 유저 검색 기능 생성
function searchUser(){
	let category = $("[name='search_category']").val();	// id, eamil, address
	let searchInput = $("[name='search_input']").val();
	
	// const request_url = `${contextPath}/api/admin/profile/searchUsersData`;
	
	// $.ajax({
	// 	type: "GET",
	// 	url: request_url,
	// 	data: {
	// 		category,
	// 		searchInput
	// 	},
	// 	dataType: "json",
	// 	success: function (res) {
	// 		let isGetData = res.hasOwnProperty("data")
	// 		if (isGetData){
	// 			userData = res.data;
	// 			paginationActive("user", userData, adminTemplate);
	// 		}
    //     },
	// 	error : function(request, status, error){
	// 		console.log(request);
	// 		console.log(status);
	// 		console.log(error);
	// 	}
	// });

    console.log(category, searchInput)
}