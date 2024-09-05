const chattingTab = $(".chatting-container")
const addUserTab = $(".add-user-container")
const roomList = $(".room-list")
const chatArea = $(".chatting-display-area")

$(document).ready(function () {
	
	// 채팅방 정보 가져오기
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

// 채팅방 정보 가져오는 함수
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

			// 이벤트 리스너 생성
			const chatRooms = document.querySelectorAll(".room-item")
			chatRooms.forEach(room =>{
				room.addEventListener("click", function(e){
					// closest를 사용하여 .room-item 요소를 찾음 (캡처링으로 인한 하위요소 클릭시, e.target 의 위치이상 방지)
					let selectedRoom = e.target.closest('.room-item');

					// 클릭시 배경색 변경
					chatRooms.forEach(room =>{
						room.classList.remove("room-selected")
					})
					selectedRoom.classList.add("room-selected")

					// 채팅방의 채팅 데이터 GET
					if (selectedRoom) {
						let selectedRoomNo = selectedRoom.dataset.roomno;
						getAllChatWithRoom(selectedRoomNo)
					}
				})
			})
		},
		error : function(e){
			console.log(e)
		}
	});
}

// 채팅방 요소 생성 함수
function makeChatRoomsElement(data){
	let html = ""
	if (data.length > 0){
		for (let d of data){
			html += `
				<li class="room-item" data-roomno=${d.roomNo}>
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

// 채팅방 선택후 메시지 가져오는 함수
function getAllChatWithRoom(roomNo){
	const request_url = "/rest/chat/getAllChatWithRoom"
	$.ajax({
		type: "GET",
		url: request_url,
		data:{roomNo},
		dataType: "json",
		success: function (res) {

			// 채팅방 메시지 요소 생성
			let html = makeChatRoomChatsElement(res)
			chatArea.html(html)
		},
		error : function(e){
			console.log(e)
		}
	});
}

// 메시지를 이용해 메시지 요소 생성 함수
function makeChatRoomChatsElement(data){
	let html = ""
	if (data.length > 0){
		for (let d of data){
			// 타입 파싱
			let time_temp = d.sendTime.split(" ")[1]
			let time = time_temp.substring(0,5)

			if (loginUserNo == d.senderNo){
				html +=`
					<li class="my-chat">
                    	<span class="chatDate">${time}</span>
                    	<p class="chat">${d.messageContent}</p>
                	</li>
				`
			} else{
				html += `
					<li class="target-chat">
						<img src="${d.senderImage}">
						<div>
						<b>${d.senderNickname}</b>   <br>
						<p class="chat">${d.messageContent}</p>
						<span class="chatDate">${time}</span>
						</div>
					</li>
				`
			}
		}

	}else{
		html += `<li> 채팅 메시지가 없습니다. </li>`
	}

	return html;
}