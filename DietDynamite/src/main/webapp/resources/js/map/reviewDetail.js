
function fetchPlaceDetails(mapId) {
    fetch(`http://localhost:7000/api/crawling/kakaoImage?mapId=` + mapId)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let mapEl = document.getElementById("map")
      mapEl.style.backgroundImage = `url("https://${result.src}")`;

      document.getElementById("place-name").textContent = `${result.place_name}`;
      document.getElementById("place-address").textContent = `${result.address}`;
      document.getElementById("place-phone").textContent ="${result}";
    
    })
    .catch(error => {
        console.error('가게 정보 조회 오류:', error);
        alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
    });
}

fetchPlaceDetails(mapId)

