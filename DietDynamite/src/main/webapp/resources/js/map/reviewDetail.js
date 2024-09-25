
document.addEventListener('DOMContentLoaded', function () {

  const ratingStars = document.getElementById('rating-stars'); // 별점 요소 가져오기
  let currentRating = 0; // 현재 별점 저장 변수
  selectReplyList(); // 댓글 목록 조회 초기 실행

  // ratingStars 요소가 존재하는지 확인
  if (!ratingStars) {
    console.error('ratingStars 요소를 찾을 수 없습니다!'); // 요소가 없을 경우 에러 출력
    return;
  }

  // 별 생성 함수
  function createStars() {
    ratingStars.innerHTML = ''; // 기존 별 제거
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span'); // 새로운 별 요소 생성
      star.className = 'star';
      star.innerText = '★'; // 별 모양 텍스트
      star.dataset.rating = i; // 데이터 속성에 별점 저장
      if (i <= currentRating) { // 현재 별점에 따라 선택된 별 표시
        star.classList.add('selected');
      }
      ratingStars.appendChild(star); // 별을 ratingStars에 추가
    }
  }

  // 별 클릭 이벤트 처리
  ratingStars.addEventListener('click', function (e) {
    if (e.target.classList.contains('star')) { // 클릭된 요소가 별인지 확인
      currentRating = parseInt(e.target.dataset.rating); // 선택된 별점 저장
      console.log('Selected Rating:', currentRating); // 콘솔에 선택된 별점 출력

      // 모달 창 열기 및 선택된 별점 반영
      openModal(currentRating);
    }
  });

  // 모달 창에서 별점 생성 함수
  function createModalStars(rating) {
    const modalRatingStars = document.getElementById('modal-rating-stars'); // 모달 내 별점 요소 가져오기
    modalRatingStars.innerHTML = ''; // 기존 별 제거
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span'); // 새로운 별 요소 생성
      star.className = 'star';
      star.innerText = '★'; // 별 모양 텍스트
      star.dataset.rating = i; // 데이터 속성에 별점 저장
      if (i <= rating) { // 현재 별점에 따라 선택된 별 표시
        star.classList.add('selected');
      }
      modalRatingStars.appendChild(star); // 별을 모달에 추가
    }

    // 모달 내 별점 클릭 이벤트 처리
    modalRatingStars.addEventListener('click', (e) => {
      if (e.target.classList.contains('star')) { // 클릭된 요소가 별인지 확인
        e.stopPropagation(); // 이벤트 전파 중지
        currentRating = parseInt(e.target.dataset.rating); // 선택된 별점 저장
        createModalStars(currentRating); // 모달 내 별점 업데이트
        console.log('Selected Rating in Modal:', currentRating); // 콘솔에 선택된 별점 출력
      }
    }, { once: true }); // 이벤트를 한 번만 실행하도록 설정
  }

  // 모달 열기
  function openModal(rating) {
    if (!loginUser) { // 로그인 상태 확인
      alert("로그인 해주세요"); // 로그인 요청
      window.location.href = "/user/login"; // 로그인 페이지로 리다이렉션
      return;
    }

    const modal = document.getElementById('rating-modal'); // 모달 요소 가져오기
    modal.style.display = 'block'; // 모달 표시
    createModalStars(rating); // 선택된 별점으로 모달 내 별점 생성
  }

  // 별점 호버링 이벤트 처리
  ratingStars.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('star')) { // 호버된 요소가 별인지 확인
      const rating = parseInt(e.target.dataset.rating); // 호버된 별점 가져오기
      Array.from(ratingStars.children).forEach(star => {
        if (parseInt(star.dataset.rating) <= rating) {
          star.classList.add('hovered'); // 호버된 별점까지 스타일 추가
        } else {
          star.classList.remove('hovered'); // 호버된 별점 이하는 스타일 제거
        }
      });
    }
  });

  // 별점에서 마우스가 떠났을 때 처리
  ratingStars.addEventListener('mouseleave', function () {
    Array.from(ratingStars.children).forEach(star => {
      star.classList.remove('hovered'); // 모든 별의 호버 스타일 제거
    });
  });

  // 초기 별 생성
  createStars();

  // 모달 닫기 함수
  function closeModal() {
    const modal = document.getElementById('rating-modal'); // 모달 요소 가져오기
    if (!modal) {
      console.error('모달 요소를 찾을 수 없습니다!'); // 모달 요소 없을 경우 에러 출력
      return;
    }
    modal.style.display = 'none'; // 모달 숨기기
  }

  // 별점 제출 함수
  function submitRating() {
    closeModal(); // 모달 닫기
    // 리뷰 내용 가져오기
    const reviewContent = document.getElementById('review-content'); // 리뷰 내용 요소 가져오기

    console.log(replyTargetNo); // 타겟 댓글 번호 출력
    console.log(loginUserNo); // 로그인 사용자 번호 출력
    console.log(currentRating); // 현재 선택된 별점 출력

    // 2) 댓글 내용이 작성되어있나?
    if (reviewContent.value.trim().length == 0) { // 미작성인 경우
      alert("댓글을 작성한 후 버튼을 클릭해주세요."); // 댓글 미작성 경고
      reviewContent.value = ""; // 댓글 내용 초기화
      return;
    }

    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)
    const data = {
      "replyContent": reviewContent.value, // 댓글 내용
      "replyTypeNo": 3, // 댓글 타입
      "replyTargetNo": replyTargetNo, // 타겟 댓글 번호
      "replyStar": currentRating, // 선택된 별점
      "userNo": loginUserNo // 로그인 사용자 번호
    };

    fetch("/reply", {
      method: "POST", // POST 요청
      headers: { "Content-Type": "application/json" }, // 헤더 설정
      body: JSON.stringify(data) // 데이터 JSON 형태로 변환
    })
      .then(response => response.text()) // 응답을 텍스트로 변환
      .then(result => {
        if (result > 0) { // 성공적으로 등록된 경우
          alert("리뷰가 등록되었습니다."); // 성공 메시지
          reviewContent.value = ""; // 댓글 초기화
          selectReplyList(); // 댓글 목록 갱신
        } else {
          alert("리뷰 등록에 실패했습니다..."); // 실패 메시지
        }
      })
      .catch(err => console.log(err)); // 오류 출력

    // 모달 닫기
    closeModal();
  }

  // 모달 닫기 버튼
  const closeBtn = document.getElementById('cancel-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal(); // 모달 닫기

      // toast 쓸꺼
      alert("댓글을 취소하시겠습니까?"); // 취소 확인 메시지
      window.location.reload(); // 페이지 리로드
    });
  }

  // 제출 버튼 클릭 시
  const submitBtn = document.getElementById('submit-button');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitRating); // 제출 버튼 클릭 시 submitRating 호출
  }

  $(document).ready(async function () {
    // 현재 장소의 API ID를 가져와 즐겨찾기 여부를 확인
    const placeApiId = $('#favorite-btn').data('place-api-id');

    // 페이지 로드 시 해당 장소가 즐겨찾기에 있는지 확인
    let isFavorite = await checkIfFavorite(placeApiId);
    updateFavoriteIcon(isFavorite); // 아이콘 초기화

    // 즐겨찾기 버튼 클릭 이벤트 처리
    $('#favorite-btn').click(async function () {
      const place = {
        placeName: $(this).data('place-name'),
        placeLongitude: $(this).data('place-longitude'),
        placeLatitude: $(this).data('place-latitude'),
        placeAddress: $(this).data('place-address'),
        placePhone: $(this).data('place-phone'),
        placeApiId: $(this).data('place-api-id'),
        placeMajorCategory: $(this).data('place-major-category'),
        placeMinorCategory: $(this).data('place-minor-category'),
      };

      // 즐겨찾기 상태에 따라 추가/삭제
      if (isFavorite) {
        await removeFavorite(place.placeApiId);
      } else {
        await addFavorite(place);
      }

      // 즐겨찾기 상태를 반대로 업데이트하고 아이콘 변경
      isFavorite = !isFavorite;
      updateFavoriteIcon(isFavorite);
    });
  });

  // 즐겨찾기 여부 확인 함수
  async function checkIfFavorite(placeApiId) {
    try {
      const response = await fetch('/rest/map/places/favorites');
      const result = await response.json();

      // 결과에서 해당 placeApiId가 존재하는지 확인
      return result.some(place => place.placeApiId === placeApiId); // 있으면 true, 없으면 false 반환
    } catch (error) {
      console.error('즐겨찾기 확인 중 오류 발생:', error);
      return false; // 오류 발생 시 기본적으로 false 반환
    }
  }

  // 즐겨찾기 추가 함수
  async function addFavorite(place) {
    try {
      const response = await fetch('/rest/map/places/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(place)
      });

      if (response.ok) {
        alert('즐겨찾기에 추가되었습니다.');
      } else {
        alert('즐겨찾기 추가 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생:', error);
      alert('즐겨찾기 추가 중 오류가 발생했습니다.');
    }
  }

  // 즐겨찾기 해제 함수
  async function removeFavorite(placeApiId) {
    try {
      const response = await fetch('/rest/map/places/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeApiId })
      });

      if (response.ok) {
        alert('즐겨찾기가 해제되었습니다.');
      } else {
        throw new Error('즐겨찾기 해제에 실패했습니다.');
      }
    } catch (error) {
      console.error('즐겨찾기 해제 중 오류 발생:', error);
      alert('즐겨찾기 해제 중 오류가 발생했습니다. 오류 메시지: ' + error.message);
    }
  }

  // 즐겨찾기 아이콘 업데이트 함수
  function updateFavoriteIcon(isFavorite) {
    const icon = $('#favorite-btn').find('i');
    if (isFavorite) {
      icon.removeClass('fa-regular').addClass('fa-solid');
    } else {
      icon.removeClass('fa-solid').addClass('fa-regular');
    }
  }


});

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


          if (reply.replyCheck > 0) {
            reviewMeta.innerHTML = `<i class="fa-solid fa-heart like" id="boardLike${reply.replyNo}" onclick="readyLike('${reply.replyNo}')"></i>`;
          } else {
            reviewMeta.innerHTML = `<i class="fa-regular fa-heart like" id="boardLike${reply.replyNo}" onclick="readyLike('${reply.replyNo}')"></i>`;
          }   
           reviewMeta.innerHTML += `
            <span class="like">${reply.replyLike || 0}</span>
            <span class="review-date">${reply.replyDT}</span>
          `;

          if (loginUserNo == reply.userNo) {
            const updateBtn = document.createElement("button");
            updateBtn.innerText = "수정";
            updateBtn.setAttribute("onclick", `showUpdateReply(${reply.replyNo}, this)`);
            
            // data-reply-star 속성을 추가
            updateBtn.setAttribute("data-reply-star", reply.replyStar); 

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

// 댓글 수정 모달이 보이는 함수 
function showUpdateReply(no, el) {
  let replyUpdateModal = $('#updateModal');
  let currentStars = $(el).data('reply-star');
  let modalRatingStars = '';

  // 별점 초기화 (기존 별점을 반영하여 채워진 상태로 별점 생성)
  for (let i = 1; i <= 5; i++) {
    modalRatingStars += `<span class="star ${i <= currentStars ? 'selected' : ''}" data-star="${i}">★</span>`;
  }



  // 모달에 별점 및 댓글 수정 내용을 추가
  replyUpdateModal.find(".modal-title").html(`<p class="fs-14 fc__white">댓글 수정</p>`);
  replyUpdateModal.find(".modal-body").html(`
      <div class="modal-row">
          <div class="rating" id="modal-rating-stars">
              ${modalRatingStars} <!-- 별점이 채워진 상태로 표시 -->
          </div>
          <textarea name="update-reply-content" rows="5" cols="30" placeholder="수정할 댓글을 입력해주세요" style="resize: none;"></textarea>
      </div>
      <div class="modal-btns">
          <button class="btn-medium__lorange acceptBtn"> 확인 </button>
          <button class="btn-medium__gray cancelBtn" data-bs-dismiss="modal" onclick="deleteEventListener(this)"> 취소 </button>
      </div>
  `);

  // 별점 클릭 시 별점 변경 반영
  $('#modal-rating-stars .star').on("click", function () {
    let selectedStar = $(this).data('star');
    
    // 별점 반영
    $('#modal-rating-stars .star').each(function (index) {
      $(this).toggleClass('selected', index < selectedStar);
    });

  });

  // 모달 보이기
  replyUpdateModal.modal('show');

  // 모달에서 확인 버튼 클릭 이벤트 (한 번만 실행되도록 설정)
  replyUpdateModal.find(".acceptBtn").one("click", function () {
    updateReply(no, replyUpdateModal);
  });
}

// 댓글 수정 함수
function updateReply(no, replyUpdateModal) {
  let replyUpdateModalBootStrap = bootstrap.Modal.getInstance(replyUpdateModal);
  let updateReplyContent = $("[name='update-reply-content']").val();
  let updateReplyStar = $('#modal-rating-stars .star.selected').length; // 선택된 별점 개수

  if (loginUser === "") {
    toastPop("warn", "로그인 후 이용해주세요");
    return;
  }

  // 요청할 URL
  const request_url = `/replyStar`;

  if (updateReplyContent.trim() != "") {
    console.log("댓글 no", no);
    console.log("댓글 내용", updateReplyContent);
    console.log("선택한 별점", updateReplyStar);

    const data = {
      "replyContent": updateReplyContent,
      "replyNo": no,
      "replyStar": updateReplyStar // 선택된 별점 값 서버로 전송
    };

    fetch(request_url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(resp => resp.text())
      .then(result => {
        if (result > 0) {
          // bootstrap 모달 숨기기
          replyUpdateModalBootStrap.hide();
          alert("댓글이 수정되었습니다.");
          selectReplyList();
        } else {
          alert("댓글 수정 실패");
        }
      })
      .catch(err => console.log(err));
  } else {
    toastPop("warn", "댓글을 입력해주세요");
  }
}

// 댓글 삭제 
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
      boardType: 3,
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

// 댓글 개수 
function updateReviewCount(replyTargetNo) {
  // 서버에서 리뷰 개수를 가져오는 Ajax 요청
  fetch(`/reply/count/${replyTargetNo}`)
      .then(response => {
        console.log(response)
          if (!response.ok) {
              throw new Error('네트워크 응답이 좋지 않습니다.');
          }
          return response.json(); // JSON 응답으로 변환
      })
      .then(count => {
          // 가져온 리뷰 개수를 HTML 요소에 업데이트
          document.getElementById('review-count-value').innerText = count;
      })
      .catch(error => {
          console.error('문제가 발생했습니다:', error);
      });
}
updateReviewCount(replyTargetNo);

// 취소 누를경우, AccepBtn 에 있는 이벤트리스너 제거
function deleteEventListener(el) {
  let acceptBtn = $(el).parent().find(".acceptBtn")
  acceptBtn.off("click");
}

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

