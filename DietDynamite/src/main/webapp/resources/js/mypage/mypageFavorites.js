let placeData = [];

$(document).ready(function () {
    // 내 즐겨찾기 페이지네이션 실행
    getMyFavorites()
});

// 내 즐겨찾기 가져오는 함수
function getMyFavorites(){
	let request_url = `/rest/mypage/getFavoriteplaces?userNo=${loginUserNo}`
	$.ajax({
		type: "GET",
		url: request_url,
		dataType: "json",
		success: function (res) {
            console.log(res)
			if(res.length > 0){
				placeData = res
				paginationActive("favorites", placeData, paginationTemplate);
			}
			else{
				toastPop("warn", "즐겨찾기 데이터를 가져오는데 실패하였습니다.");
			}

		}
	});
}

// 일반 유저 페이지네이션 템플릿 함수
function paginationTemplate(data, id) {
    let item = "";

    $.each(data, function(index, d){
        item += 
            `<div class="card__white map_detail">
                <input type="hidden" name="map_id" value="${d.placeApiId}">
                <div class="card-image-container">
                    <img src="https://${d.placeImg}"/>
                </div>
                <div class="card-info-container">
                    <div class="card-header d-flex">
                        <p class="card-title fc__gray"> [ ${d.placeMajorCategory} - ${d.placeMinorCategory} ]</p>
                        <img class="card-star" src="/resources/images/icons/star_fill.png"/>
                    </div>
                    <div class="card-content">
                        <p class="place_name">${d.placeName}</p>
                        <p class="place_address">${d.placeAddress}</p>
                        <p class="place_phone">${d.placePhone}</p>
                    </div>
                </div>
            </div>`
    })
    return item;
}

// 페이지네이션 실행 함수
function paginationActive(id, datas, template){
	
	// 한 페이지당 개수 정하기
	let page_size = 8;
	
	// 각 조건에 맞게 페이지네이션 실행
	if ( $(`#${id}-pagination`).length > 0 ){

        $(`#${id}-pagination`).pagination({
		    dataSource: datas,
		 	
		    pageSize: page_size,
		    
		    callback: function(data, pagination) {
		        var html = template(data,id);
		        
		        $(`#${id}-data`).html(html);	// 데이터 페이지네이션
		
				var currentPage = pagination.pageNumber;	// 현재 페이지 번호
				
				// 페이지네이션 스타일 변경
				var pagingEl = $(`.paginationjs-page[data-num='${currentPage}'] a`);
				pagingEl.css({
					fontSize : "14px",
					textDecoration : "underline"
				})
			}
		})

        $(".map_detail").on("click", function(){
            console.log("Aaa")
            let placeId = $(this).find("input[name='map_id']").val()
            let placeName = $(this).find(".place_name").text()
            let placeAddr = $(this).find(".place_address").text()
            let placePhone = $(this).find(".place_phone").text()
    
            const base_url = "/map/reviewDetail"
            let queryString = `?placeApiId=${placeId}&placeName=${placeName}&placeAddress=${placeAddr}&placePhone=${placePhone}`
    
            location.href = base_url+queryString;
        })
	}
}