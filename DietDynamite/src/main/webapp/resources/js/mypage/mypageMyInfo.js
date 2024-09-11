$(document).ready(function () {
	// 이미지 변경시 썸네일 생성 이벤트 리스너 연결 함수
	showThumbnail();

});

let userData = {
	userNo : loginUserNo,
	email : document.querySelector("input[name='userEmail']").value,
	nickname : document.querySelector("input[name='userNickname']").value,
	bd : document.querySelector("input[name='userBirthDay']").value,
	height : document.querySelector("input[name='userHeight']").value,
	weight : document.querySelector("input[name='userWeight']").value,
}

function showModal(el) {
	// 모달 지정
	let commonModal = $('#commonModal');

	// 모달의 종류를 분별할 type 을 모달에게 입력, 모달을 구분
	let modalType = $(el).data("type");
	$("[name='modalType']").val(modalType);

	// 모달 타입에 따라 모달 내용 생성
	if(modalType == "loginHistory"){
		console.log("history")

	}else{
		switch(modalType){
			case "email":{
				commonModal.find(".modal-title").html("이메일 변경")
				commonModal.find(".modal-body").html(`
					<p> 변경할 이메일을 입력해주세요 </p>
					<input type="text" id="update_${modalType}" name="update_${modalType}" value="${userData["email"]}">`
				);
			}break;
			case "pw":{
				commonModal.find(".modal-title").html("비밀번호 변경")
				commonModal.find(".modal-body").html(`
					<p> 변경할 비밀번호를 입력해주세요 </p>
					<input type="text" id="update_${modalType}" name="update_${modalType}">`
				);
			}break;
			case "nickname":{
				commonModal.find(".modal-title").html("닉네임 변경")
				commonModal.find(".modal-body").html(`
					<p> 변경할 닉네임을 입력해주세요 </p>
					<input type="text" id="update_${modalType}" name="update_${modalType}" value="${userData["nickname"]}">`
				);
			}break;
			case "bd":{
				commonModal.find(".modal-title").html("생일 변경")
				commonModal.find(".modal-body").html(`
					<p> 변경할 생일을 입력해주세요 </p>
					<input type="text" id="update_${modalType}" name="update_${modalType}" value="${userData["bd"]}">`
				);
			}break;
			case "height":{
				commonModal.find(".modal-title").html("키 변경")
				commonModal.find(".modal-body").html(`
					<p> 변경할 키를 입력해주세요 </p>
					<input type="text" id="update_${modalType}" name="update_${modalType}" value="${userData["height"]}">`
				);
			}break;
			case "weight":{
				commonModal.find(".modal-title").html("몸무게 변경")
				commonModal.find(".modal-body").html(`
					<p> 변경할 몸무게를 입력해주세요 </p>
					<input type="text" id="update_${modalType}" name="update_${modalType}" value="${userData["weight"]}">`
				);
			}break;
		}
	}
	commonModal.modal("show")



	if (modalType == "loginHistory"){
		console.log("로그인히스토리")
		// let request_url = `${contextPath}/api/profile/getUserHistories`
		// $.ajax({
		// 	type: "GET",
		// 	url: request_url,
		// 	dataType: "json",
		// 	success: function (res) {
		// 		let isGetData = res.hasOwnProperty("data");
		// 		let historyModal = $('#historyModal');

		// 		if (isGetData){
		// 			let html = `
		// 					<table class="history-table">
		// 					<thead>
		// 						<tr> 
		// 							<td>일시</td>
		// 							<td>서비스</td>
		// 							<td>로그인 형태</td>
		// 						</tr>
		// 					</thead>
		// 					<tbody>`

		// 			$.each(res.data, function(index, d){
		// 				html += `
		// 					<tr>
		// 						<td> ${d.loginDate}</td>
		// 						<td> 스포츠 커뮤니티 </td>
		// 						<td> ${d.loginAuto == 'Y' ? '자동 로그인' : '수동 로그인'} </td>
		// 					</tr>`
		// 			})

		// 			html += `
		// 					</tbody>
		// 				</table>`
					
		// 			historyModal.find(".modal-body").html(html);
		// 			historyModal.modal("show");
		// 		}
		// 	}
		// });
	}
}


