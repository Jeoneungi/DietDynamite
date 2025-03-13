let map;
let markers = [];
let overlays = [];
let favoritePlaces = [];
let overlaysVisible = true;
let currentPlaceIndex = 0;
const PLACES_BATCH_SIZE = 20;
const FAVORITES_BATCH_SIZE = 20;
const reviewContentDiv = document.querySelector(".review-content");

document.addEventListener("DOMContentLoaded", async function () {
  await loadFavorites(); // 즐겨찾기 로드가 완료될 때까지 대기
  initMap();
  
  document.getElementById('searchBtn').addEventListener('click', searchPlaces);
  document.getElementById('keyword').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      searchPlaces();
    }
  });

  // 지도 홈 버튼 클릭 시 지도 초기화
  document.getElementById('homeBtn').addEventListener('click', function () {
    initMap();
  });
});

document.getElementById('saveBtn').addEventListener('click', function () {
  if (loginUser === '') {
    // 로그인 상태가 아닐 경우 로그인 페이지로 이동
    window.location.href = "/user/login"; // 로그인 페이지 URL로 변경
  } else {
    const favoritesContainer = document.getElementById('favorites-container');
    const scrollContainer = document.querySelector('.scroll-container');

    // 즐겨찾기 목록 표시 및 스크롤 컨테이너 숨김
    if (favoritesContainer.style.display === 'none' || favoritesContainer.style.display === '') {
      favoritesContainer.style.display = 'block'; // 즐겨찾기 목록 보이기
      scrollContainer.style.display = 'none'; // 스크롤 컨테이너 숨기기
    } else {
      favoritesContainer.style.display = 'none'; // 즐겨찾기 목록 숨기기
      scrollContainer.style.display = 'block'; // 스크롤 컨테이너 보이기
    }
  }
});

// 지도 호출 함수
function initMap() {
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new kakao.maps.LatLng(37.564214, 127.001699), // 기본 좌표 (서울)
    level: 4
  };
  map = new kakao.maps.Map(mapContainer, mapOption);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;
        const currentPosition = new kakao.maps.LatLng(currentLat, currentLon);
        map.setCenter(currentPosition);  // 사용자 위치로 지도 중심 설정
      },
      function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          alert("위치 정보 접근이 거부되었습니다. 기본 위치(서울)로 설정됩니다.");
        } else {
          alert("위치 정보를 가져오는 데 실패했습니다. 기본 위치로 설정됩니다.");
        }
      }
    );
  } else {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
  }
}

function addMarker(position, place) {
  const marker = new kakao.maps.Marker({
    position: position,
    map: map
  });
  kakao.maps.event.addListener(marker, 'click', function () {
    displayPlaceInfo(place);
  });
  return marker;
}



// 검색 창 함수 
function searchPlaces() {
  const keyword = document.getElementById('keyword').value;
  if (!keyword.trim()) {
    alert("키워드를 입력하세요!");
    return;
  }

  // 기본 위치 (서울) 설정
  const defaultLatLng = new kakao.maps.LatLng(37.564214, 127.001699);

  // 사용자의 현재 위치를 가져오거나 기본 위치 사용
  let currentPosition = defaultLatLng; // 기본값으로 서울 설정
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        currentPosition = new kakao.maps.LatLng(lat, lon); // GPS 성공 시 업데이트
        performSearch(currentPosition, keyword);
      },
      function (error) {
        console.log("GPS 오류:", error);
        performSearch(defaultLatLng, keyword); // GPS 실패 시 기본 위치 사용
      }
    );
  } else {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다. 기본 위치(서울)로 검색을 진행합니다.");
    performSearch(defaultLatLng, keyword); // GPS 미지원 시 기본 위치 사용
  }
}

