// 검색 input창 요소 입력
const query = document.getElementById("query");
const keyword = document.getElementById("keyword");
const result = document.getElementById("food-cont");
const foodInfoBox = document.getElementById("food-info-box");
const foodTable = document.getElementById("food-table");

console.log("test");

query.addEventListener("input", (e) => {
    fetch("/dietInfo/foodInfoSearch?query=" + e.target.value)
    .then(resp => resp.json()) // 응답객체
    .then(searchKeyword => {
        console.log(searchKeyword);
        result.innerText = "";
        foodInfoBox.innerText = "";
        foodTable.innerText = "";
        result.style.display='block';
        foodInfoBox.style.display="none";

        if(searchKeyword.length > 0){
            let htmls = "";
            for(let keyword of searchKeyword){

                let keywordhighlight = keyword.foodName;

                htmls +=`<div class="food-container">
                                <span class="base__lorange fs-14">${keyword.foodCnt}</span> <br> <br>
                                <a href="#" class="fs-16" onclick = "dietInfoDetail('${keyword.foodNo}')">
                                ${keywordhighlight.replace(e.target.value,"<mark>" + e.target.value + "</mark>")}${keyword.foodType}
                                </a><br>
                                <span class="fs-16">중량 : ${keyword.foodWeight}g</span>
                                <span class="fc__orange fs-16"style="margin-left:400px">열량 : ${keyword.foodCal}kcal</span>
                                </div>`;
            }
            result.innerHTML = htmls;
        } else {
            result.innerText = "";
        }
    })
    
    .catch( err => {
        console.log(err);
    })
})
   
       
query.addEventListener("focusout", ()=>{
    setTimeout(() => {
        result.style.display='none';
    }, 300);    
    
})

function dietInfoDetail(foodNo){


    fetch("/dietInfo/foodInfoDetail?foodNo=" + foodNo)
    .then(resp => resp.json()) // 응답객체
    .then(foodInfo => {
        
        const food = foodInfo[0];
        foodInfoBox.style.display="flex";

        foodInfoBox.innerHTML = `
        <div class="food-info-sm" >
        <span class="base__lorange fs-14">${food.foodCnt}</span> <br> <br>
        <p class="fs-16">${food.foodName}(${food.foodType})} / ${food.foodWeight}g</p>
        <p class="fc__orange fs-16">${food.foodCal}kcal</p>
        </div>
        <div class="food-chart"><canvas id="myPieChart" width="50" height="50"></canvas><div>
        `;
    
        foodTable.innerHTML = `
            <tr>
                <td>단백질</td>
                <td>${food.foodProtein}(g)</td>
                <td>지방</td>
                <td>${food.foodFat}(g)</td>
            </tr>
            <tr>
                <td>당류</td>
                <td>${food.foodSugar}(g)</td>
                <td>탄수화물</td>
                <td>${food.foodHydro}(g)</td>
            </tr>
            <tr>
                <td>식이섬유</td>
                <td>${food.foodFiber}50(g)</td>
                <td>나트륨</td>
                <td>${food.foodSOD}(g)</td>
            </tr>
            <tr>
                <td>콜레스테롤</td>
                <td>${food.foodCOL}(g)</td>
                <td>포화지방</td>
                <td>${food.foodSATfat}(g)</td>
            </tr>
            <tr>
                <td>트랜스지방</td>
                <td>${food.foodTransFat}(g)</td>
                <td>제조자</td>
                <td>${food.foodManufacture}</td>
            </tr>
            `;
        
        var ctx = document.getElementById('myPieChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
        type: 'pie',
         data: {
        labels: ['탄수화물', '단백질', '지방'],
        datasets: [{
            label: '# of Votes',
            data: [food.foodHydro, food.foodProtein, food.foodFat],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
         },
        options: {
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
                },
            title: {
                display: true,
                text: '영양소 구성'
            }
         }
        }
        });
    }
    )
    
    .catch( err => {
        console.log(err);
    })
    selectReplyList(foodNo);
}