// [ 모달의 확인 클릭 ] 
function modalConfirm(){
	// 부트스트랩의 모달 선택
	let modalEl = $('#commonModal');
	var commonModal = bootstrap.Modal.getInstance(modalEl);
	
	let modalType = $("[name='modalType']").val()
	let value = $(`input[name='update_${modalType}']`).val().trim();
	let requestData = {};

	switch(modalType){
		case "email" : {
			if (emailValidate(value)){
				requestData = {
					"type" : 'USER_EMAIL',
					"data" : value
				}
			}
		};break;
		case "pw":{
			if (pwValidate(value)){
				requestData = {
					"type" : "USER_PW",
					"data" : value
				}
			}
		}break;
		case "nickname":{
			if (nicknameValidate(value)){
				requestData = {
					"type" : "USER_NICKNAME",
					"data" : value
				}
			}
		}break;
		case "bd":{
			if (birthdayValidate(value)){
				requestData = {
					"type" : "USER_BD",
					"data" : value
				}
			}
		}break;
		case "height":{
			if (userHeightValidate(value)){
				requestData = {
					"type" : 'USER_PROFILE_HEIGHT',
					"data" : value
				}
			}
		}break;
		case "weight":{
			if (userWeightValidate(value)){
				requestData = {
					"type" : 'USER_PROFILE_WEIGHT',
					"data" : value
				}
			}
		}break;
	}

	if (requestData.hasOwnProperty("data")){
		requestData["userNo"] = loginUserNo
		updateUserInfo(requestData, modalType)
	}
	commonModal.hide();
}


//  유저 정보 업데이트 함수
function updateUserInfo(requestData, modalType){

	let request_url = `/rest/mypage/updateUserInfo`
	$.ajax({
		type: "POST",
		url: request_url,
		contentType:"application/json",
		data: JSON.stringify(requestData),	// {type, data}
		dataType: "json",
		success: function (res) {
			let isUpdated = res["result"] == 0 ? false : true
			
			if (isUpdated){
				// 유저 정보 dict 변경
				userData[`${modalType}`] = requestData["data"]

				// 유저 정보 표기 변경
				if (modalType != "pw"){
					$(`p[data-type="${modalType}"]`).html(`${requestData["data"]} <span> > </span>`);
				}

				// 토스트 생성
				toastPop("info", "정상적으로 변경되었습니다.")
			} else{
				toastPop("warn", "변경에 실패하였습니다")
			}
			
		},
		error : function(request, status, error){
			toastPop("warn", "변경에 실패하였습니다")
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}



// 취소 누를경우, AccepBtn 에 있는 이벤트리스너 제거
function deleteEventListener(el) {
	let acceptBtn = $(el).parent().find(".acceptBtn")
	acceptBtn.off("click");
}


// 이미지 변경 모달
function changeImgModal(){
	const changeImgModalEl = $("#changeImgModal");
	changeImgModalEl.modal("show");
}

// 이미지 변경 함수
function changeImgFn(){
	const inputedProfileImg = $("input[name='inputProfieImg']")
	const profileThumbnail = $(".profileThumbnail");
	
	const resetThumbnailRegex = /\/public\/images\/profile\/user_img1\.jpg/;

	
	if (inputedProfileImg.val() == "" &&
		!resetThumbnailRegex.test(profileThumbnail.prop("src")) ){
		// 이미지 추가해달라는 팝업
		toastPop("warn", "이미지를 추가해주세요!");
		return false;
	}
	else if (resetThumbnailRegex.test(profileThumbnail.prop("src"))){
		const request_url = `${contextPath}/api/profile/restUserProfileImg`
		
		$.ajax({
			type: "POST",
			url: request_url,
			async: false,
			success: function () {
				location.href = `${contextPath}/profile/myInfo`
			},
			error : function(request, status, error){
				toastPop("warn", "변경에 실패하였습니다")
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
		return false;
	} else {
		// 이미지가 존재하므로 form 실행
		return true;
	}
}

// 이미지 모달의 썸네일 이벤트 리스너 연결 함수
function showThumbnail(){
	const inputedProfileImg = $("input[name='inputProfieImg']")

	inputedProfileImg.on("change", function(){
		if (this.files[0] != undefined){
			const reader = new FileReader();

            reader.readAsDataURL(this.files[0])
			reader.onload = function(e){
				const profileThumbnail = $(".profileThumbnail");
				profileThumbnail.prop("src", e.target.result);
			}

		}
	})
}

// 기본 이미지로 변경 함수
function changeImgDefault(){
	const profileThumbnail = $(".profileThumbnail");
	profileThumbnail.prop("src", `${contextPath}/public/images/profile/user_img1.jpg`)
}