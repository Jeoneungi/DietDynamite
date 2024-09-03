const inputId = document.getElementById("userId");
const inputPw = document.getElementById("userPw");
const spanId = document.getElementById("spanId");
const spanPw = document.getElementById("spanPw");

inputId.addEventListener("focus", ()=>{
    spanId.style.borderBottom = "1px solid #FF9D42";
})

inputPw.addEventListener("focus", ()=>{
    spanPw.style.borderBottom = "1px solid #FF9D42";
})


inputId.addEventListener("focusout", ()=>{
    if(inputId.value.trim() == ""){
        spanId.style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    }
})

inputPw.addEventListener("focusout", ()=>{
    if(inputPw.value.trim() == ""){
        spanPw.style.borderBottom = "1px solid rgba(139, 139, 139, 0.24)";
    }
})


