// 좋아요 버튼 클릭 이벤트 처리
document.addEventListener('DOMContentLoaded', () => {
    const boardLike = document.getElementById("boardLike");

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
            boardType: boardType,
            boardNo: window.boardNo,
            check: check
        };

        // AJAX 요청으로 서버에 좋아요 상태를 업데이트
        fetch("/diary/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // 응답을 텍스트로 변환
        .then(result => {
            const foodItemsContainer = document.querySelector(".food-items");
            foodItemsContainer.innerHTML = ''; // 이전 결과 초기화
    
            // 검색 결과가 비어 있는지 확인
            if (result.length === 0) {
                foodItemsContainer.innerHTML = '<p class="fs-12">검색 결과가 없습니다.</p>';
            } else {
                // 검색 결과 출력
                result.forEach(food => {
                    const foodItemHTML = `
                    <div class="food-item" data-name="${food.foodName}" data-serving="${food.foodWeight}" data-calories="${food.foodCal}">
                        <div class="badge fs-12">${food.foodCnt}회 이상</div>
                        <div class="food-info">
                            <div class="food-details">
                                <p class="fs-12">${food.foodName}</p>
                                <p class="fs-12">중량: ${food.foodWeight}g</p>
                            </div>
                            <p class="fs-12 kcal">열량: ${food.foodCal}kcal</p>
                        </div>
                    </div>`;
                    foodItemsContainer.innerHTML += foodItemHTML;
                });
            }
        })
        .catch(err => {
            console.log("예외 발생");
            console.log(err);
        });
    });
});

const updateBtn = document.getElementById("updateBtn");
if(updateBtn !=null){

    updateBtn.addEventListener("click", ()=>{

        location.href =  location.pathname.replace("diary","diary") 
                        + "/update"
                        + location.search;
    
    })
}


//목록으로
const goToListBtn = document.getElementById("goToListBtn");
    goToListBtn.addEventListener("click", ()=>{

        location.href = "/diary/" + boardType;
    } )


//삭제
const deleteBtn = document.getElementById("deleteBtn");

if(deleteBtn !=null){
    deleteBtn.addEventListener("click",()=>{
        console.log("클릭되었다.")
        if(confirm("정말로 삭제하시겠습니까?")){
            location.href=location.pathname.replace("diary","diary")
            +'/delete';
        }

    })

}

