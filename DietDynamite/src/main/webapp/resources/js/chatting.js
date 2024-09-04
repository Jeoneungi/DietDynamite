const chattingTab = $(".chatting-container")
const addUserTab = $(".add-user-container")

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


