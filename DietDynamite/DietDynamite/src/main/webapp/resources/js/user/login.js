const inputId = document.getElementById("userId");
const inputPw = document.getElementById("userPw");
const spanId = document.getElementById("spanId");
const spanPw = document.getElementById("spanPw");

inputId.addEventListener("focus", ()=>{
    // 포커스 인
    spanId.style.borderBottom = "1px solid #FF9D42";
},
()=>{
    // 포커스 아웃
    if(inputId.value.trim() == ""){
        spanId.style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    }
})

inputPw.addEventListener("focus", ()=>{
    // 포커스 인
    spanPw.style.borderBottom = "1px solid #FF9D42";
},
()=>{
    // 포커스 아웃
    if(inputPw.value.trim() == ""){
        spanPw.style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    }
})
