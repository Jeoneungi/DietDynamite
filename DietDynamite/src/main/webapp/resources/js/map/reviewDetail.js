document.addEventListener('DOMContentLoaded', function () {
  const ratingStars = document.getElementById('rating-stars');
  let currentRating = 0;

  // ratingStars 요소가 존재하는지 확인
  if (!ratingStars) {
    console.error('ratingStars 요소를 찾을 수 없습니다!');
    return;
  }

  function createStars() {
    ratingStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.innerText = '★';
      star.dataset.rating = i;
      if (i <= currentRating) {
        star.classList.add('selected');
      }
      ratingStars.appendChild(star);
    }
  }

  ratingStars.addEventListener('click', function (e) {
    if (e.target.classList.contains('star')) {
      currentRating = parseInt(e.target.dataset.rating);
      console.log('Selected Rating:', currentRating);

      // 모달 창 열기 및 선택된 별점 반영
      openModal(currentRating);
    }
  });

  function createModalStars(rating) {
    const modalRatingStars = document.getElementById('modal-rating-stars');
    modalRatingStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.innerText = '★';
      star.dataset.rating = i;
      if (i <= rating) {
        star.classList.add('selected');
      }
      modalRatingStars.appendChild(star);
    }

    // 모달 내 별점 클릭 이벤트 처리
    modalRatingStars.addEventListener('click', (e) => {
      if (e.target.classList.contains('star')) {
        // 이벤트가 하위 요소에서 발생했을 때 부모 요소로 전파되는 것을 막습니다.
        e.stopPropagation();

        currentRating = parseInt(e.target.dataset.rating);
        createModalStars(currentRating);
        console.log('Selected Rating in Modal:', currentRating);
      }
    }, { once: true }); // 이벤트를 한 번만 실행하도록 설정
  }

  function openModal(rating) {
    if (!loginUser) {
      alert("로그인 해주세요");
      window.location.href = "/user/login"; // 로그인 페이지 URL로 변경
      return;
    }

    const modal = document.getElementById('rating-modal');
    modal.style.display = 'block';
    createModalStars(rating);
  }

  ratingStars.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('star')) {
      const rating = parseInt(e.target.dataset.rating);
      Array.from(ratingStars.children).forEach(star => {
        if (parseInt(star.dataset.rating) <= rating) {
          star.classList.add('hovered');
        } else {
          star.classList.remove('hovered');
        }
      });
    }
  });

  ratingStars.addEventListener('mouseleave', function () {
    Array.from(ratingStars.children).forEach(star => {
      star.classList.remove('hovered');
    });
  });

  createStars();

  function closeModal() {
    const modal = document.getElementById('rating-modal');
    if (!modal) {
      console.error('모달 요소를 찾을 수 없습니다!');
      return;
    }
    modal.style.display = 'none';
  }

  


  function submitRating() {
    closeModal();
    // 리뷰 내용 가져오기
    const reviewContent = document.getElementById('review-content');

    console.log(replyTargetNo);
    console.log(loginUserNo);
    console.log(currentRating);


    // 2) 댓글 내용이 작성되어있나?
    if(reviewContent.value.trim().length == 0){ // 미작성인 경우
        alert("댓글을 작성한 후 버튼을 클릭해주세요.");
        reviewContent.value = ""; // 띄어쓰기, 개행문자 제거
        return;
    }

    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)
    const data = { "replyContent" : reviewContent.value,
                    "replyTypeNo" : 3,
                    "replyTargetNo" : replyTargetNo,
                    "replyStar" : currentRating,
                    "userNo" : loginUserNo }; // JS객체

    fetch("/reply",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data) // JS객체 -> JSON 파싱
    })
    .then(response => response.text())
    .then(result => {
        if(result > 0){ // 등록 성공
            alert("리뷰가 등록되었습니다.");

            reviewContent.value = ""; // 작성했던 댓글 삭제

            selectReplyList(); // 비동기 댓글 목록 조회 함수 호출
            // -> 새로운 댓글이 추가되어짐

        } else { // 실패
            alert("리뷰 등록에 실패했습니다...");
        }
    })
    .catch(err => console.log(err));

       // 모달 닫기
    closeModal();
  }

  const closeBtn = document.getElementById('cancel-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
      // 페이지 이동
      alert("리뷰를 취소하시겠습니까?")
      window.location.reload();
    });
  }


  const submitBtn = document.getElementById('submit-button');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitRating);
  }
});


