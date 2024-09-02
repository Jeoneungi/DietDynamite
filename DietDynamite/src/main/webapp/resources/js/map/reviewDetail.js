document.addEventListener('DOMContentLoaded', function() {
  const ratingStars = document.getElementById('rating-stars');
  let currentRating = 0; 

  function createStars() {
      ratingStars.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
          const star = document.createElement('span');
          star.className = 'star';
          star.innerText = '★'; // 전체 별
          star.dataset.rating = i;
          if (i <= currentRating) {
              star.classList.add('selected');
          }
          ratingStars.appendChild(star);
      }
  }

  ratingStars.addEventListener('click', function(e) {
      if (e.target.classList.contains('star')) {
          currentRating = parseInt(e.target.dataset.rating);
          createStars();
          console.log('Selected Rating:', currentRating);
      }
  });

  // 별점 차오르게 하는 함수 
  ratingStars.addEventListener('mouseover', function(e) {
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

  ratingStars.addEventListener('mouseleave', function() {
      Array.from(ratingStars.children).forEach(star => {
          star.classList.remove('hovered');
      });
  });

  createStars(); 
});


fetchPlaceDetails(mapId);

function fetchPlaceDetails(mapId) {
    let mapEl = document.getElementById("place-img");
    // 로딩 중 클래스 추가
    mapEl.classList.add("loading");

    fetch(`http://localhost:7000/api/crawling/kakoImageOnce?mapId=` + mapId)
    .then(response => response.json())
    .then(result => {
        console.log(result);

        // 이미지가 성공적으로 로드되면 로딩 중 클래스를 제거
        mapEl.classList.remove("loading");

        if (result.src) {
            const imageUrl = `https://${result.src}`;
            mapEl.style.backgroundImage = `url("${imageUrl}")`;

            // 이미지 URL이 "https://이미지가 없습니다"인 경우
            if (imageUrl.includes('https://이미지가 없습니다')) {
                mapEl.classList.add("error");
            }
        } else {
            // 이미지가 없을 경우 에러 클래스를 추가
            mapEl.classList.add("error");
        }

        mapEl.classList.add("place-img");
    })
    .catch(error => {
        console.error('가게 정보 조회 오류:', error);
        alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
        
        // 오류가 발생할 경우 로딩 중 클래스를 제거하고 에러 클래스를 추가
        mapEl.classList.remove("loading");
        mapEl.classList.add("error");
    });
}








