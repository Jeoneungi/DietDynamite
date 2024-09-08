let map;
let markers = [];
let overlays = [];
let favoritePlaces = [];
let placeName = name || "Default Name";
let overlaysVisible = true;
let currentPlaceIndex = 0;
let PLACES_BATCH_SIZE = 20;


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
            currentPlaceIndex = 0;
            markers = [];
            displayPlaces(data);
            (data)
        } else {
            alert('검색 결과가 없습니다.');
        }
    }, {
        location: map.getCenter(),
        radius: 1000
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

  loadMorePlaces(places, scrollContainer);

  scrollContainer.addEventListener('scroll', function () {
      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
          loadMorePlaces(places, scrollContainer);
      }
  });
}

function loadMorePlaces(places, scrollContainer) {
  const batchEnd = currentPlaceIndex + PLACES_BATCH_SIZE;

  for (; currentPlaceIndex < Math.min(batchEnd, places.length); currentPlaceIndex++) {
      const place = places[currentPlaceIndex];
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(position, place);  // place 정보를 추가로 전달
      markers.push(marker);

      const itemEl = document.createElement('div'); 
      itemEl.innerHTML = `
          <div class="place-item">
              <h3 class="fs-18">${place.place_name}</h3>
              <p>${place.address_name}</p>
              <p>${place.phone}</p>
          </div>`;

      itemEl.classList.add("place-item");
      scrollContainer.appendChild(itemEl);

      itemEl.addEventListener('click', function () {
          moveToLocation(place.y, place.x);
          displayPlaceInfo(place);  // 검색 목록에서 클릭 시 오버레이 표시
      });
  }
}


function addMarker(position, place) {

  const marker = new kakao.maps.Marker({
      position: position,
      map: map
  });

  // 마커 클릭 시 오버레이 표시
  kakao.maps.event.addListener(marker, 'click', function () {
      displayPlaceInfo(place);
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
  console.log(place)
  clearOverlays();
  const content = `
      <div class="custom-overlay">
          <a href="/map/reviewDetail?placeApiId=${place.id}&placeName=${place.place_name}&placeAddress=${place.address_name}&placePhone=${place.phone}">
              ${place.place_name}
          </a>
          <p>${place.address_name}</p>
          <p>${place.phone ? place.phone : '전화번호 없음'}</p>
          <button onclick="addFavorite('${place.place_name}', '${place.y}', '${place.x}', '${place.address_name}', '${place.phone}', '${place.id}',
                                       '${place.category_group_name}','${place.category_name}')">즐겨찾기 추가</button>
          <div class="review-box">
              <h4>리뷰</h4>
              <div class="review-content">
                  <div class="review-item">한줄 소개 리뷰</div>
                  <!-- ... -->
              </div>
          </div>
      </div>
  `;
  const position = new kakao.maps.LatLng(place.y, place.x);
  const overlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      yAnchor: 0.9,
      xAnchor: 0.5  // x,y 축을 설정하여 오버레이 위치 선택 가능 
  });

  overlay.setMap(map);
  overlays.push(overlay);

  adjustMapForOverlay(position);
}

function adjustMapForOverlay(overlayPosition) {
  const resultList = document.getElementById('result-list');
  const resultListRect = resultList.getBoundingClientRect();
  
  // 오버레이가 화면에서 잘 보이도록 지도 중심을 조정
  const mapCenter = map.getCenter();
  const mapBounds = map.getBounds();
  const overlayLatLng = new kakao.maps.LatLng(overlayPosition.getLat(), overlayPosition.getLng());
  
  // 화면 상단의 마진을 고려하여 오버레이가 result-list와 겹치지 않도록 조정
  if (resultListRect.top < window.innerHeight / 2) {
    // 오버레이가 result-list의 아래에 위치할 경우
    map.panTo(overlayLatLng);
  } else {
    // 오버레이가 result-list의 위에 위치할 경우
    map.panTo(overlayLatLng);
  }
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

async function addFavorite(placeName, latitude, longitude, address, phone, placeApiId, placeMajorCategory, placeMinorCategory) {
  try {
      const response = await fetch('/rest/map/places/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              placeApiId: placeApiId,
              placeName: placeName,
              placeLatitude: latitude,
              placeLongitude: longitude,
              placeAddress: address,
              placePhone: phone || "",
              placeMajorCategory: placeMajorCategory,
              placeMinorCategory: placeMinorCategory
          })
      });

      if (response.ok) {
          const result = await response.json();
          if (result > 0) {
              // UI에서 즉시 업데이트
              const listEl = document.getElementById('favorites');
              const itemEl = document.createElement('li');
              itemEl.dataset.placeApiId = placeApiId; // 고유 식별자 추가
              itemEl.innerHTML = `
                  <div class="place-item">
                      <h3 class="fs-18">${placeName}</h3>
                      <p>${address}</p>
                      <p>${phone ? phone : '전화번호 없음'}</p>
                      <button class="remove-btn" onclick="removeFavorite('${placeApiId}')">즐겨찾기 해제</button>
                  </div>`;
              listEl.appendChild(itemEl);

              // 즐겨찾기 목록에 추가
              favoritePlaces.push({
                  placeApiId: placeApiId,
                  placeName: placeName,
                  placeLatitude: latitude,
                  placeLongitude: longitude,
                  placeAddress: address,
                  placePhone: phone,
                  placeMajorCategory: placeMajorCategory,
                  placeMinorCategory: placeMinorCategory
              });

              alert('즐겨찾기에 추가되었습니다.');
          }
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

    document.getElementById('keyword').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchPlaces();
        }
    });

  document.getElementById('homeBtn').addEventListener('click', function () {
    initMap();
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.style.display = 'none';

    const resultlist = document.getElementById("result-list");
    resultlist.style.display = 'none';

  });

  document.getElementById('saveBtn').addEventListener('click', function () {
    const favoritesContainer = document.getElementById('favorites-container');
    if (favoritesContainer.style.display === 'none' || favoritesContainer.style.display === '') {
        favoritesContainer.style.display = 'block';
    } else {
        favoritesContainer.style.display = 'none';
    }
  });
  
  // 지도 홈 버튼 클릭 시 지도 초기화
  document.getElementById('homeBtn').addEventListener('click', function () {
    initMap();
  });

    loadFavorites(); 
});

