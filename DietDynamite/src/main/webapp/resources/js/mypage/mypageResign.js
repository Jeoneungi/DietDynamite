// 모달
let infoModal = $('#commonModal');
let promptModal = $("#promptModal")
let promptModalBtn = $("#promptModal #acceptBtn")

promptModalBtn.on("click", function(){
	promptModal.modal("hide")
	location.href = "/user/logout"
})

function showModal(el){
	// 모달의 종류를 분별할 type 을 모달에게 입력, 모달을 구분
	let modalType = $(el).data("type");
	$("[name='modalType']").val(modalType);

	infoModal.find(".modal-title").html("정말로 탈퇴하시겠습니까?")
	infoModal.find(".modal-body").html(`
			<p>탈퇴시  7일 후 정보 완전 제거</p>
			<p>7일 이전에 재로그인시 탈퇴 취소 처리</p>
		`)

	infoModal.modal('show');
}

// 수락버튼
function modalConfirm() {
	const data = {
        userNo:loginUserNo
    }
    const request_url = `/rest/mypage/deleteUser`;

	$.ajax({
		type: "DELETE",
		url: request_url,
        contentType:"application/json",
		data : JSON.stringify(data),
		dataType: "json",
        success: function (res) {
            let isDeleted = res["result"] == 0 ? false : true

            if (isDeleted){
				promptModal.find(".modal-body").prepend(`
					<p> 삭제에 성공했습니다 </p>
				`)
                promptModal.modal('show');
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
}