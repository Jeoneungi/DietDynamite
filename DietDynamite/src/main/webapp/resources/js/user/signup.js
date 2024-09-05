// 인풋 창
const userId = document.getElementById("userId");
const userPw = document.getElementById("userPw");
const userPwc = document.getElementById("userPwc");
const userEmail = document.getElementById("userEmail");
const userNickname = document.getElementById("userNickname");
const userProH = document.getElementById("userProH");
const userProW = document.getElementById("userProW");
const userDB = document.getElementById("userDB");

const inputArr = [userId,userPw, userPwc, userEmail, userNickname, userProH, userProW, userDB]

// 스펜
const spanId = document.getElementById("spanId");
const spanPw = document.getElementById("spanPw");
const spanPwc = document.getElementById("spanPwc");
const spanEmail = document.getElementById("spanEmail");
const spanNick = document.getElementById("spanNick");
const spanH = document.getElementById("spanH");
const spanW = document.getElementById("spanW");
const spanBd = document.getElementById("spanBd");


const spanArr = [spanId ,spanPw, spanPwc, spanEmail, spanNick, spanH, spanW, spanBd]



// 유효성 검사용 OBJ
const checkObj = {
    "userId": false,
    "userPw": false,
    "userPwc": false,
    "userEmail": false,
    "userNickname": false,
};


// 인풋창 포커스인&아웃 시 언더바 색 변경
for(let i = 0; i < inputArr.length ; i++){
    inputArr[i].addEventListener("focus", ()=>{
            spanArr[i].style.borderBottom = "1px solid #FF9D42";
    })

    inputArr[i].addEventListener("focusout", ()=>{
            spanArr[i].style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    })

};


//아이디 유효성 검사

memberNickname.addEventListener("input", function (){
    
    if (memberNickname.value == "") {
        nickMessage.classList.remove("error","comfirm");
        nickMessage.innerText = "영어/숫자/한글 2~10글자 사이로 작성해주세요.";
        return;
    } 
    // 1) 정규표현식 객체 생성
    const regExNick = /^[a-zA-Z가-힣0-9]{2,10}$/;

    // 2) 입력 받은 닉네임과 정규식 일치 여부 판별
    if(regExNick.test(memberNickname.value)){ // 유효한 경우

        fetch("/dupCheck/nickName?nickName=" + memberNickname.value) // GET 방식 요청
        .then(response => response.text())

        .then(result => {
            // result : 중복 1, 중복이 아니면 0
            if(result == 0){
                checkObj.memberNickname = valid(nickMessage,"사용 가능한 닉네임 입니다.")
            } else{    
                checkObj.memberNickname = notValid(nickMessage,"이미 사용 중인 닉네임 입니다.")
            }
        
        })
        .catch(e => { console.log(e) })

    } else{ // 유효하지 않은 경우
        checkObj.memberNickname = notValid(nickMessage,"유효하지 않은 닉네임 입니다");
        return;
    }

})
