const chattingTab = $(".chatting-container")
const addUserTab = $(".add-user-container")
const roomList = $(".room-list")
const chatArea = $(".chatting-display-area")
const inputChatting = $("#inputChatting")
const addUserList = $(".add-user-result ul")

let selectedRoomNo;
let chattingSock;

$(document).ready(function () {
	
	// 채팅방 정보 가져오기
	getAllChatRooms();

	// 초기 채팅방 유저 데이터 가져오기
	searchUser("")

	// SockJs 로 웹소켓 연결
	console.log(loginUser)
	if (loginUser != ""){
		chattingSock = new SockJS("/ws/chat");
	}
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
			// 채팅방 리스트 생성후 출력
			let html = makeChatRoomsElement(res)
			roomList.html(html)

			// 채팅방 클릭 이벤트 리스너 생성
			const chatRooms = document.querySelectorAll(".room-item")
			chatRooms.forEach((room,index) =>{
				room.addEventListener("click", function(e){
					// closest를 사용하여 캡처링으로 인한 e.target 위치오류 방지
					let selectedRoom = e.target.closest('.room-item');

					// 채팅방 헤더 정보 변경
					$(".participant-profile").prop("src", res[index].createUserImage)
					$(".chatting-info-div .chatting-room-name").html(res[index].roomName)
					$(".chatting-info-div .participant-info").html(`
						<img class="participant-number-icon" src="/resources/images/icons/human.png">
                        <p class="participant-number fs-15"> ${res[index].chatRoomMembers.length} </p>
					`)

					// 채팅방 클릭시 채팅방 배경색 변경
					chatRooms.forEach(room =>{
						room.classList.remove("room-selected")
					})
					selectedRoom.classList.add("room-selected")

					// 채팅방의 채팅 데이터 GET
					if (selectedRoom) {
						selectedRoomNo = selectedRoom.dataset.roomno;
						getAllChatsWithRoom(selectedRoomNo)
					}

					// 채팅방 클릭시 notReadCount 화면상 제거
					let notReadCntEl = $(`[data-roomno="${selectedRoomNo}"] .not-read-count`)
					notReadCntEl.html(0)
					notReadCntEl.addClass("hide")
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
function getAllChatsWithRoom(roomNo){
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

// 유저 검색 기능
$(".add-user-search .search").on("input", function (e) {
	let searchInput = e.target.value
	searchUser(searchInput)

});

// 유저 검색 함수
function searchUser(searchInput){
	const request_url = "/rest/chat/searchUser"
	$.ajax({
		type : "GET",
		url : request_url,
		data : {searchInput},
		dataType : "json",
		success: function(res){

			// 검색된 유저중 본인은 제외
			let exceptLoginUser = res.filter(item => {
				return item.userNo != loginUserNo
			})
			
			let html = ""
			if(exceptLoginUser.length > 0){
				for(let d of exceptLoginUser){
					html +=`
						<li class="d-flex">
							<div class="d-flex user-info">
								<img src="${d.userImage}">
								<p> ${d.userNickname} </p>
							</div>
							<div class="checkbox-wrapper-50">
								<input type="checkbox" class="plus-minus selected-user" value=${d.userNo}>
							</div>
						</li>
					`
				}
				
			}else{
				html += `<li> 검색된 유저가 없습니다. </li>`
			}

			addUserList.html(html)
		}
	})
}


// 채팅방 생성 및 유저 초대
function inviteUser(){
	let addUserCheckboxs = $(".selected-user:checked")

	let invitedUserList = [{userNo : loginUserNo}]	// 채팅방 생성자는 자동 추가

	for (let checkboxEl of addUserCheckboxs ){	// 초대한 유저 추가
		invitedUserList.push({userNo : checkboxEl.value})
	}

	const request_url = "/rest/chat/createChatRooms"

	if(invitedUserList.length > 0){
		$.ajax({
			type: "POST",
			url: request_url,
			contentType:"application/json",
			data:JSON.stringify(invitedUserList),
			dataType: "json",
			success: function (res) {
				console.log(res)
				getAllChatRooms()
			},
			error : function(e){
				console.log(e)
			}
		});
	}
}

// 채팅 입력 함수 ( POST 테스트용)
// function sendMessage(){
// 	chatContent = inputChatting.val()

// 	let requestData = {roomNo: selectedRoomNo,
// 						chatContent}
// 	const request_url = "/rest/chat/insertMessage"

// 	$.ajax({
// 		type: "POST",
// 		url: request_url,
// 		contentType:"application/json",
// 		data:JSON.stringify(requestData),
// 		dataType: "json",
// 		success: function (res) {
// 			console.log(res)
// 		},
// 		error : function(e){
// 			console.log(e)
// 		}
// 	});
// }

// 웹소켓 채팅
function sendMessage(){
	// SockJs 로 웹소켓 연결
	if (loginUser == null){
		alert("로그인 후 이용해주세요")
		return;
	}
	
	chatContent = inputChatting.val()

	if (chatContent.trim().length >0){
		let chat = {"roomNo": selectedRoomNo,
					"chatContent" : chatContent,
					"senderNo" : loginUserNo
					}
	
		chattingSock.send(JSON.stringify(chat))

		inputChatting.val("")
	}else{
		alert("메시지를 입력해주세요")
	}
}


