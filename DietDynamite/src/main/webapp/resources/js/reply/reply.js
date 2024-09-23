$(window).on('load', function() {
    selectReplyList();
});

// 댓글 목록 조회
function selectReplyList(){
    
    fetch("/reply?replyTypeNo="+ 2 + "&replyTargetNo=" + boardNo) // GET방식은 주소에 파라미터를 담아서 전달
    .then(response => response.json()) // 응답객체 -> 파싱 
    .then(rList => {
        console.log(rList);

        // 화면에 출력되어 있는 댓글 목록 삭제
        const replyList = document.getElementById("replyList");
        replyList.innerHTML = "";

        // cList에 저장된 요소를 하나씩 접근
        for(let reply of rList){

            if(reply.replyST == 'N'){

                // 행
                const replyRow = document.createElement("div");
                replyRow.classList.add("review-item");

                // 답글일 경우 child-reply 클래스 추가
                if(reply.parentNo != 0)  replyRow.classList.add("child-reply");
                
                // 작성자 본인이라면 파란원으로 '나' 표시 컨테이너 
                const userImageContainer = document.createElement("div");
                userImageContainer.classList.add("user-image-container");
                userImageContainer.style.position = "relative";

                // 프로필 이미지 
                const userImage = document.createElement("img");
                userImage.setAttribute("src", reply.userImg || "/resources/images/profile/user_img1.jpg");
                userImage.setAttribute("alt", "User Image");

                userImageContainer.appendChild(userImage);
                

                // 로그인한 사용자의 댓글인 경우 "나" 표시 추가
                if (loginUserNo == reply.userNo) {
                    const meIndicator = document.createElement("div");
                    meIndicator.classList.add("me-indicator");
                    meIndicator.innerText = "나";
                    meIndicator.style.position = "absolute";
                    meIndicator.style.bottom = "0";
                    meIndicator.style.right = "0";
                    meIndicator.style.backgroundColor = "blue";
                    meIndicator.style.color = "white";
                    meIndicator.style.borderRadius = "50%";
                    meIndicator.style.padding = "2px 5px";
                    meIndicator.style.fontSize = "12px";

                    userImageContainer.appendChild(meIndicator);
                }

                // 작성자 
                const reviewContent = document.createElement("div");
                reviewContent.classList.add("review-content");

                // 작성자 닉네임
                const userNickname = document.createElement("p");
                userNickname.innerText = reply.userNickname;
               
                const replyContent = document.createElement("p");
                replyContent.innerHTML = reply.replyContent;
        
                const reviewMeta = document.createElement("div");
                reviewMeta.classList.add("review-meta");
                
                if (reply.replyCheck > 0) {
                    reviewMeta.innerHTML = `<i class="fa-solid fa-heart like" id="boardLike${reply.replyNo}" onclick="readyLike('${reply.replyNo}')"></i>`;
                } else {
                    reviewMeta.innerHTML = `<i class="fa-regular fa-heart like" id="boardLike${reply.replyNo}" onclick="readyLike('${reply.replyNo}')"></i>`;
                }   
                reviewMeta.innerHTML += `
                    <span class="like">${reply.replyLike || 0}</span>
                    <span class="review-date">${reply.replyDT}</span>
                `;

                                
                                     
                // 로그인이 되어있는 경우 답글 버튼 추가
                if(loginUserNo != ""){

                    // 답글 버튼
                    const childReplyBtn = document.createElement("button");
                    childReplyBtn.setAttribute("onclick", "showInsertReply("+ reply.replyNo+", this)");
                    childReplyBtn.innerText = "답글";

                    // 버튼 영역에 답글 버튼 추가(대댓글 없음)
                    if(reply.parentNo == 0) {
                        reviewMeta.append(childReplyBtn);
                    }

                    // 로그인한 회원번호와 댓글 작성자의 회원번호가 같을 때만 버튼 추가
                    if (loginUserNo == reply.userNo) {
                        const updateBtn = document.createElement("button");
                        updateBtn.innerText = "수정";
                        updateBtn.setAttribute("onclick", `showUpdateReply(${reply.replyNo}, this)`);
                        const deleteBtn = document.createElement("button");
                        deleteBtn.innerText = "삭제";
                        deleteBtn.setAttribute("onclick", `deleteReply(${reply.replyNo})`);
            
                        reviewMeta.appendChild(updateBtn);
                        reviewMeta.appendChild(deleteBtn);
                      }
            
                      reviewContent.append(userNickname, replyContent, reviewMeta);
                      replyRow.append(userImageContainer, reviewContent);
            
                      replyList.append(replyRow);
                } else {
                    const li = document.createElement("li");
                    li.innerText = " 삭제된 댓글 입니다. ";
                    li.classList.add("reply-row");
                    replyList.append(li);
                }
            }
         
        }
    });       
}




//-------------------------------------------------------------------------------------------------


// 댓글 등록
const addReply = document.getElementById("addReply");
const replyContent = document.getElementById("replyContent");