function moveToLocation(lat, lng) {
  const moveLatLon = new kakao.maps.LatLng(lat, lng);
  map.panTo(moveLatLon);  // 부드럽게 지도 중심 이동
}



let currentFavoriteIndex = 0;
const FAVORITES_BATCH_SIZE = 20;

function displayFavorites(favorites) {
    const listEl = document.getElementById('favorites');
    listEl.innerHTML = '';  // 기존 목록 비우기

    const scrollContainer = document.createElement('div');
    scrollContainer.classList.add('scroll-container');
    listEl.appendChild(scrollContainer);

    loadMoreFavorites(favorites, scrollContainer);

    scrollContainer.addEventListener('scroll', function () {
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
            loadMoreFavorites(favorites, scrollContainer);
        }
    });
}

function loadMoreFavorites(favorites, scrollContainer) {
    const batchEnd = currentFavoriteIndex + FAVORITES_BATCH_SIZE;

    for (; currentFavoriteIndex < Math.min(batchEnd, favorites.length); currentFavoriteIndex++) {
        const favorite = favorites[currentFavoriteIndex];
        const itemEl = document.createElement('li');
        itemEl.innerHTML = `
            <div class="place-item">
                <h3 class="fs-18">${favorite.placeName}</h3>
                <p>${favorite.placeAddress}</p>
                <p>${favorite.placePhone ? favorite.placePhone : '전화번호 없음'}</p>
                <button class="remove-btn" onclick="removeFavorite('${favorite.placeApiId}')">즐겨찾기 해제</button>
            </div>
        `;
        scrollContainer.appendChild(itemEl);
    }
}

async function loadFavorites() {
  fetch('/rest/map/places/favorites')
      .then(response => response.json())
      .then(data => {
          const listEl = document.getElementById('favorites');
          listEl.innerHTML = '';

          data.forEach(place => {
              if (place) { // place가 null이 아닌지 확인
                  const itemEl = document.createElement('li');
                  itemEl.dataset.placeApiId = place.placeApiId; // 고유 식별자 추가
                  itemEl.innerHTML = `
                      <div class="place-item">
                          <h3 class="fs-18">${place.placeName}</h3>
                          <p>${place.placeAddress}</p>
                          <p>${place.placePhone ? place.placePhone : '전화번호 없음'}</p>
                          <button class="remove-btn" onclick="removeFavorite('${place.placeApiId}')">즐겨찾기 해제</button>
                      </div>`;
                  listEl.appendChild(itemEl);

                  itemEl.addEventListener('click', function () {
                      moveToLocation(place.placeLatitude, place.placeLongitude);
                      displayPlaceInfo({
                          place_name: place.placeName,
                          address_name: place.placeAddress,
                          phone: place.placePhone,
                          x: place.placeLongitude,
                          y: place.placeLatitude
                      });
                  });
              } else {
                  console.error('Null place object encountered:', place);
              }
          });
      })
      .catch(error => {
          console.error('즐겨찾기 불러오기 오류:', error);
          alert('즐겨찾기 데이터를 불러오는 중 오류가 발생했습니다.');
      });
}


async function removeFavorite(placeApiId) {
  try {
      const response = await fetch('/rest/map/places/remove', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ placeApiId })
      });

      if (response.ok) {
          const result = await response.json();
          if (result > 0) {
              // UI에서 제거
              const listEl = document.getElementById('favorites');
              const itemEl = Array.from(listEl.getElementsByTagName('li')).find(el => el.dataset.placeApiId === placeApiId);
              if (itemEl) {
                  itemEl.remove();
              }
              alert('즐겨찾기가 해제되었습니다.');
          } else {
              console.error('즐겨찾기 해제 실패:', response.statusText);
              alert("즐겨찾기 해제 중 문제가 발생했습니다.");
          }
      } else {
          console.error('즐겨찾기 해제 실패:', response.statusText);
          alert("즐겨찾기 해제 중 문제가 발생했습니다.");
      }
  } catch (error) {
      console.error('오류 발생:', error);
      alert("즐겨찾기 해제 중 오류가 발생했습니다.");
  }
}





