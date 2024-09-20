
document.addEventListener('DOMContentLoaded', function () {

  const ratingStars = document.getElementById('rating-stars');
  let currentRating = 0;
  selectReplyList(); // 댓글 목록 조회 초기 실행
  // ratingStars 요소가 존재하는지 확인
  if (!ratingStars) {
    console.error('ratingStars 요소를 찾을 수 없습니다!');
    return;
  }


  // 별 생성 함수
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

  // 별 클릭 이벤트 처리
  ratingStars.addEventListener('click', function (e) {
    if (e.target.classList.contains('star')) {
      currentRating = parseInt(e.target.dataset.rating);
      console.log('Selected Rating:', currentRating);

      // 모달 창 열기 및 선택된 별점 반영
      openModal(currentRating);
    }
  });

  // 모달 창에서 별점 생성 함수
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
        e.stopPropagation();
        currentRating = parseInt(e.target.dataset.rating);
        createModalStars(currentRating);
        console.log('Selected Rating in Modal:', currentRating);
      }
    }, { once: true }); // 이벤트를 한 번만 실행하도록 설정
  }

  // 모달 열기
  function openModal(rating) {
    if (!loginUser) {
      // toast
      alert("로그인 해주세요");
      window.location.href = "/user/login"; // 로그인 페이지 URL로 변경
      return;
    }

    const modal = document.getElementById('rating-modal');
    modal.style.display = 'block';
    createModalStars(rating);
  }

  // 별점 호버링 이벤트 처리
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

  // 별점에서 마우스가 떠났을 때 처리
  ratingStars.addEventListener('mouseleave', function () {
    Array.from(ratingStars.children).forEach(star => {
      star.classList.remove('hovered');
    });
  });

  // 초기 별 생성
  createStars();

  // 모달 닫기 함수
  function closeModal() {
    const modal = document.getElementById('rating-modal');
    if (!modal) {
      console.error('모달 요소를 찾을 수 없습니다!');
      return;
    }
    modal.style.display = 'none';
  }

  // 별점 제출 함수
  function submitRating() {
    closeModal();
    // 리뷰 내용 가져오기
    const reviewContent = document.getElementById('review-content');

    console.log(replyTargetNo);
    console.log(loginUserNo);
    console.log(currentRating);


    // 2) 댓글 내용이 작성되어있나?
    if (reviewContent.value.trim().length == 0) { // 미작성인 경우
      // toast
      alert("댓글을 작성한 후 버튼을 클릭해주세요.");
      reviewContent.value = ""; // 띄어쓰기, 개행문자 제거
      return;
    }

    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)
    const data = {
      "replyContent": reviewContent.value,
      "replyTypeNo": 3,
      "replyTargetNo": replyTargetNo,
      "replyStar": currentRating,
      "userNo": loginUserNo
    };

    fetch("/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(result => {
        if (result > 0) {
          // toast
          alert("리뷰가 등록되었습니다.");
          reviewContent.value = ""; // 댓글 초기화
          selectReplyList(); // 댓글 목록 갱신
        } else {
          // toast
          alert("리뷰 등록에 실패했습니다...");
        }
      })
      .catch(err => console.log(err));


    // 모달 닫기
    closeModal();
  }

  // 모달 닫기 버튼
  const closeBtn = document.getElementById('cancel-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();

      // toast 쓸꺼
      alert("댓글을 취소하시겠습니까?");
      window.location.reload();
    });
  }

  // 제출 버튼 클릭 시
  const submitBtn = document.getElementById('submit-button');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitRating);
  }

  // 
  $(document).ready(function () {
    selectReplyList();
    $('#favorite-btn').click(function () {
      $(this).find('i').toggleClass('fa-regular fa-solid');
    });
  });


});

function deleteReply(replyNo) {
  if (confirm("정말로 삭제 하시겠습니까?")) {
    fetch(`/reply`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: replyNo
    })
      .then(resp => resp.text())
      .then(result => {

        console.log("댓글 번호 " + result)

        if (result > 0) {
          // toast 
          alert("삭제되었습니다");
          selectReplyList(); // 댓글 목록 갱신
        } else {
          // toast
          alert("삭제 실패");
        }
      })
      .catch(err => console.log(err));
  }
}

// 취소 누를경우, AccepBtn 에 있는 이벤트리스너 제거
function deleteEventListener(el) {
  let acceptBtn = $(el).parent().find(".acceptBtn")
  acceptBtn.off("click");
}


  // 댓글 수정 함수
  function updateReply(no, replyUpdateModal) {
    let replyUpdateModalBootStrap = bootstrap.Modal.getInstance(replyUpdateModal);
    let updateReplyContent = $("[name='update-reply-content']").val()

    if (loginUser == "") {
      toastPop("warn", "로그인 후 이용해주세요");
      return;
    }

    // 요청
    const request_url = ``;

    if (updateReplyContent.trim() != "") {
      console.log("댓글 no", no)
      console.log("댓글 내용", updateReplyContent)

      const data = {
        "replyContent": updateReplyContent,
        "replyNo": no
      };

      fetch("/reply", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(resp => resp.text())
        .then(result => {
          if (result > 0) {
            // bootstrap 모달 숨기기
            replyUpdateModalBootStrap.hide()
            // toast
            alert("댓글이 수정되었습니다.");
            selectReplyList();
          } else {
            // toast
            alert("댓글 수정 실패");
          }
        })
        .catch(err => console.log(err));


    } else {
      toastPop("warn", "댓글을 입력해주세요")
    }
  }

  function showUpdateReply(no, el) {

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
    replyUpdateModal.find(".acceptBtn").one("click", function () {
      updateReply(no, replyUpdateModal)
    })
  }

  // 댓글 목록 조회 함수
  function selectReplyList() {
    fetch("/reply?replyTypeNo=3&replyTargetNo=" + replyTargetNo) // GET방식은 주소에 파라미터를 담아서 전달
      .then(response => response.json()) // 응답객체 -> 파싱 
      .then(rList => {


        // 화면에 출력되어 있는 댓글 목록 삭제
        const replyList = document.getElementById("replyList");
        replyList.innerHTML = ''; // 기존 댓글 삭제


        // cList에 저장된 요소를 하나씩 접근
        for (let reply of rList) {
          if (reply.replyST == 'N') {

            // 행
            const replyRow = document.createElement("div");
            replyRow.classList.add("review-item");


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

            const userNickname = document.createElement("p");
            userNickname.innerText = reply.userNickname;

            const replyContent = document.createElement("p");
            replyContent.innerHTML = reply.replyContent;

            const ratingDiv = document.createElement("div");
            ratingDiv.classList.add("rating");
            ratingDiv.style.fontSize = "15px";
            ratingDiv.style.color = "orange";
            ratingDiv.innerText = `${'★'.repeat(reply.replyStar)}${'☆'.repeat(5 - reply.replyStar)}`;

            const reviewMeta = document.createElement("div");
            reviewMeta.classList.add("review-meta");
            reviewMeta.innerHTML = `
                    <span class="like">♥ 좋아요 ${reply.likes || 0}</span>
                    <span class="review-date"> ${reply.replyDT}</span>
                `;
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

            reviewContent.append(userNickname, replyContent, ratingDiv, reviewMeta);
            replyRow.append(userImageContainer, reviewContent);

            replyList.append(replyRow);
          } else {
            const li = document.createElement("li");
            li.innerText = " 삭제된 댓글 입니다. ";
            li.classList.add("reply-row");
            replyList.append(li);
          }
        }
      });
  }












// fetchPlaceDetails(mapId);

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