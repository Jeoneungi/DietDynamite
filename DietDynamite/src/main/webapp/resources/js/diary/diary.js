const insertBtn = document.getElementById("insertBtn");

if(insertBtn !=null){

    insertBtn.addEventListener("click", ()=>{
        location.href = `/diary/${location.pathname.split("/")[2]}/insert`;
    })


}
