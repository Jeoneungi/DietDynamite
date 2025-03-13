const inputId = document.getElementById("userId");
const inputEmail = document.getElementById("userEmail");
const spanId = document.getElementById("spanId");
const spanEmail = document.getElementById("spanEmail");

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

inputEmail.addEventListener("focus", ()=>{
    // 포커스 인
    spanEmail.style.borderBottom = "1px solid #FF9D42";
},
()=>{
    // 포커스 아웃
    if(inputEmail.value.trim() == ""){
        spanEmail.style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    }
})
