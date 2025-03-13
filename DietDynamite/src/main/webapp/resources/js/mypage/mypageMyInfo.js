$(document).ready(function () {
	// 이미지 변경시 썸네일 생성 이벤트 리스너 연결 함수
	showThumbnail();

});

// 기본 유저 데이터
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
    let promptModal = $("#promptModal");

	// 모달의 종류를 분별할 type 을 모달에게 입력, 모달을 구분
	let modalType = $(el).data("type");
	$("[name='modalType']").val(modalType);

	// 모달 타입에 따라 모달 내용 생성
	if(modalType == "loginHistory"){

        let request_url = `/rest/mypage/getUserHistory?userNo=${loginUserNo}`
        $.ajax({
            type: "GET",
            url: request_url,
            dataType: "json",
            success: function (res) {
                if (res.length >0 ){
                    let html = `
                            <table class="history-table">
                            <thead>
                                <tr>
                                    <td>내역번호</td>
                                    <td>로그인 시간</td>
                                    <td>자동 로그인</td>
                                    <td>접속 IP</td>
                                </tr>
                            </thead>
                            <tbody>`
                    $.each(res, function(index, d){
                        html += `
                            <tr>
                                <td> ${d.historyNo}</td>
                                <td> ${d.loginDt}</td>
                                <td> ${d.loginAuto == 'Y' ? '자동 로그인' : '수동 로그인'} </td>
                                <td> ${d.loginIp}</td>
                            </tr>`
                    })
    
                    html += `
                            </tbody>
                        </table>`
                    
                    promptModal.find(".modal-body").html(html);
                    promptModal.modal("show");
                }
            }
        });

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
        commonModal.modal("show")
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
	
    // 기본 이미지로 변경했는지 체크
	const resetThumbnailRegex = /\/images\/profile\/user_img2\.jpg/;

	
	if (inputedProfileImg.val() == "" &&
		!resetThumbnailRegex.test(profileThumbnail.prop("src")) ){
		// 이미지 추가해달라는 팝업
		toastPop("warn", "이미지를 추가해주세요!");
		return false;
	}
    // 기본 이미지로 변경을 눌렀을경우 요청
	else if (resetThumbnailRegex.test(profileThumbnail.prop("src"))){
		const request_url = `/mypage/restUserProfileImg`
		
		$.ajax({
			type: "POST",
			url: request_url,
			success: function () {
				location.href = `/mypage/myInfo`
			},
			error : function(request, status, error){
				toastPop("warn", "변경에 실패하였습니다")
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
		return false;
	} 
    // 기본 이미지가 아니면서, 파일이 있을 경우 Form 실행
    else {
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
	profileThumbnail.prop("src", `/resources/images/profile/user_img2.jpg`)
}