$(document).ready(function () {
  selectReplyList();
  $('#favorite-btn').click(function () {
    $(this).find('i').toggleClass('fa-regular fa-solid');
  });
});


fetchPlaceDetails(mapId);

function fetchPlaceDetails(mapId) {
  const mapEl = document.getElementById("place-img");

  const setImage = (url) => {
    mapEl.style.backgroundImage = `url("${url}")`;
    mapEl.classList.remove("loading", "error");
  };

  const handleError = (message) => {
    mapEl.classList.remove("loading");
    mapEl.classList.add("error");
    mapEl.innerText = message;
  };

  const startCrawling = () => {
    startCrawlingAndSave(mapId, mapEl);
  };

  // 이미지를 로딩 중임을 표시
  mapEl.classList.add("loading");

  // 서버에서 placeId로 이미지 조회 요청
  fetch(`/rest/map/places/getImageByPlaceId?placeAPIid=${mapId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('가게 정보 조회 실패');
      }
      return response.json();  // JSON 응답을 받도록 수정함
      
    })
    .then(result => {
      const placeImg = result?.placeImg;

      if (placeImg) {
        placeImg !== "" ? setImage(`https://${placeImg}`) : handleError("이미지가 없습니다.");
      } else {
        startCrawling();
      }
    })
    .catch(error => {
      console.error('가게 정보 조회 오류:', error);
      handleError("가게 정보를 불러오는 중 오류가 발생했습니다.");
    });

}


function startCrawlingAndSave(mapId, mapEl) {
  // 크롤링 API 호출
  fetch(`http://localhost:7000/api/crawling/kakaoImageOnce?mapId=${mapId}`)
    .then(response => response.json())
    .then(crawledData => {
      if (crawledData.src && crawledData.src !== "없음") {
        const imageUrl = `https://${crawledData.src}`;
        mapEl.style.backgroundImage = `url("${imageUrl}")`;

        // 5) 크롤링한 이미지 DB에 저장
        fetch('/rest/map/place/saveImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            placeAPIid: mapId,
            placeImg: crawledData.src
          })
        })
          .then(() => {
            console.log(`이미지 저장 완료: ${mapId}`);
          })
          .catch(error => {
            console.error('이미지 저장 중 오류 발생:', error);
          });
      } else {
        // 이미지가 없을 경우 처리
        console.log(`이미지 없음: ${mapId}`);
        mapEl.classList.add("error");
        mapEl.innerText = "이미지가 없습니다.";
      }
    })
    .catch(error => {
      console.error('크롤링 중 오류 발생:', error);
      mapEl.classList.remove("loading");
      mapEl.classList.add("error");
      mapEl.innerText = "이미지 크롤링 중 오류가 발생했습니다.";
    })
    .finally(() => {
      mapEl.classList.remove("loading");
    });
}