// 검색 수행 함수 (중복 로직 분리)
function performSearch(position, keyword) {
  const searchOptions = { location: position, radius: 1000 }; // 1km 반경
  const places = new kakao.maps.services.Places();

  // 기존 마커 및 오버레이 제거 (가정: clearMarkersAndOverlays 함수 존재)
  clearMarkersAndOverlays();

  // 1km 반경 내 검색
  places.keywordSearch(keyword, function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
      // 현재 장소 인덱스와 마커 배열 초기화 (가정: 전역 변수)
      currentPlaceIndex = 0;
      markers = [];

      // 검색 결과 표시
      displayPlaces(data);
      console.log("데이터가 뭐라고 뜰까? : ", data);

      // 첫 번째 장소로 지도 이동
      const firstPlace = data[0];
      const firstPlacePosition = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
      map.panTo(firstPlacePosition); // map은 전역 변수로 가정

      // 장소 ID 및 이름 저장
      const placeIds = data.map(place => ({
        placeAPIid: place.id,
        placeName: place.place_name
      }));

      // 장소 데이터 처리 (가정: processPlaceData 함수 존재)
      processPlaceData(placeIds);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 1km 범위 내 결과가 없으면 전체 범위로 재검색
      console.log("1km 내에 검색 결과가 없습니다. 전체 범위로 확장하여 재검색합니다.");
      places.keywordSearch(keyword, function (data, status) {
        if (status === kakao.maps.services.Status.OK) {
          currentPlaceIndex = 0;
          markers = [];
          displayPlaces(data);

          // 첫 번째 장소로 지도 이동
          const firstPlace = data[0];
          const firstPlacePosition = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
          map.panTo(firstPlacePosition);

          const placeIds = data.map(place => ({
            placeAPIid: place.id,
            placeName: place.place_name
          }));

          processPlaceData(placeIds);
        } else {
          alert('전체 범위에서도 검색 결과가 없습니다.');
        }
      });
    } else {
      alert('검색 중 오류가 발생했습니다.');
    }
  }, searchOptions);
}



 // 즐겨찾기 로드 함수
async function loadFavorites() {
  try {
    const response = await fetch('/rest/map/places/favorites');
    const data = await response.json();
    const listEl = document.getElementById('favorites');
    listEl.innerHTML = ''; // 기존 내용 지우기

    // 즐겨찾기 데이터 저장
    favoritePlaces = data;

    // console.log(favoritePlaces);

    if (data.length === 0) {
      // 데이터가 없을 경우 메시지 표시
      listEl.innerHTML = '<p>데이터가 없습니다.</p>';
    } else {
      data.forEach(place => {
        if (place) { // place가 null이 아닌지 확인
          const itemEl = document.createElement('li');
          itemEl.dataset.placeApiId = place.placeApiId; // 고유 식별자 추가
          itemEl.innerHTML = `
            <div class="place-item">
                <h3 class="fs-18">${place.placeName}</h3>
                <p>${place.placeAddress}</p>
                <p>${place.placePhone ? place.placePhone : '전화번호 없음'}</p>
                <button class="remove-btn" onclick="removeFavorite('${place.placeApiId}', this)">
                    <i class="fas fa-heart-broken"></i> 즐겨찾기 해제
                </button>
            </div>`;

          listEl.appendChild(itemEl);

          itemEl.addEventListener('click', function () {
            moveToLocation(place.placeLatitude, place.placeLongitude);
            displayPlaceInfo({
              place_name: place.placeName,
              address_name: place.placeAddress,
              phone: place.placePhone,
              x: place.placeLongitude,
              y: place.placeLatitude,
              id: place.placeApiId
            });
          });
        } else {
          console.error('Null place object encountered:', place);
        }
      });
    }
  } catch (error) {
    console.error('즐겨찾기 불러오기 오류:', error);
    alert('즐겨찾기 데이터를 불러오는 중 오류가 발생했습니다.');
  }
}

// 검색 후 즐겨찾기 여부를 판단하고 오버레이 나타나는 함수 
async function displayPlaceInfo(place) {
  clearOverlays(); // 기존 오버레이 삭제
  const replyTypeNo = 3; // 댓글 유형 번호
  const reply = await getReplyForPlace(place.id, replyTypeNo); // 장소에 대한 댓글 가져오기

  // 즐겨찾기 상태 확인
  let isFavorite = favoritePlaces.some(fav => String(fav.placeApiId) === String(place.id));

  // console.log('place.id:', place.id);
  // console.log("즐겨찾기 여부 " + isFavorite);

  let buttonContent = '';

  // 로그인 상태에 따라 버튼 설정
  if (loginUser) {
    // 즐겨찾기 상태에 따라 버튼 내용 결정
    if (isFavorite) {
      buttonContent = `
          <button id="favorite-btn" class="remove-btn" onclick="removeFavorite('${place.id}', this)">
              <i class="fas fa-heart-broken"></i> 즐겨찾기 해제
          </button>
      `;
    } else {
      buttonContent = `
          <button id="favorite-btn" class="add-btn" onclick="addFavorite('${place.place_name}','${place.y}','${place.x}','${place.address_name}','${place.phone}','${place.id}','${place.category_group_name}','${place.category_name}', this)">
              <i class="fas fa-heart"></i> 즐겨찾기 추가
          </button>
      `;
    }
  } else {
    buttonContent = `<p>로그인 후 즐겨찾기를 추가할 수 있습니다.</p>`;
  }

  // 오버레이에 표시할 내용 생성
  const content = `
      <div class="custom-overlay">
          <a href="/map/reviewDetail?placeApiId=${place.id}&placeName=${place.place_name}&placeAddress=${place.address_name}&placePhone=${place.phone}&placeMajorCategory=${place.category_group_name}&placeMinorCategory=${place.category_name}&placeLatitude=${place.y}&placeLongitude=${place.x}">
              ${place.place_name}
          </a>

          <p>${place.address_name}</p>
          <p>${place.phone ? place.phone : '전화번호 없음'}</p>
          ${buttonContent} <!-- 버튼 내용 삽입 -->
          <div class="review-box">
              <h4>리뷰</h4>
              <div class="review-content">
                  ${reply}  <!-- 여기에 리뷰가 표시됩니다 -->
              </div>
          </div>
      </div>
  `;

  // 오버레이 생성 및 지도에 추가
  const position = new kakao.maps.LatLng(place.y, place.x);
  const overlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
    yAnchor: 0.7,
    xAnchor: 0.3
  });

  overlay.setMap(map); // 지도에 오버레이 표시
  overlays.push(overlay); // 오버레이 목록에 추가
  adjustMapForOverlay(position); // 오버레이 위치 조정
}


