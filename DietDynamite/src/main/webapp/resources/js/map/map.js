let map;
let markers = [];
let overlays = [];
let favoritePlaces = [];
let overlaysVisible = true;
let currentPlaceIndex = 0;
let PLACES_BATCH_SIZE = 20;
let currentFavoriteIndex = 0;
const FAVORITES_BATCH_SIZE = 20;

console.log(loginUser);

// 지도 초기화 함수
function initMap() {
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(37.49903474154083, 127.03287472929262 ),  // 위치는 남도빌딩 
        level: 4
    };
    map = new kakao.maps.Map(mapContainer, mapOption);
    kakao.maps.event.addListener(map, 'click', toggleOverlays);
}

// 검색어로 장소를 검색하는 함수
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

            const placeIds = data.map(place => ({
                placeAPIid: place.id,
                placeName: place.place_name
            }));

            fetchImagesFromServer(placeIds);
        } else {
            alert('검색 결과가 없습니다.');
        }
    }, {
        location: map.getCenter(),
        radius: 1000
    });
}

// 서버에서 장소에 대한 이미지를 가져오는 함수
function fetchImagesFromServer(placeIds) {
    fetch('/rest/map/places/searchImg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(placeIds)
    })
        .then(response => response.json())
        .then(result => {
            const placeIdsToCrawl = placeIds.filter(place =>
                !result.some(existingPlace => existingPlace.placeAPIid === place.placeAPIid)
            );
            if (placeIdsToCrawl.length > 0) {
                crawlMissingImages(placeIdsToCrawl);
                console.log("이미지가 이미 존재해 크롤링 서버로 요청을 안합니다.");
                return;
            }
        })
        .catch(error => console.error('이미지 검색 중 오류 발생:', error));
}

// 크롤링이 필요한 장소 이미지를 요청하는 함수
function crawlMissingImages(placeIdsToCrawl) {
    placeIdsToCrawl.forEach(place => {
        const request_url = `http://localhost:7000/api/crawling/kakaoImage?mapId=${place.placeAPIid}&mapName=${place.placeName}`;
        $.ajax({
            type: "GET",
            url: request_url,
            dataType: "json",
            success: function (res) {
                if (res.src && res.src !== "0") {
                    saveCrawledImage(place.placeAPIid, place.placeName, res.src);
                }
            },
            error: function (err) {
                console.error(`크롤링 중 오류 발생 (placeAPIid: ${place.placeAPIid}):`, err);
            }
        });
    });
}

// 크롤링한 이미지를 서버에 저장하는 함수
function saveCrawledImage(placeAPIid, placeName, imageSrc) {
    fetch('/rest/map/place/saveImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            placeAPIid: placeAPIid,
            placeName: placeName,
            placeImg: imageSrc
        })
    })
        .then(() => console.log(`이미지 저장 완료: ${placeAPIid}, 장소명: ${placeName}`))
        .catch(error => console.error(`이미지 저장 중 오류 발생 (placeAPIid: ${placeAPIid}):`, error));
}

// 검색된 장소를 표시하는 함수
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

// 장소를 일정량씩 추가로 로드하는 함수
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
            displayPlaceInfo(place);
        });
    }
}

// 장소에 마커를 추가하는 함수
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

// 오버레이를 숨기거나 보이게 하는 함수
function toggleOverlays() {
    overlaysVisible ? hideOverlays() : showOverlays();
}

// 오버레이를 모두 숨기는 함수
function hideOverlays() {
    overlays.forEach(overlay => overlay.setMap(null));
    overlaysVisible = false;
}

// 오버레이를 모두 표시하는 함수
function showOverlays() {
    overlays.forEach(overlay => overlay.setMap(map));
    overlaysVisible = true;
}

// 즐겨찾기 목록을 로드하는 함수
async function loadFavoritePlaces() {
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
                            <button class="remove-button" onclick="removeFavorite('${place.placeApiId}')">즐겨찾기 해제</button>
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

// 장소 정보를 오버레이로 표시하는 함수
async function displayPlaceInfo(place) {
    clearOverlays();
    const isFavorite = favoritePlaces.some(fav => fav.placeApiId === place.id);
    let buttonContent = '';

    if (loginUser != '') {
        buttonContent = isFavorite
            ? `<button onclick="removeFavorite('${place.id}')">즐겨찾기 해제</button>`
            : `<button onclick="addFavorite('${place.place_name}', '${place.y}', '${place.x}', '${place.address_name}', '${place.phone}', '${place.id}', '${place.category_group_name}','${place.category_name}')">즐겨찾기 추가</button>`;
    } else {
        buttonContent = `<p>로그인 후 즐겨찾기를 추가할 수 있습니다.</p>`;
    }

    const content = `
      <div class="custom-overlay">
          <a href="/map/reviewDetail?placeApiId=${place.id}&placeName=${place.place_name}&placeAddress=${place.address_name}&placePhone=${place.phone}">
              ${place.place_name}
          </a>
          <p>${place.address_name}</p>
          <p>${place.phone ? place.phone : '전화번호 없음'}</p>
          ${buttonContent}
          <div class="review-box">
              <h4>리뷰</h4>
              <div class="review-content">
                  <div class="review-item">한줄 소개 리뷰</div>
              </div>
          </div>
      </div>
  `;

    const position = new kakao.maps.LatLng(place.y, place.x);
    const overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 0.9,
        xAnchor: 0.5
    });

    overlay.setMap(map);
    overlays.push(overlay);

    adjustMapForOverlay(position);
}

