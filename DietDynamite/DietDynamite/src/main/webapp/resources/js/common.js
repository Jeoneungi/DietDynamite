// 공통 토스트 ================================================================================
function toastPop(type, message){
	const toastBtn = $('.toastPop')
	const toastElement = $('#liveToast')
	
	// 메시지로 변경
	$(".toast-body").find(".toast-message").text(message);
	$(".toast").removeClass("base__red");
	$(".toast").removeClass("base__green");
	
	// 토스트 스타일 변경
	if (type == "warn"){
		$(".toast").addClass("base__red");
		
	} else if(type == "info"){
		$(".toast").addClass("base__green");
	}
		
	// 토스트 실행
	if (toastBtn) {
		const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement)
		toastBootstrap.show()

	}
}

// 헤더 ================================================================================
// 헤더 이미지 
const headerNav = document.querySelector("header .header-bot")
const headerNavSub = document.querySelector("header .header-nav .header-nav-sub")

headerNav.addEventListener("mouseover", ()=>{
	headerNavSub.style.display = "flex"
})
headerNav.addEventListener("mouseleave", ()=>{
	headerNavSub.style.display = "none"
})

// VALIDATIONS ================================================================================
function idValidate(id){
	/* ID 체크 
		- 5글자 이상 13글자 이하
		- 반드시 소문자 포함
		- 추가적으로 대문자, 숫자 가능
		- 대문자, 숫자만으로 이루어질 수 없음
	*/
	let idRegex = /^(?=.*[a-z])(?!^\d+$)[a-zA-Z\d]{5,13}$/

	// 형식에 맞지 않을경우
	if (!idRegex.test(id)){

		// 컬러변경 및 진동효과
		$("input[id*='_id']").addClass("base__red fc__white vibration")
		$("input[id*='_id']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_id']").removeClass("vibration")
		}, 300)
		
		toastPop("warn", "올바른 아이디 형식이 아닙니다.")
		return false;
	}

	return true;
}

function pwValidate(password){
	/* password 체크 
		- 최소 10글자, 최대 20글자
		- 최소 하나의 소문자, 대문자, 숫자를 반드시 포함
		- 특수문자 사용 가능
	*/
	let pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,20}$/

	// 형식에 맞지 않을경우
	if (!pwRegex.test(password)){

		// 컬러변경 및 진동효과
		$("input[id*='_pw']").addClass("base__red fc__white vibration")
		$("input[id*='_pw']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_pw']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 비밀번호 형식이 아닙니다.")
		return false;
	}

	return true;
}

function userPwCheckValidate(pw,pwc){
	/* 비밀번호 확인 체크
	   - 입력한 비밀번호와 같지 않을 시
	*/

	// 형식에 맞지 않을경우
	if (!(pw == pwc)){
		// 컬러변경 및 진동효과
		$("input[id*='_pWc']").addClass("base__red fc__white vibration")
		$("input[id*='_pWc']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_pWc']").removeClass("vibration")
		}, 300)

		toastPop("warn", "비밀번호가 일치하지 않습니다.")
		return false;
	}

	return true;
}



function emailValidate(email){
	/* email 체크 
		- 이메일 형식
	*/
	let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

	// 형식에 맞지 않을경우
	if (!emailRegex.test(email)){

		// 컬러변경 및 진동효과
		$("input[id*='_email']").addClass("base__red fc__white vibration")
		$("input[id*='_email']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_email']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 이메일 형식이 아닙니다.")
		return false;
	}

	return true;
}

function nicknameValidate(nickname){
	/* nickname 체크 
		- 최소 2글자, 최대 8글자
		- 한글,영어,숫자 사용가능
	*/
	let nicknameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/

	// 형식에 맞지 않을경우
	if (!nicknameRegex.test(nickname)){

		// 컬러변경 및 진동효과
		$("input[id*='_nickname']").addClass("base__red fc__white vibration")
		$("input[id*='_nickname']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_nickname']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 닉네임 형식이 아닙니다.")
		return false;
	}

	return true;
}


function userHeightValidate(height){
	/* userProfileHeight 체크 
		- 2자리일 경우 첫 숫자가 1~9 (ex 70)
		- 3자리일 경우 첫 숫자가 1~2 (ex 170)
		- 즉 300을 넘을 수 없음
		- 숫자만 가능 
	*/
	let heightRegex = /^([1-9]\d|[1-2]\d{2})$/

	// 형식에 맞지 않을경우
	if (!heightRegex.test(height)){

		// 컬러변경 및 진동효과
		$("input[id*='_height']").addClass("base__red fc__white vibration")
		$("input[id*='_height']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_height']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 키 형식이 아닙니다.")
		return false;
	}

	return true;
}

function userWeightValidate(weight){
	/* userProfileWeight 체크 
		- 2자리일 경우 첫 숫자가 1~9 (ex 70)
		- 3자리일 경우 첫 숫자가 1~5 (ex 170)
		- 즉 500을 넘을 수 없음
		- 숫자만 가능 
	*/
	let weightRegex = /^([1-9]\d|[1-5]\d{2})$/

	// 형식에 맞지 않을경우
	if (!weightRegex.test(weight)){

		// 컬러변경 및 진동효과
		$("input[id*='_weight']").addClass("base__red fc__white vibration")
		$("input[id*='_weight']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_weight']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 몸무게 형식이 아닙니다.")
		return false;
	}

	return true;
}

function birthdayValidate(bd){
	/* 생년월일 체크 
		- "-"가 없는 번호 형식
	*/
	let birthDayRegex = /^(19[3-9][0-9]|20[0-1][0-9]|202[0-4])((01(0[1-9]|[12][0-9]|3[01]))|(02(0[1-9]|1[0-9]|2[0-8]))|(02(29))|((0[469]|11)(0[1-9]|[12][0-9]|30))|((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01])))$/

	// 형식에 맞지 않을경우
	if (!birthDayRegex.test(bd)){

		// 컬러변경 및 진동효과
		$("input[id*='_bd']").addClass("base__red fc__white vibration")
		$("input[id*='_bd']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_bd']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 생년월일 형식이 아닙니다.")
		return false;
	}

	return true;
}

function authValidate(auth){
	/* 생년월일 체크 
		- "-"가 없는 번호 형식
	*/
	let authRegex = /^[A,U]$/

	// 형식에 맞지 않을경우
	if (!authRegex.test(auth)){

		// 컬러변경 및 진동효과
		$("input[id*='_auth']").addClass("base__red fc__white vibration")
		$("input[id*='_auth']").eq(0).focus();
		setTimeout(()=>{
			$("input[id*='_auth']").removeClass("vibration")
		}, 300)

		toastPop("warn", "올바른 권한 형식이 아닙니다.")
		return false;
	}

	return true;
}




// INPUT Observing Method
function observingInput(){
	$("input[id*='_id']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})

	$("input[id*='_pw']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})

	$("input[id*='_pWc']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})
	
	
	$("input[id*='_email']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})

	$("input[id*='_nickname']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})
	
	$("input[id*='_height']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})

	$("input[id*='_weight']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})

	$("input[id*='_bd']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})

	
	$("input[id*='_auth']").on("input",function(){
		$(this).removeClass("base__red fc__white")
	})
	
}