// 즐겨찾기 추가 함수 
async function addFavorite(placeName, latitude, longitude, address, phone, placeApiId, placeMajorCategory, placeMinorCategory, button) {
  try {
    const response = await fetch('/rest/map/places/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        placeApiId,
        placeName,
        placeLatitude: latitude,
        placeLongitude: longitude,
        placeAddress: address,
        placePhone: phone || "", // 전화번호가 없을 경우 빈 문자열 처리
        placeMajorCategory,
        placeMinorCategory
      })
    });

    if (response.ok) {
      const result = await response.json();

      if (result == -1) {
        // result가 -1이면 이미 즐겨찾기에 있음 -> 해제 함수 호출
        await removeFavorite(placeApiId, button);
      } else {
        // 즐겨찾기 리스트에 장소 추가
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

      // 버튼 상태 업데이트: 버튼 이벤트를 "해제"로 바꾸기
      button.classList.remove('add-btn');
      button.classList.add('remove-btn');
      button.innerHTML = '<i class="fas fa-heart-broken"></i> 즐겨찾기 해제';

        alert('즐겨찾기에 추가되었습니다.');
      }
    } else {
      alert("즐겨찾기 추가 중 문제가 발생했습니다.");
    }
  } catch (error) {
    console.error('오류 발생:', error);
    alert("즐겨찾기 추가 중 오류가 발생했습니다.");
  }
}

// 즐겨찾기 해제 함수
async function removeFavorite(placeApiId, button) {
  try {
    const response = await fetch('/rest/map/places/remove', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeApiId })
    });

    if (response.ok) {
      // 즐겨찾기 목록에서 해당 장소 삭제
      favoritePlaces = favoritePlaces.filter(place => place.placeApiId !== placeApiId);
      
      // 버튼 상태 업데이트
      button.classList.remove('remove-btn');
      button.classList.add('add-btn');
      button.innerHTML = '<i class="fas fa-heart"></i> 즐겨찾기 추가'; // 내용 업데이트

      // DOM에서 해당 아이템 삭제 (리스트에서도 삭제)
      const itemEl = document.querySelector(`[data-place-api-id="${placeApiId}"]`);
      if (itemEl) {
        itemEl.remove();  // DOM에서 해당 요소 제거
      }

      alert('즐겨찾기가 해제되었습니다.');
    } else {
      throw new Error('즐겨찾기 해제에 실패했습니다.');
    }
  } catch (error) {
    console.error('오류 발생:', error);
    alert('즐겨찾기 해제 중 오류가 발생했습니다. 오류 메시지: ' + error.message);
  }
}


// 서버로 장소 정보를 저장하는 함수
function savePlaceInfo(placeIds) {
  return fetch('/rest/map/places/saveInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(placeIds)
  });
}

// 서버로 장소 이미지 상태를 가져오는 함수 (이미지가 존재하는지 여부 확인)
async function fetchPlaceImageStatus(placeIds) {
  const response = await fetch('/rest/map/places/findImageStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(placeIds) // 장소 ID 목록 전송
  });
  return await response.json(); // 장소별 이미지 상태 반환 (예: { placeAPIid: '123', placeImg: null 또는 'imgUrl' })
}

