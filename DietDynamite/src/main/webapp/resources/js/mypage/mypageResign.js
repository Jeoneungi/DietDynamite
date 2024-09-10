function showModal(el){
	// 모달 지정
	let infoModal = $('#commonModal');

	// 모달의 종류를 분별할 type 을 모달에게 입력, 모달을 구분
	let modalType = $(el).data("type");
	$("[name='modalType']").val(modalType);
	
	// [개인 정보 - 회원 탈퇴] 회원 탈퇴 모달 --------------------
	if (modalType == "resign"){
		
		infoModal.find(".modal-title").html("정말로 탈퇴하시겠습니까?")
		infoModal.find(".modal-body").html(`
				<p>탈퇴시  7일 후 정보 완전 제거</p>
				<p>7일 이전에 재로그인시 탈퇴 취소 처리</p>
			`)
	
		infoModal.modal('show');
		return;
	}
}

// 수락버튼
function modalConfirm() {

}

// 취소버튼
function modalCancel() {

}