document.addEventListener('DOMContentLoaded', () => {
addReply.addEventListener("click", e => { // 댓글 등록 버튼이 클릭이 되었을 때

    // 1) 로그인이 되어있나? -> 전역변수 memberNo 이용
    if(loginUserNo == ""){ // 로그인 X
        alert("로그인 후 이용해주세요.");
        return;
    }

    // 2) 댓글 내용이 작성되어있나?
    if(replyContent.value.trim().length == 0){ // 미작성인 경우
        alert("댓글을 작성한 후 버튼을 클릭해주세요.");
        replyContent.value = ""; // 띄어쓰기, 개행문자 제거
        replyContent.focus();
        return;
    }

   
    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)
    const data = { "replyContent" : replyContent.value,
                    "replyTypeNo" : 1, // boardType이랑 replyType이 일치하지 않아서 게시판용 '1' 그냥 넣음
                    "replyTargetNo" : boardNo,
                    "userNo" : loginUserNo }; // JS객체

    fetch("/reply",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data) // JS객체 -> JSON 파싱
    })
    .then(response => response.text())
    .then(result => {
        if(result > 0){ // 등록 성공
            alert("댓글이 등록되었습니다.");

            replyContent.value = ""; // 작성했던 댓글 삭제

            selectReplyList(); // 비동기 댓글 목록 조회 함수 호출
            // -> 새로운 댓글이 추가되어짐

        } else { // 실패
            alert("댓글 등록에 실패했습니다...");
        }
    })
    .catch(err => console.log(err));
});
});


// -----------------------------------------------------------------------------------
// 댓글 삭제
function deleteReply(replyNo){
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
}


// ------------------------------------------------------------------------------------------
// 댓글 수정 화면 전환  modal로

function showUpdateReply(no, el){
    
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
		updateReply(no, replyUpdateModal)
	})
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


// 답글 작성 화면 추가 
function showInsertReply(no, el){

    console.log("test");


    // 부모 댓글 번호, 클릭한 답글 버튼
	let replyInsertModal = $('#updateModal');

	replyInsertModal.find(".modal-title").html(`<p class="fs-14 fc__white">답글 수정</p>`)
	replyInsertModal.find(".modal-body").html(`
                            <div class="modal-row">
                                <textarea name="insert-reply-content" rows="5" cols="30" placeholder="답글을 입력해주세요" ></textarea>
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
		insertChildReply(no, replyInsertModal)
	})

}

// 답글 등록
function insertChildReply(no, replyInsertModal){
    
    let replyInsertModalBootStrap = bootstrap.Modal.getInstance(replyInsertModal);
    let insertReplyContent = $("[name='insert-reply-content']").val()
        
    if (loginUser == ""){
        toastPop("warn", "로그인 후 이용해주세요");
        return;
    }
    
    // 요청
    const request_url = ``;
    
    if (insertReplyContent.trim() != ""){
        console.log("댓글 no", no)
        console.log("댓글 내용", insertReplyContent)            
        

        const data = {
        "replyContent" : insertReplyContent,
        "replyTypeNo" : 1, // boardType이랑 안맞아서 했음
        "replyTargetNo" : boardNo,
        "userNo" : loginUserNo,
        "parentNo" : no
        };

        fetch("/reply",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)
        })
        .then(resp => resp.text())
        .then(result => {
        if(result > 0){ // 등록 성공
            replyInsertModalBootStrap.hide()
            alert("답글이 등록되었습니다.");
            selectReplyList();

        } else { // 실패
        alert("답글 등록에 실패했습니다...");
        }
        })
        .catch(err => console.log(err));

    } else{
        toastPop("warn", "답글을 입력해주세요")
    }
    
}

function readyLike(replyNo) {
    
    const boardLike = document.getElementById(`boardLike${replyNo}`);

    if (window.loginUserNo === "") {
        alert("로그인 후 이용해주세요.");
        return;
    }

    let check; // 기존에 좋아요 X(빈하트) : 0, 기존에 좋아요 O (꽉찬하트) : 1

    // 클릭된 요소의 클래스 확인
    if (boardLike.classList.contains("fa-regular")) { // 좋아요 X(빈하트)
        check = 0;
    } else { // 좋아요 O(꽉찬하트)
        check = 1;
    }
    // 서버로 보낼 데이터 객체
    const data = {
        userNo: loginUserNo,
        boardType: 2,
        boardNo: replyNo,
        check: check
    };

    console.log(data);
    // AJAX 요청으로 서버에 좋아요 상태를 업데이트
    fetch("/diary/like", {
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
        boardLike.classList.toggle("fa-regular");
        boardLike.classList.toggle("fa-solid");

        // 현재 게시글의 좋아요 수를 화면에 출력
        boardLike.nextElementSibling.innerText = result;
    })
    .catch(err => {
        console.log("예외 발생");
        console.log(err);
    });
   
}