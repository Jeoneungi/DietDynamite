let placeData;

$(document).ready(function () {
    // 내 즐겨찾기 페이지네이션 실행
    getMyFavorites()
});

// 내 즐겨찾기 가져오는 함수
function getMyFavorites(){
	// let request_url = `/rest/profile/getMyCommunity`
	// $.ajax({
	// 	type: "GET",
	// 	url: request_url,
	// 	dataType: "json",
	// 	async: false,
	// 	success: function (res) {
	// 		let isGetData = res.hasOwnProperty("data");
			
	// 		if(isGetData){
	// 			communityData = res.data
	// 			paginationActive("board", communityData, paginationTemplate);
	// 		}
	// 		else{
	// 			toastPop("warn", "게시글을 가져오는데 실패하였습니다.");
	// 		}

	// 	}
	// });

    placeData = [
        {placeId :"1", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"2", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"3", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"4", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"5", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"6", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"7", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"8", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"9", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"10", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"11", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"12", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"13", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
        {placeId :"14", placeImg : "/resources/images/profile/user_img1.jpg", placeCategory : "음식점", placeSubCategory : "샐러드", placeName : "별양집", placeAddr : "서울 강남구 무슨동 612-23 2층", placeNum : "010-1111-2222"},
    ]
    paginationActive("favorites", placeData, paginationTemplate);
}

// 일반 유저 페이지네이션 템플릿 함수
function paginationTemplate(data, id) {
    let item = "";

    $.each(data, function(index, d){
        item += 
            `<div class="card__white">
                <input type="hidden" name="map_id" value="${d.placeId}">
                <div class="card-image-container">
                    <img src="${d.placeImg}"/>
                </div>
                <div class="card-info-container">
                    <div class="card-header d-flex">
                        <p class="card-title fc__gray"> [ ${d.placeCategory} - ${d.placeSubCategory} ]</p>
                        <img class="card-star" src="/resources/images/icons/star_fill.png"/>
                    </div>
                    <div class="card-content">
                        <p>${d.placeName}</p>
                        <p>${d.placeAddr}</p>
                        <p>${d.placeNum}</p>
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
	}
}