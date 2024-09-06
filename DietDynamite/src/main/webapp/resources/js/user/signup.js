$(document).ready(function () {
    observingInput()
});
// 인풋 창
const userId = document.getElementById("user_id");
const userPw = document.getElementById("user_pw");
const userPwc = document.getElementById("user_pWc");
const userEmail = document.getElementById("user_email");
const userNickname = document.getElementById("user_nickname");
const userHeight = document.getElementById("user_height");
const userWeight = document.getElementById("user_weight");
const userBD = document.getElementById("user_bd");

const inputArr = [userId, userPw, userPwc, userEmail, userNickname, userHeight, userWeight, userBD]

// 스펜
const spanId = document.getElementById("spanId");
const spanPw = document.getElementById("spanPw");
const spanPwc = document.getElementById("spanPwc");
const spanEmail = document.getElementById("spanEmail");
const spanNick = document.getElementById("spanNick");
const spanH = document.getElementById("spanH");
const spanW = document.getElementById("spanW");
const spanBd = document.getElementById("spanBd");

const spanArr = [spanId, spanPw, spanPwc, spanEmail, spanNick, spanH, spanW, spanBd]

// 성별 선택했는지 확인하는 변수
let genderCheck = 0;


/* 회원가입 유효성 검사 */
function signup(e) {
let userIdInput = userId.value
let userPwInput = userPw.value
let userPwcInput = userPwc.value
let userEmailInput = userEmail.value
let userNickInput = userNickname.value
let userHeightInput = userHeight.value
let userWeightInput = userWeight.value
let userBDInput = userBD.value

    // // 키 가 입력 되었을 경우 유효성 검사 (*필수 입력 X)
    // if(userHeightInput.length > 0) {
    //     if (!userHeightValidate(userHeightInput)) {
    //         e.preventDefault();
    //         return;
    //     }
    // }

    // // 몸무게가 입력 되었을 경우 유효성 검사 (*필수 입력 X)
    // if (userWeightInput.length > 0) {
    //     if (!userWeightValidate(userWeightInput)) {
    //         e.preventDefault();
    //         return;
    //     }
    // }

    // // 생일이 입력 되었을 경우 유효성 검사 (*필수 입력 X)
    // if (userBDInput.length > 0) {
    //     if (!birthdayValidate(userBDInput)) {
    //         e.preventDefault();
    //         return;
    //     }
    // }

    // // 성별이 선택 안되었을 경우 밸류값 초기화
    // if(genderCheck === 0){
    //     userGender.setAttribute("value", "");
    // }


    // 필수 입력 사항 (아이디,비밀번호,이메일,닉네임) 유효성 검사
    if (idValidate(userIdInput) &&
        pwValidate(userPwInput) &&
        emailValidate(userEmailInput)&&
        nicknameValidate(userNickInput)&&
        userPwCheckValidate(userPwInput,userPwcInput)) {
    } else {
        e.preventDefault();
    }


}


// 성별 하나만 선택 하는 함수
function checkboxCheck(currentCheckbox) {
    const checkboxes = document.getElementsByClassName("cb");
    const userGender = document.getElementsByName("userGender")[0];
    genderCheck = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            // 체크된 체크박스의 밸류 값을 userGender에 설정
            userGender.setAttribute("value", checkboxes[i].value)
            genderCheck = 1;
            if (checkboxes[i] !== currentCheckbox) {
                checkboxes[i].checked = false;
                // 현재 체크박스의 밸류 값을  userGender에 설정
                userGender.setAttribute("value", currentCheckbox.value)
                genderCheck = 1;
            }
        }
    }
}


// 인풋창 포커스인&아웃 시 언더바 색 변경
for (let i = 0; i < inputArr.length; i++) {
    inputArr[i].addEventListener("focus", () => {
        spanArr[i].style.borderBottom = "1px solid #FF9D42";
    })

    inputArr[i].addEventListener("focusout", () => {
        spanArr[i].style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    })

};