// 댓글 목록 조회
function selectReplyList(foodNo){

    document.getElementById("reply-title").innerHTML = `
    <br>
    <span class="fs-16">다이어터 한줄평</span>
    <i class="fa fa-thumbs-up" style="font-size: 24px; color: #FFAB5E; margin-left: 5px;"></i>
    <span id="likeNo" class="fs-16">나중에 넣기</span>
    <br>
    <button class="btn btn-exsmall__orange" style="margin-left: 550px; width: 80px;" onclick="showInsertReply(${foodNo})">한줄평작성</button>`;

    

    
    fetch("/reply?replyTypeNo="+ 4 + "&replyTargetNo=" + foodNo) // GET방식은 주소에 파라미터를 담아서 전달
    .then(response => response.json()) // 응답객체 -> 파싱 
    .then(rList => {
        console.log(rList);

        // 화면에 출력되어 있는 댓글 목록 삭제
        const replyList = document.getElementById("reply-body"); 
        replyList.style.margin = '20px';
        replyList.innerHTML = "";

        // cList에 저장된 요소를 하나씩 접근
        for(let reply of rList){

            if(reply.replyST == 'N'){
               
                // reply-container div 생성
                const replyContainer = document.createElement('div');
                replyContainer.classList.add('reply-container');

                // 날짜 span 생성
                const dateSpan = document.createElement('span');
                dateSpan.style.flexBasis = '100%';
                dateSpan.style.textAlign = 'right';
                dateSpan.style.marginRight = '20px';
                dateSpan.innerText = reply.replyDT;

                // 이미지 생성
                const img = document.createElement('img');
                img.src = reply.userImage;
                img.alt = 'Thumbnail';
                img.classList.add('comment-thumbnail');
                
                // comment-details div 생성
                const commentDetails = document.createElement('div');
                commentDetails.classList.add('comment-details');

                // 유저 아이디 span 생성
                const userIdSpan = document.createElement('span');
                userIdSpan.classList.add('comment-id');
                userIdSpan.innerText = reply.userNickname;


                 // thumbs-up 아이콘 생성
                 const thumbsUpIcon = document.createElement('i');
                 thumbsUpIcon.classList.add('fa', 'fa-thumbs-up');
                 thumbsUpIcon.id = 'thumbIcon';
                 thumbsUpIcon.style.fontSize = '24px';
                 thumbsUpIcon.style.cursor = 'pointer';
                 thumbsUpIcon.style.color = 'black';
                 thumbsUpIcon.onclick = function thumbIcon(e){
                     e.target.style.color = e.target.style.color === 'black' ? '#FFAB5E' : 'black';
                 };

                // 댓글 내용 div 생성
                const commentContent = document.createElement('div');
                commentContent.classList.add('comment-content');
                commentContent.innerText = reply.replyContent;

                commentDetails.append(userIdSpan);
                commentDetails.append(thumbsUpIcon);
                commentDetails.append(commentContent);


                if( loginUserNo == reply.userNo ){

                    // comment-actions div 생성
                    const commentActions = document.createElement('div');
                    commentActions.classList.add('comment-actions');
                    
                    // 수정 버튼 생성
                    const updateBtn = document.createElement('button');
                    updateBtn.classList.add('btn', 'btn-medium__lorange');
                    updateBtn.style.width = '50px';
                    updateBtn.style.height = '20px';
                    updateBtn.innerText = '수정';

                    // 수정 버튼에 onclick 이벤트 속성 추가
                    updateBtn.setAttribute("onclick", "showUpdateReply("+reply.replyNo+","+reply.foodNo+")");                        


                    // 삭제 버튼
                     // 삭제 버튼 생성
                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('btn', 'btn-medium__red');
                    deleteBtn.style.width = '50px';
                    deleteBtn.style.height = '20px';
                    deleteBtn.innerText = '삭제';
                    // 삭제 버튼에 onclick 이벤트 속성 추가
                    deleteBtn.setAttribute("onclick", "deleteReply("+reply.replyNo+","+reply.foodNo+")");       

                    // 버튼 영역 마지막 자식으로 수정/삭제 버튼 추가
                    commentActions.appendChild(updateBtn);
                    commentActions.appendChild(deleteBtn);
                    commentDetails.appendChild(commentActions);

                } // if 끝




                replyContainer.appendChild(dateSpan);
                replyContainer.appendChild(img);
                replyContainer.appendChild(commentDetails);
                replyList.append(replyContainer);
                
            }else{
                const replySpan = document.createElement("span");
                replySpan.innerText = " 삭제된 댓글 입니다. ";
                replySpan.classList.add("reply-row");
                replyList.append(replySpan);
            }
        }

    })
    .catch(err => console.log(err));

}




//-------------------------------------------------------------------------------------------------


// 댓글 등록


