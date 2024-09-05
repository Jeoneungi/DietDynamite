const chattingTab = $(".chatting-container")
const addUserTab = $(".add-user-container")
const roomList = $(".room-list")

$(document).ready(function () {
	
	getAllChatRooms();	
});

// 채팅 탭 열기
function showChattingTab (){
	chattingTab.removeClass("hide");
}

// 채팅 탭 닫기
function hideChattingTab() {
	chattingTab.addClass("hide")
}

// 유저 검색 열기
function showAddUserTab (){
	addUserTab.removeClass("hide");
}

// 유저 검색 닫기
function hideAddUserTab (){
	addUserTab.addClass("hide");
}

// 채팅방 정보 가져오기
function getAllChatRooms(){
	const request_url = "/rest/chat/getAllChatRooms"
	$.ajax({
		type: "GET",
		url: request_url,
		dataType: "json",
		success: function (res) {
			console.log(res)
			let html = makeChatRoomsElement(res)
			roomList.html(html)
		},
		error : function(e){
			console.log(e)
		}
	});
}

// 채팅방 데이터로 채팅방 EL 생성하는 함수
function makeChatRoomsElement(data){
	let html = ""
	if (data.length > 0){
		for (let d of data){
			html += `
				<li class="room-item" data-roomNo=${d.roomNo}>
					<div class="item-profile">
						<img src=${d.createUserImage}>
					</div>
					<div class="item-body d-flex">
						<div class="d-flex">
							<p class="chatting-room-name">${d.roomName}</p>
							<div class="participant-number d-flex ml-10">
								<img class="participant-number-icon" src="/resources/images/icons/human.png">
								<p class="participant-number fs-10"> ${d.chatRoomMembers.length} </p>
							</div>
						</div>
						<div class="chtting-room-info d-flex mt-4">
							<p class="fc__gray"> ${d.lastMessage != null ? d.lastMessage : '메시지가 없습니다.'} </p>
							${d.notReadCnt != 0
									? `<p class="not-read-count fs-10">${d.notReadCnt}</p>` 
									: ``}
							
						</div>
					</div>
				</li>
			`
		}
	}else{
		html += `<li> 데이터가 없습니다</li>`
	}

	return html;
}