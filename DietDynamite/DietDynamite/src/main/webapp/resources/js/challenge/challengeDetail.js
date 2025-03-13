// 좋아요 버튼 클릭 이벤트 처리
document.addEventListener('DOMContentLoaded', () => {
    const boardLike = document.getElementById("boardLike");

    boardLike.nextElementSibling.innerText = initialLikeCount; 
    if (!boardLike) {
        console.error('좋아요 버튼을 찾을 수 없습니다.');
        return;
    }

    boardLike.addEventListener("click", e => {
        // 로그인 여부 검사
        if (window.loginUserNo === "") {
            alert("로그인 후 이용해주세요.");
            return;
        }

        let check; // 기존에 좋아요 X(빈하트) : 0, 기존에 좋아요 O (꽉찬하트) : 1

        // 클릭된 요소의 클래스 확인
        if (e.target.classList.contains("fa-regular")) { // 좋아요 X(빈하트)
            check = 0;
        } else { // 좋아요 O(꽉찬하트)
            check = 1;
        }
        // 서버로 보낼 데이터 객체
        const data = {
            userNo: window.loginUserNo,
            boardType: 2,
            boardNo: window.boardNo,
            check: check
        };

        // AJAX 요청으로 서버에 좋아요 상태를 업데이트
        fetch("/challenge/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.text()) // 응답을 텍스트로 변환
        .then(result => {
            console.log("result: " + result);

            if (result == -1) { // 서버 처리 실패 시
                console.log("좋아요 처리 실패");
                return;
            }

            // 클래스 토글을 통해 UI 업데이트
            e.target.classList.toggle("fa-regular");
            e.target.classList.toggle("fa-solid");

            // 현재 게시글의 좋아요 수를 화면에 출력
            //e.target.nextElementSibling.innerText = result;
            
            // 좋아요 수 업데이트
            const currentLikeCount = parseInt(result, 10); // 서버로부터 받은 결과를 정수로 변환
            boardLike.nextElementSibling.innerText = currentLikeCount; // 좋아요 수 업데이트
        })
        .catch(err => {
            console.log("예외 발생");
            console.log(err);
        });
    });
});


// 업데이트 클릭
const updateBtn = document.getElementById("updateBtn");
if(updateBtn !=null){

    updateBtn.addEventListener("click", ()=>{


        if(confirm("정말로 수정하시겠습니까?")){
            location.href =  location.pathname.replace("challenge","challenge") 
            + "/update"
            + location.search;

        }
            // if(challengeSession == 'Y'){
            //     alert("완료된 챌린지는 수정이 불가합니다..");
            //     return; // 함수 실행 중단
            //    }
            // //if(todayResult == 1 && cDayToToday == 0){
            // if(todayResult == 1){

            //     }
            //  } else{
            //    alert("이전에 작성한 챌린지는 수정 불가합니다..");
            //    return; // 함수 실행 중단
            //  }


    })
}


//목록으로
const goToListBtn = document.getElementById("goToListBtn");
    goToListBtn.addEventListener("click", ()=>{
        location.href = "/challenge/" + boardType;
    } )


//삭제
const deleteBtn = document.getElementById("deleteBtn");

if(deleteBtn !=null){
    deleteBtn.addEventListener("click",()=>{
        console.log("클릭되었다.");
        console.log(challengeSecession);
        if(todayResult == 1){
          if(confirm("정말로 삭제하시겠습니까?")){
          location.href=location.pathname.replace("challenge","challenge")
          +'/delete';
          }

        }
        // // if(challengeSession == 'Y' || (todayResult == 1 && cDayToToday == 0){
        //    if(challengeSession == 'Y'){
        //     alert("완료된 챌린지는 삭제가 불가합니다..");
        //     return; // 함수 실행 중단
        //    }

        
        //    //if(todayResult == 1 && cDayToToday == 0){
        //    } else{
        //      alert("이전에 작성한 챌린지는 삭제 불가합니다..");
        //      return; // 함수 실행 중단
        //    }

    })

}