// 지도에서 오버레이 위치에 맞춰 중심을 조정하는 함수
function adjustMapForOverlay(overlayPosition) {
    const overlayLatLng = new kakao.maps.LatLng(overlayPosition.getLat(), overlayPosition.getLng());
    map.panTo(overlayLatLng);
}

// 오버레이와 마커를 모두 제거하는 함수
function clearMarkersAndOverlays() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    clearOverlays();
}

// 오버레이 초기화 함수
function clearOverlays() {
    overlays.forEach(overlay => overlay.setMap(null));
    overlays = [];
}

// 즐겨찾기 추가 함수
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

            if (result === -1) {
                alert('이미 즐겨찾기에 추가된 장소입니다.');
                return;
            }

            if (result > 0) {
                favoritePlaces.push({ placeApiId, placeName, latitude, longitude, address, phone });
                displayFavorites(favoritePlaces);
                updateOverlaysButton(placeApiId, '즐겨찾기 해제');
                alert('즐겨찾기에 추가되었습니다.');
            }
        } else {
            console.error('즐겨찾기 추가 실패:', response.statusText);
        }
    } catch (error) {
        console.error('오류 발생:', error);
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
        // 즐겨찾기 목록에서 해당 장소 삭제
        favoritePlaces = favoritePlaces.filter(place => place.placeApiId !== placeApiId);
        
        // DOM에서 해당 아이템 삭제
        const itemEl = document.querySelector(`[data-place-api-id="${placeApiId}"]`);
        if (itemEl) {
          itemEl.remove();
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
  

// 오버레이에서 즐겨찾기 버튼 업데이트 함수
function updateOverlaysButton(placeApiId, newButtonText) {
    overlays.forEach(overlay => {
        const content = overlay.getContent();
        if (content.includes(placeApiId)) {
            const newContent = content.replace(/즐겨찾기 (추가|해제)/, newButtonText);
            overlay.setContent(newContent);
        }
    });
}

// 즐겨찾기 목록을 화면에 표시하는 함수
function displayFavorites(favorites) {
    const listEl = document.getElementById('favorites');
    listEl.innerHTML = '';  // 기존 목록 비우기

    const scrollContainer = document.createElement('div');
    scrollContainer.classList.add('favorites-container');
    listEl.appendChild(scrollContainer);

    loadMoreFavorites(favorites, scrollContainer);

    scrollContainer.addEventListener('scroll', function () {
        // 스크롤이 끝에 도달하면 더 많은 즐겨찾기를 로드
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
            loadMoreFavorites(favorites, scrollContainer);
        }
    });
}

// 즐겨찾기 목록을 일정량씩 추가로 로드하는 함수
function loadMoreFavorites(favorites, scrollContainer) {
    const batchEnd = currentFavoriteIndex + FAVORITES_BATCH_SIZE;

    // 설정된 크기만큼 즐겨찾기 목록을 추가 로드
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

// 즐겨찾기 목록을 서버에서 불러와 화면에 표시하는 함수
async function loadFavorites() {
    try {
        const response = await fetch('/rest/map/places/favorites');
        if (response.ok) {
            const data = await response.json();
            displayFavorites(data);
        } else {
            console.error('즐겨찾기 불러오기 실패:', response.statusText);
            alert('즐겨찾기를 불러오는 중 문제가 발생했습니다.');
        }
    } catch (error) {
        console.error('오류 발생:', error);
    }
}

// 특정 위치로 지도를 부드럽게 이동하는 함수
function moveToLocation(lat, lng) {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);  // 부드럽게 지도 중심 이동
}

// DOMContentLoaded 이벤트를 사용하여 페이지 로드 후 초기화 작업 수행
document.addEventListener("DOMContentLoaded", function () {
    initMap();
    loadFavoritePlaces();  // 페이지 로드 시 즐겨찾기 목록 로드

    // 검색 버튼 이벤트 리스너
    document.getElementById('searchBtn').addEventListener('click', searchPlaces);

    // 검색 창에서 Enter 키 입력 시 검색 함수 호출
    document.getElementById('keyword').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchPlaces();
        }
    });

    // 홈 버튼 클릭 시 지도와 결과 목록 초기화
    document.getElementById('homeBtn').addEventListener('click', function () {
        initMap();
        document.getElementById('favorites-container').style.display = 'none';
        document.getElementById("result-list").style.display = 'none';
    });

    // 즐겨찾기 버튼 클릭 시 즐겨찾기 목록 표시/숨기기
    document.getElementById('saveBtn').addEventListener('click', function () {
        if (loginUser === '') {
            window.location.href = "/user/login"; // 로그인 페이지로 리디렉션
        } else {
            const favoritesContainer = document.getElementById('favorites-container');
            favoritesContainer.style.display = (favoritesContainer.style.display === 'none' || favoritesContainer.style.display === '')
                ? 'block'
                : 'none';
        }
    });
});

