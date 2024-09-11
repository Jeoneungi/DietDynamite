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
    const modalRating = document.getElementById('modal-rating');
    modalRating.innerText = rating; // 선택된 별점 수를 모달에 표시
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
    const reviewContent = document.getElementById('review-content').value;

    // 리뷰 데이터 생성 (예시)
    const newReview = {
      content: reviewContent,
      rating: currentRating,
      // ... 다른 정보 (작성 시간, 사용자 정보 등)
    };

    // 서버에 전송 (예시 - fetch API 사용)
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then(response => response.json())
      .then(data => {
        // 서버에서 반환된 데이터 처리
        console.log('리뷰 등록 성공:', data);
        // 화면 업데이트
        updateReviewList(data);
      })
      .catch(error => {
        console.error('리뷰 등록 실패:', error);
      });

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
  fetch(`http://localhost:7000/api/crawling/kakoImageOnce?mapId=${mapId}`)
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
