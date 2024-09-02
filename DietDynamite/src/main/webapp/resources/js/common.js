// 토스트 메소드
function toastPop(type, message){
	const toastBtn = $('.toastPop')
	const toastElement = $('#liveToast')
	
	// 메시지로 변경
	$(".toast-body").find(".toast-message").text(message);
	$(".toast").removeClass("base-warn__red");
	$(".toast").removeClass("base-info__green");
	
	// 토스트 스타일 변경
	if (type == "warn"){
		$(".toast").addClass("base-warn__red");
		
	} else if(type == "info"){
		$(".toast").addClass("base-info__green");
	}
		
	// 토스트 실행
	if (toastBtn) {
		const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement)
		toastBootstrap.show()

	}
}

// 헤더 이미지
const headerNav = document.querySelector("header .header-bot")
const headerNavSub = document.querySelector("header .header-nav .header-nav-sub")

headerNav.addEventListener("mouseover", ()=>{
	headerNavSub.style.display = "flex"
})
headerNav.addEventListener("mouseleave", ()=>{
	headerNavSub.style.display = "none"
})