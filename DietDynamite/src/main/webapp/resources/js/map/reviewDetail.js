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


function fetchPlaceDetails(mapId) {
    fetch(`http://localhost:7000/api/crawling/kakaoImage?mapId=` + mapId)
    .then(response => response.json())
    .then(result => {

      console.log(result)
      let mapEl = document.getElementById("place-img")
      mapEl.style.backgroundImage = `url("https://${result.src}")`;
      mapEl.classList.add("place-img");

      document.getElementById("place-name").textContent = `${result.place.name}`;
      document.getElementById("place-address").textContent = `${result}`;
      document.getElementById("place-phone").textContent ="${result}";
    
    })
    .catch(error => {
        console.error('가게 정보 조회 오류:', error);
        alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
    });
}

fetchPlaceDetails(mapId)


