// 미리보기 관련 요소 모두 얻어오기
const preview = document.getElementsByClassName("preview");
const inputImage = document.getElementsByClassName("inputImage");
const deleteImage = document.getElementsByClassName("delete-image");

// 삭제된 이미지 경로를 저장할 변수
const deleteImagePathInput = document.getElementById("deleteImagePath");

    inputImage[0].addEventListener("change", e => {
        const file = e.target.files[0]; // 선택된 파일의 데이터
        if (file != undefined) { // 파일이 선택되었을 때
            const reader = new FileReader(); // 파일을 읽는 객체
            reader.readAsDataURL(file); // 지정된 파일을 읽음
            reader.onload = e => { // 파일을 다 읽은 후 수행
                preview[0].setAttribute("src", e.target.result);
                deleteImagePathInput.value = ""; // 새 이미지가 선택되었으므로 삭제 경로 초기화
            };
        } else { // 선택 후 취소했을 때
            preview[0].removeAttribute("src"); // 미리보기 삭제
        }
    });

    // 미리보기 삭제(x버튼)
    deleteImage[0].addEventListener("click", () => {
        if (preview[0].getAttribute("src") != "") {
            preview[0].removeAttribute("src"); // 미리보기 삭제
            inputImage[0].value = ""; // 파일 선택 삭제

            // 기존 이미지 경로를 hidden 필드에 저장
            deleteImagePathInput.value = preview[0].src;
        }
    });


// 폼 제출 시
const diaryWriteFrm = document.getElementById("diaryWriteFrm");
const diaryTitle = document.getElementById("diaryTitle");
const boardContent = document.querySelector("[name='boardContent']");
let todayResult = 0;

diaryWriteFrm.addEventListener("submit", e => {
    if (diaryTitle.value.trim().length == 0) {
        alert("제목을 입력해주세요.");
        diaryTitle.value = "";
        diaryTitle.focus();
        e.preventDefault();
        return;
    }

    if (boardContent.value.trim().length == 0) {
        alert("내용을 입력해주세요.");
        boardContent.value = "";
        boardContent.focus();
        e.preventDefault();
        return;
    }

    if (todayResult == 1) {
        alert("오늘은 챌린지를 수행했씁니다..");
        e.preventDefault();
        todayResult = 0;
        return;
     }
});

// select에 정보 제공 부분

const selectOne = document.getElementById("challengeSelect")
const challengeStatus = document.getElementById("challengeStatus")

// 초기값 설정
// 초기값 설정을 위해 직접 호출
document.addEventListener('DOMContentLoaded', function() {    
    //오늘날짜 기준으로 해당 인원의 챌린지를 업데이트한다(대부분 미완료 일듯 하다)
    challengeSearch({ target: selectOne });
    challengeInfo(selectOne.value);
});

// 챌린지 선택시 진행중인 챌린지 찾기
selectOne.addEventListener("change", challengeSearch);

function challengeSearch(event){
    const selectedValue = event.target.value;
    fetch("/challenge/userChallengeSearch",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({"userNo" : loginUserNoForSearch,
                               "challengeNo" : selectedValue
                              })
    })
    .then(resp => resp.json()) // 응답객체
    .then(result => {
        console.log(result)
        if(result == 0) {
            challengeStatus.innerHTML = "진행하고 있지 않는 챌린지 입니다. 새로 시작하세요";
            return; 
        }        
        challengeInfo(result)       
     })
    .catch( err => {
        console.log(err);
    })

}

// 진행중인 챌린지 정보 전시
function challengeInfo(userChallengeNo){
    fetch("/challenge/challengeInfo?userChallengeNo=" + userChallengeNo) 
    .then(resp => resp.json()) // 응답객체
    .then(result => {
     console.log(result);
     let message = `<strong>챌린지 시작일자:</strong> ${result.challengeStartDay} <br>
                    <strong>챌린지 경과일:</strong> ${result.challengeDays} <br>
                    <strong>챌린지 수행일수:</strong> ${result.challengeSuccessDays}`;


    todayResult = result.todayResult;
     if (todayResult == 1) {
        message += `<br><strong>오늘은 챌린지를 수행하였습니다.</strong>`;
     }
     challengeStatus.innerHTML = message;
       })
    .catch( err => {
        console.log(err);
    })
}