const chattingTab = $(".chatting-container")
const addUserTab = $(".add-user-container")
const roomList = $(".room-list")
const chatArea = $(".chatting-display-area")
const inputChatting = $("#inputChatting")
const addUserList = $(".add-user-result ul")

let addUserCheckboxs;
let invitedUserList = [];

// 채팅 관련 데이터
let selectedRoomNo;
let selectedRoomName;
let selectedChatArea= document.querySelector(".chatting-display-area");

let chattingSock;

$(document).ready(function () {
	
	// 채팅방 정보 가져오기
	getAllChatRooms();

	// 초기 채팅방 유저 데이터 가져오기
	searchUser("")

	// SockJs 로 웹소켓 연결
	if (loginUser != ""){
		chattingSock = new SockJS("/ws/chat");
	}

	// sockJs 메시지 받기
	chattingSock.onmessage = function(e) {
		const msg = JSON.parse(e.data);

		// 선택된 Room 의 RoomList 정보
		const targetRoomInfo = $(`[data-roomno=${msg.roomNo}] .chatting-room-info`)
		const lastMessage = $(`[data-roomno=${msg.roomNo}] .chatting-room-info .last-message`)
		let notReadCnt = $(`[data-roomno=${msg.roomNo}] .chatting-room-info .not-read-count`)
		
		// 메시지가 왔는데, 방금 초대를받아서 방이 없을경우 방 재생성
		if(targetRoomInfo.length == 0){
			getAllChatRooms();
		}		

		// 방을 보고있다면 : 선택된 방이 메시지가 보내지는 방과 동일할 경우
		if (selectedRoomNo == msg.roomNo){
			let html = ""
			// 메시지 생성
			let noChatEl = $(".no-chat")
			if (noChatEl.length > 0){
				noChatEl.remove();
			}

			if (loginUserNo == msg.senderNo){
				html +=`
					<li class="my-chat">
                    	<span class="chatDate">${msg.sendTime}</span>
                    	<p class="chat">${msg.messageContent}</p>
                	</li>
				`
			} else{
				html += `
					<li class="target-chat">
						<img src="${msg.senderImage}">
						<div>
						<b>${msg.senderNickname}</b>   <br>
						<p class="chat">${msg.messageContent}</p>
						<span class="chatDate">${msg.sendTime}</span>
						</div>
					</li>
				`
			}

			selectedChatArea.innerHTML += html;
		}
		// 방을 보고있지 않다면 : 
		else{
			//채팅방 리스트에 읽지않은 메시지를 해당 메시지로 변경, notReadCnt 추가
			lastMessage.html(msg.messageContent)

			console.log(notReadCnt)
			if(notReadCnt.length > 0){
				notReadCnt.html(Number(notReadCnt.html()) + 1)
			}else{
				targetRoomInfo.html(targetRoomInfo.html() + `<p class="not-read-count fs-10"> 1 </p>`)
			}
		}
	}
	
});

// 채팅 탭 열기
function showChattingTab (){
	if(loginUserNo == 0){
		alert("로그인 후 이용해주세요")
		window.location.href = "/user/login"
	}else{
		chattingTab.removeClass("hide");
	}
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
	resetUserAddList();
	addUserTab.addClass("hide");
}

function resetUserAddList(){
	let addUserCheckboxs = $(".selected-user:checked")


	if (addUserCheckboxs.length >0){
		for (let checkboxEl of addUserCheckboxs ){
			checkboxEl.checked = false;
		}
	}
	invitedUserList.length = 0	// 전부 제거
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

					// 선택한 채팅방에 대한 총 정보
					// console.log(res[index])

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
						selectedRoomNo = res[index]["roomNo"];
						selectedRoomName = res[index]["roomName"]
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
						<div class="chatting-room-info d-flex mt-4">
							<p class="fc__gray last-message ellipsis"> ${d.lastMessage != null ? d.lastMessage : '메시지가 없습니다.'} </p>
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
		html += `<li class="no-chat"> 채팅 메시지가 없습니다. </li>`
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
	addUserCheckboxs = $(".selected-user:checked")

	invitedUserList = [{userNo : loginUserNo}]	// 채팅방 생성자는 자동 추가

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

	hideAddUserTab();
}

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
					"roomName": selectedRoomName,
					"messageContent" : chatContent,
					"senderNo" : loginUserNo
					}

		chattingSock.send(JSON.stringify(chat))

		inputChatting.val("")
	}else{
		alert("메시지를 입력해주세요")
	}
}