// 댓글 목록 조회
function selectReplyList(){
    
    fetch("/reply?replyTypeNo="+ 3 + "&replyTargetNo=" + replyTargetNo) // GET방식은 주소에 파라미터를 담아서 전달
    .then(response => response.json()) // 응답객체 -> 파싱 
    .then(rList => {
      console.log(rList);

      // 화면에 출력되어 있는 댓글 목록 삭제
      const replyList = document.getElementById("replyList"); // ul태그

      // cList에 저장된 요소를 하나씩 접근
      for(let reply of rList){

          if(reply.replyST == 'N'){

              // 행
              const replyRow = document.createElement("li");
              replyRow.classList.add("review-item");

              // 작성자
              const replyWriter = document.createElement("p");
              replyWriter.classList.add("review-content");

              // 프로필 이미지
              const userImage = document.createElement("img");

              if(reply.userImage != null ){ // 프로필 이미지가 있을 경우
                  userImage.setAttribute("src", reply.userImage);
              }else{ // 없을 경우 == 기본이미지
                  profileImage.setAttribute("src", "/resources/images/profile/user_img1.jpg");
              }

              // 작성자 닉네임
              const userNickname = document.createElement("span");
              userNickname.innerText = reply.userNickname;
              
              // 작성일
              const replyDT = document.createElement("span");
              replyDT.classList.add("reply-date");
              replyDT.innerText =  reply.replyDT;

            
              // 댓글 내용
              const replyContent = document.createElement("p");
              replyContent.classList.add("reply-content");
              replyContent.innerHTML = reply.replyContent;

              // 별점내용
              const rating = document.createElement("div");
              rating.classList.add("rating");
              rating.style.fontSize = "30px";
              rating.style.color = "orange";
              rating.innerHTML = `${'★'.repeat(reply.replyStar)}${'☆'.repeat(5 - reply.replyStar)}`;

            // 작성자 영역(p)에 프로필,닉네임,작성일 마지막 자식으로(append) 추가
              replyWriter.append(userImage , userNickname , rating);

            
              // 행에 작성자, 내용 추가
              replyRow.append(replyWriter, replyContent);

              // 로그인이 되어있는 경우 답글 버튼 추가
              if(loginUserNo != ""){
                  // 버튼 영역
                  const replyBtnArea = document.createElement("div");
                  replyBtnArea.classList.add("reply-btn-area");

                 
                  // 로그인한 회원번호와 댓글 작성자의 회원번호가 같을 때만 버튼 추가
                  if( loginUserNo == reply.userNo ){

                      // 수정 버튼
                      const updateBtn = document.createElement("button");
                      updateBtn.innerText = "수정";

                      // 수정 버튼에 onclick 이벤트 속성 추가
                      updateBtn.setAttribute("onclick", "showUpdateReply("+reply.replyNo+", this)");                        


                      // 삭제 버튼
                      const deleteBtn = document.createElement("button");
                      deleteBtn.innerText = "삭제";
                      // 삭제 버튼에 onclick 이벤트 속성 추가
                      deleteBtn.setAttribute("onclick", "deleteReply("+reply.replyNo+")");                       


                      // 버튼 영역 마지막 자식으로 수정/삭제 버튼 추가
                      replyBtnArea.append(updateBtn, deleteBtn);

                  } // if 끝
                  

                  // 행에 버튼영역 추가
                  replyRow.append(replyBtnArea); 
              }
              
              // 댓글 목록(ul)에 행(li)추가
              replyList.append(replyRow);

              // 로그인이 되어있는 경우 답글 버튼 추가
              if(loginUserNo != ""){
                  // 버튼 영역



                  
                  const replyBtnArea = document.createElement("div");
                  replyBtnArea.classList.add("reply-btn-area");

                 
                  // 로그인한 회원번호와 댓글 작성자의 회원번호가 같을 때만 버튼 추가
                  if( loginUserNo == reply.userNo ){

                      // 수정 버튼
                      const updateBtn = document.createElement("button");
                      updateBtn.innerText = "수정";

                      // 수정 버튼에 onclick 이벤트 속성 추가
                      updateBtn.setAttribute("onclick", "showUpdateReply("+reply.replyNo+", this)");                        

                      // 삭제 버튼
                      const deleteBtn = document.createElement("button");
                      deleteBtn.innerText = "삭제";
                      // 삭제 버튼에 onclick 이벤트 속성 추가
                      deleteBtn.setAttribute("onclick", "deleteReply("+reply.replyNo+")");                       


                      // 버튼 영역 마지막 자식으로 수정/삭제 버튼 추가
                      replyBtnArea.append(updateBtn, deleteBtn);

                  } // if 끝
                  

                  // 행에 버튼영역 추가
                  replyRow.append(replyBtnArea); 
              }
              
          }else{
              const li = document.createElement("li");
              li.innerText = " 삭제된 댓글 입니다. ";
              li.classList.add("reply-row");
              replyList.append(li);
          }

      }
    })
    .catch(err => console.log(err));

}