// 크롤링 및 이미지 업데이트 요청 함수
function crawlAndUpdateImages(placeIdsToCrawl) {
  placeIdsToCrawl.forEach(place => {
    const placeAPIid = place.placeAPIid;
    const placeName = place.placeName;
    const request_url = `http://localhost:7000/api/crawling/kakaoImage?mapId=${placeAPIid}&mapName=${placeName}`;

    $.ajax({
      type: "GET",
      url: request_url,
      dataType: "json",
      success: function (res) {
        console.log(`크롤링 결과 (placeAPIid: ${placeAPIid}): `, res);
        if (res.src && res.src !== "0") {
          fetch('/rest/map/places/updateImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              placeAPIid: placeAPIid,
              placeName: placeName,
              placeImg: res.src
            })
          })
            .then(response => response.text())
            .then(msg => {
              console.log(`이미지 업데이트 완료: ${placeAPIid}, 응답: ${msg}`);
            })
            .catch(error => {
              console.error(`이미지 업데이트 오류 (placeAPIid: ${placeAPIid}):`, error);
            });
        } else {
          console.log(`이미지 없음 (placeAPIid: ${placeAPIid}): ${res.src}`);
        }
      },
      error: function (err) {
        console.error(`크롤링 오류 (placeAPIid: ${placeAPIid}):`, err);
      }
    });
  });
}

// 장소 정보를 저장하고 이미지를 처리하는 메인 함수
function processPlaceData(placeIds) {
  savePlaceInfo(placeIds)
    .then(() => {
      console.log("장소 정보 저장 완료");

      // 저장 후 이미지 상태 확인
      fetchPlaceImageStatus(placeIds)
        .then(result => {
          console.log("이미지 상태 결과:", result);

          // 크롤링이 필요한 장소들 필터링 (이미지 값이 null인 곳만 크롤링)
          const placeIdsToCrawl = placeIds.filter(place =>
            result.some(existingPlace =>
              place.placeAPIid && !existingPlace.placeImg // 이미지가 null인 경우만 필터링
            )
          ).map(place => ({
            placeAPIid: place.placeAPIid,
            placeName: place.placeName
          }));

          // 크롤링할 장소가 있으면 크롤링 및 업데이트 진행
          if (placeIdsToCrawl.length > 0) {
            crawlAndUpdateImages(placeIdsToCrawl);
          } else {
            console.log("이미지가 이미 존재해 크롤링 서버로 요청을 안 합니다.");
          }
        })
        .catch(error => console.error('이미지 상태 확인 중 오류 발생:', error));
    })
    .catch(error => console.error('장소 저장 중 오류 발생:', error));
}


function displayPlaces(places) {

  clearMarkersAndOverlays();

  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.style.display = "block"; // favorites-container 보이기

  const listEl = document.getElementById('result-list');
  listEl.innerHTML = '';
  listEl.style.display = "block"; // result-list 보이기

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
    const marker = addMarker(position, place);
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
      displayPlaceInfo(place);
    });
  }
}

function addMarker(position, place) {
  const marker = new kakao.maps.Marker({
    position: position,
    map: map
  });
  kakao.maps.event.addListener(marker, 'click', function () {
    displayPlaceInfo(place);
  });
  return marker;
}

function toggleOverlays() {
  overlaysVisible ? hideOverlays() : showOverlays();
}

function hideOverlays() {
  overlays.forEach(overlay => overlay.setMap(null));
  overlaysVisible = false;
}

function showOverlays() {
  overlays.forEach(overlay => overlay.setMap(map));
  overlaysVisible = true;
}

async function getReplyForPlace(placeApiId, replyTypeNo) {
  try {
    const response = await fetch(`/reply?replyTypeNo=${replyTypeNo}&replyTargetNo=${placeApiId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    console.log('서버 응답 데이터:', data); // 응답 데이터 확인

    if (Array.isArray(data) && data.length > 0) {
      // data가 배열일 경우, 각 리뷰의 내용을 HTML로 변환
      return data.map(reply => {
        if (reply.replyST === 'N') { // 승인된 리뷰만 표시
          return `
            <div class="review-item">
              <span class="user-nickname">${reply.userNickname}:</span>
              <span class="reply-content">${reply.replyContent}</span>
            </div>`;
        }
        return ''; // 승인되지 않은 리뷰는 빈 문자열 반환
      }).join('');
    } else {
      return '리뷰가 없습니다.'; // 리뷰가 없는 경우
    }
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류가 발생했습니다:', error);
    return '리뷰를 가져오는 중 오류가 발생했습니다.'; // 오류 메시지 반환
  }
}


function adjustMapForOverlay(overlayPosition) {
  clearMarkersAndOverlays
  map.panTo(new kakao.maps.LatLng(overlayPosition.getLat(), overlayPosition.getLng()));
}

function clearMarkersAndOverlays() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  clearOverlays();
}

function clearOverlays() {
  overlays.forEach(overlay => overlay.setMap(null));
  overlays = [];
}

function moveToLocation(lat, lng) {
  const moveLatLon = new kakao.maps.LatLng(lat, lng);
  map.panTo(moveLatLon);  // 부드럽게 지도 중심 이동
}