// 답글 작성 화면 추가 
function showInsertReply(no){

    console.log("test");


    // 댓글 클릭
	let replyInsertModal = $('#updateModal');

	replyInsertModal.find(".modal-title").html(`<p class="fs-14 fc__white">댓글 입력</p>`)
	replyInsertModal.find(".modal-body").html(`
                            <div class="modal-row">
                                <textarea name="insert-reply-content" rows="5" cols="30" placeholder="댓글을 입력해주세요" ></textarea>
                            </div>
                            <div class="modal-btns">
                                <button class="btn-medium__lorange acceptBtn"> 확인 </button>
                                <button class="btn-medium__gray cancelBtn" data-bs-dismiss="modal" onclick="deleteEventListener(this)"> 취소 </button>
                            </div>
                            `
                        )

    
    // 모달 보이는 함수
	replyInsertModal.modal('show');
	
    // 모달에서 확인버튼 클릭 이벤트
	replyInsertModal.find(".acceptBtn").one("click", function(){
		insertReply(no, replyInsertModal);
	})

    selectReplyList(no);
}




function insertReply(no, replyInsertModal){
    
    
    let replyUpdateModalBootStrap = bootstrap.Modal.getInstance(replyInsertModal);
	let insertReplyContent = $("[name='insert-reply-content']").val();
    
    
    if (loginUser == ""){
        toastPop("warn", "로그인 후 이용해주세요");
		return;
	}
	
	
	if (insertReplyContent.trim() != ""){
        console.log("댓글 no", no)
		console.log("댓글 내용", insertReplyContent)
        
        
        const data = {
            "replyContent" : insertReplyContent,
            "replyTypeNo" : 4,
            "replyTargetNo" : no,
            "userNo" : loginUserNo
        };
        
        fetch("/reply",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data) // JS객체 -> JSON 파싱
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                // bootstrap 모달 숨기기
		        replyUpdateModalBootStrap.hide()
                alert("댓글이 등록되었습니다.");
                selectReplyList(no);
            }else{
                alert("댓글 수정 실패");
            }
        })
        .catch(err => console.log(err));
        
        
	} else{
        toastPop("warn", "댓글을 입력해주세요")
	}
}
    
	


// -----------------------------------------------------------------------------------
// 댓글 삭제
function deleteReply(replyNo, no){
    console.log(replyNo);
    if( confirm("정말로 삭제 하시겠습니까?") ){

        fetch("/reply",{
            method : "DELETE",
            headers : {"Content-Type" : "application/json"},
            body : replyNo
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                alert("삭제되었습니다");
                selectReplyList(); // 목록을 다시 조회해서 삭제된 글을 제거
            }else{
                alert("삭제 실패");
            }
        })
        .catch(err => console.log(err));

    }

    selectReplyList(no);

}


// ------------------------------------------------------------------------------------------
// 댓글 수정 화면 modal로

function showUpdateReply(replyno, no){
    
	let replyUpdateModal = $('#updateModal');

	replyUpdateModal.find(".modal-title").html(`<p class="fs-14 fc__white">댓글 수정</p>`)
	replyUpdateModal.find(".modal-body").html(`
                            <div class="modal-row">
                                <textarea name="update-reply-content" rows="5" cols="30" placeholder="수정할 댓글을 입력해주세요" ></textarea>
                            </div>
                            <div class="modal-btns">
                                <button class="btn-medium__lorange acceptBtn"> 확인 </button>
                                <button class="btn-medium__gray cancelBtn" data-bs-dismiss="modal" onclick="deleteEventListener(this)"> 취소 </button>
                            </div>
                            `
                        )

    
    // 모달 보이는 함수
	replyUpdateModal.modal('show');
	
    // 모달에서 확인버튼 클릭 이벤트
	replyUpdateModal.find(".acceptBtn").one("click", function(){
		updateReply(replyno, replyUpdateModal)
	})
    selectReplyList(no);
}


// 댓글 수정 함수
function updateReply(no, replyUpdateModal){
	let replyUpdateModalBootStrap = bootstrap.Modal.getInstance(replyUpdateModal);
	let updateReplyContent = $("[name='update-reply-content']").val()
	
	if (loginUser == ""){
		toastPop("warn", "로그인 후 이용해주세요");
		return;
	}
	
	// 요청
	const request_url = ``;
	
	if (updateReplyContent.trim() != ""){
		console.log("댓글 no", no)
		console.log("댓글 내용", updateReplyContent)

		
		
        const data = {
            "replyContent" : updateReplyContent,
            "replyNo" : no
        };

        fetch("/reply",{
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data) 
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                // bootstrap 모달 숨기기
		        replyUpdateModalBootStrap.hide()
                alert("댓글이 수정되었습니다.");
                selectReplyList();
            }else{
                alert("댓글 수정 실패");
            }
        })
        .catch(err => console.log(err));
    

	} else{
		toastPop("warn", "댓글을 입력해주세요")
	}
}

// 취소 누를경우, AccepBtn 에 있는 이벤트리스너 제거
function deleteEventListener(el) {
	let acceptBtn = $(el).parent().find(".acceptBtn")
	acceptBtn.off("click");
}


