let map;
let markers = [];
let overlays = [];
let favoritePlaces = [];
let placeName = name || "Default Name";
let overlaysVisible = true;

function initMap() {
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new kakao.maps.LatLng(37.503325, 127.044034),
    level: 4
  };
  map = new kakao.maps.Map(mapContainer, mapOption);
  kakao.maps.event.addListener(map, 'click', toggleOverlays);
}

function searchPlaces() {
  const keyword = document.getElementById('keyword').value;
  if (!keyword.trim()) {
    alert("키워드를 입력하세요!");
    return;
  }

  const places = new kakao.maps.services.Places();
  places.keywordSearch(keyword, function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else {
      alert('검색 결과가 없습니다.');
    }
  }, {
    location: map.getCenter(),
    radius: 2000  // 반경 2km 내에서 검색
  });
}

function displayPlaces(places) {
  clearMarkersAndOverlays();

  const listEl = document.getElementById('result-list');
  listEl.innerHTML = '';
  listEl.style.display = "block";

  const scrollContainer = document.createElement('div');
  scrollContainer.classList.add('scroll-container');
  listEl.appendChild(scrollContainer);

  places.forEach((place) => {
    
    console.log(place)
    const position = new kakao.maps.LatLng(place.y, place.x);
    const marker = addMarker(position);
    markers.push(marker);

    const itemEl = document.createElement('div');
    itemEl.innerHTML = `
            <div class="place-item">
                <h3 >${place.place_name}</h3>
                <p>${place.address_name}</p>
                <p>${place.phone}</p>
            </div>`;

    itemEl.classList.add("place-item");

    scrollContainer.appendChild(itemEl);

    kakao.maps.event.addListener(marker, 'click', function () {
      displayPlaceInfo(place);
    });
  });

  if (places.length > 0) {
    const firstPlace = places[0];
    moveToLocation(firstPlace.y, firstPlace.x);
  }
}

function addMarker(position) {
  const marker = new kakao.maps.Marker({
    position: position,
    map: map
  });
  return marker;
}

function hideOverlays() {
  overlays.forEach(overlay => overlay.setMap(null));
  overlaysVisible = false;
}

function showOverlays() {
  overlays.forEach(overlay => overlay.setMap(map));
  overlaysVisible = true;
}

function toggleOverlays() {
  if (overlaysVisible) {
    hideOverlays();
  } else {
    showOverlays();
  }
}

async function displayPlaceInfo(place) {
  clearOverlays();  
  const content = `
      <div class="custom-overlay">
        <a href="/reviewDetail?id=${place.id}&name=${place.place_name}&address${place.address_name}">
          ${place.place_name}
        </a>
        <p>${place.address_name}</p>
        <p>${place.phone ? place.phone : '전화번호 없음'}</p>
        <button onclick="addFavorite('${place.place_name}', '${place.y}', '${place.x}', '${place.address_name}', '${place.phone}' )">즐겨찾기 추가</button>
        <div class="review-box">
          <h4>리뷰</h4>
          <div class="review-content">
            <div class="review-item">한줄 소개 리뷰</div>
            <div class="review-item">한줄 소개 리뷰</div>
            <div class="review-item">한줄 소개 리뷰</div>
            <div class="review-item">한줄 소개 리뷰</div>
            <div class="review-item">한줄 소개 리뷰</div>
          </div>
        </div>
      </div>
  `;

  const position = new kakao.maps.LatLng(place.y, place.x);
  const overlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
    yAnchor: 1
  });

  overlay.setMap(map);
  overlays.push(overlay);
}


function clearOverlays() {
  overlays.forEach(overlay => overlay.setMap(null));
  overlays = [];
}


function clearMarkersAndOverlays() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  clearOverlays();
}


// function showToast(message) {
//   const toast = new tui.ToastNotice();
//   toast.show({
//     title: '알림',
//     message: message,
//     duration: 3000, // 3초 동안 표시
//     position: 'top-right' // 위치 설정
//   });
// }

async function addFavorite(placeName, latitude, longitude, address,phone) {
  try {
    const response = await fetch('/rest/map/places/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: placeName,
        latitude: latitude,
        longitude: longitude,
        address: address,
        phone: phone
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      console.log('서버 응답:', result);

      favoritePlaces.push(placeName);

      const listEl = document.getElementById('favorites');
      const itemEl = document.createElement('li');
      itemEl.textContent = `내가 추가한 업체: ${placeName}`;
      listEl.appendChild(itemEl);


      // showToast(`즐겨찾기에 추가되었습니다: ${placeName}`);
      alert('즐겨찾기에 추가되었습니다.')
    } else {
      console.error('즐겨찾기 추가 실패:', response.statusText);
      alert("즐겨찾기 추가 중 문제가 발생했습니다.");
    }
  } catch (error) {
    console.error('오류 발생:', error);
    alert("즐겨찾기 추가 중 오류가 발생했습니다.");
  }
}

function moveToLocation(lat, lng) {
  const moveLatLon = new kakao.maps.LatLng(lat, lng);
  map.setCenter(moveLatLon);
}

document.addEventListener("DOMContentLoaded", function () {
  initMap();
  document.getElementById('searchBtn').addEventListener('click', searchPlaces);
});


function addReview(reviewText) {
  const reviewContent = document.querySelector('.review-content');
  const newReview = document.createElement('div');
  newReview.classList.add('review-item');
  newReview.textContent = reviewText;
  reviewContent.appendChild(newReview);
}

// window.onload = function () {
//   initMap();
//   document.getElementById('searchBtn').addEventListener('click', searchPlaces);
//   loadFavorites(); // 페이지 로드 시 즐겨찾기 불러오기
// };



