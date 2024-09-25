const recipe = document.getElementsByClassName("recipe-area");

const closeModalBtns = document.querySelectorAll('.close-btn');

const closeBtn = document.getElementById("closeBtn");

let thisRecipe = null;


for (let i = 0; i < recipe.length; i++) {
    recipe[i].addEventListener("click", () => {

        document.getElementById("recipeListModal").style.display = "block";

        console.log(i);

        // 클릭한 레시피의 레시피번호 얻어오기
        const recipeNo = recipe[i].firstElementChild.innerHTML;

        fetch("/recipe/main", {
            method: "POST",
            headers: { "Content-type": "application/text" },
            body: recipeNo
        })
            .then(response => response.json()) // 응답 객체를 필요한 형태로 파싱해서 리턴

            .then(result => { // 파싱된 데이터를 받아서 처리하는 코드 작성
                console.log("recipeModal : " + result);
                result.forEach(r => {

                    thisRecipe = r;

                    const recipeListModal = document.getElementById("recipeListModal");
                    recipeListModal.innerHTML = "";

                    const modalContent = document.createElement("div");
                    modalContent.classList.add("modal-content")

                    const closeBtn = document.createElement("span");
                    closeBtn.classList.add("close-btn");
                    closeBtn.classList.add("fs-16");
                    closeBtn.innerHTML = "&times;"
                    closeBtn.id = "closeBtn";


                    const modalHeader = document.createElement("div");
                    modalHeader.classList.add("modal-header");

                    const recipeTitle = document.createElement("h2");
                    recipeTitle.classList.add("recipeTitle");
                    recipeTitle.innerText = r.recipeTitle

                    const modalBody = document.createElement("div");
                    modalBody.classList.add("modal-body");

                    const imageArea = document.createElement("div");
                    imageArea.classList.add("img-area");

                    const recipeImg = document.createElement("img");

                    if(r.recipeImage == null){
                        recipeImg.src = "/resources/images/recipe/recipeImage.webp";
                    }else{
                        recipeImg.src = r.recipeImage;
                    }

                    imageArea.append(recipeImg);

                    const sideBoxUrl = document.createElement("div");
                    sideBoxUrl.classList.add("sied-box");
                    sideBoxUrl.innerText = "조리영상";

                    const urlArea = document.createElement("div");
                    urlArea.classList.add("url-area");

                    const sideBoxIgd = document.createElement("div");
                    sideBoxIgd.classList.add("sied-box");
                    sideBoxIgd.innerText = "재료"

                    const recipeIngredientArea = document.createElement("div");
                    recipeIngredientArea.classList.add("recipeIngredient-area");


                    const ingerdient = document.createElement("span");
                    ingerdient.id = "ingerdient";
                    ingerdient.innerText = r.recipeIngredient;

                    const siedBoxNt = document.createElement("div");
                    siedBoxNt.classList.add("sied-box");
                    siedBoxNt.innerText = "영양 정보";

                    const nutritionBox = document.createElement("div");
                    nutritionBox.classList.add("nutrition-box");


                    const recipeCal = document.createElement("span");
                    recipeCal.id = "recipeCal";
                    recipeCal.innerText = r.recipeCal;

                    const recipeHydro = document.createElement("span");
                    recipeHydro.id = "recipeHydro";
                    recipeHydro.innerText = r.recipeHydro;

                    const recipeProtein = document.createElement("span");
                    recipeProtein.id = "recipeProtein";
                    recipeProtein.innerText = r.recipeProtein;

                    const recipeFat = document.createElement("span");
                    recipeFat.id = "recipeFat";
                    recipeFat.innerText = r.recipeFat;

                    const recipeSod = document.createElement("span");
                    recipeSod.id = "recipeSod";
                    recipeSod.innerText = r.recipeSod;

                    const recipeFiber = document.createElement("span");
                    recipeFiber.id = "recipeFiber";
                    recipeFiber.innerText = r.recipeFiber;

                    const recipeCnt = document.createElement("span");
                    recipeCnt.id = "recipeCnt";
                    recipeCnt.innerText = r.recipeCnt;


                    /* 버튼 영역 */
                    const buttonArea = document.createElement("div");
                    buttonArea.classList.add("buttonArea");


                    const updateBtn = document.createElement("button");
                    updateBtn.classList.add("updateBtn");
                    updateBtn.innerText = "수정";
                    updateBtn.id = "updateBtn";

                    const deleteBtn = document.createElement("button");
                    deleteBtn.classList.add("deleteBtn");
                    deleteBtn.innerText = "삭제";
                    deleteBtn.id= "deleteBtn";
                    
                    buttonArea.append(updateBtn, deleteBtn);

                    recipeIngredientArea.append(ingerdient)

                    nutritionBox.append(recipeCal, recipeHydro, recipeProtein, recipeFat,
                        recipeSod, recipeFiber, recipeCnt)

                    modalBody.append(imageArea, sideBoxUrl, urlArea,
                        sideBoxIgd, recipeIngredientArea, siedBoxNt, nutritionBox, buttonArea)

                    modalHeader.append(recipeTitle)

                    modalContent.append(closeBtn, modalHeader, modalBody)

                    recipeListModal.append(modalContent)

                });

            })
            .catch(e => {
                console.log("레시피 로드 중 예외 발생")
                console.log(e);
            })

    });

};

document.getElementById("insert").addEventListener("click", function () {
    recipeInsertModal.style.display = "block";

})

const modal = document.getElementById("recipeListModal");

// 상위 요소에 이벤트 리스너 추가 (이벤트 위임)
modal.addEventListener('click', function(event) {
    // 클릭한 대상이 id가 'closeBtn'인지를 확인
    if (event.target && event.target.id === 'closeBtn') {
        modal.style.display = "none";
    }
});



closeModalBtns.forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
    });
});



modal.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'deleteBtn') {
        console.log("deleteBtn");
    }
});






let titleInput = document.getElementsByName("recipeTitle")[0]
let priceInput = document.getElementsByName("recipePrice")[0]
let contentInput = document.getElementsByName("recipeContent")[0]
let cooktitmeInput = document.getElementsByName("recipeCookTime")[0]
let calInput = document.getElementsByName("recipeCal")[0]
let hydroInput = document.getElementsByName("recipeHydro")[0]
let proteinInput = document.getElementsByName("recipeProtein")[0]
let fatInput = document.getElementsByName("recipeFat")[0]
let sodInput = document.getElementsByName("recipeSod")[0]
let fiderInput = document.getElementsByName("recipeFiber")[0]
let ingredinetInput = document.getElementsByName("recipeIngredient")[0]

function recipeInsert(e) {

    if (titleInput.value.trim() == "제목 입력") {
        nullVaildate(titleInput, "제목을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (priceInput.value.trim() == "") {
        nullVaildate(priceInput, "가격을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (contentInput.value.trim() == "") {
        nullVaildate(contentInput, "레시피 설명을 입력해주세요.");
        e.preventDefault();
        return;
    }


    if (cooktitmeInput.value.trim() == "") {
        nullVaildate(cooktitmeInput, "조리시간을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (ingredinetInput.value.trim() == "") {
        nullVaildate(ingredinetInput, "재료를 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (calInput.value.trim() == "") {
        nullVaildate(calInput, "칼로리를 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (hydroInput.value.trim() == "") {
        nullVaildate(hydroInput, "탄수화물를 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (proteinInput.value.trim() == "") {
        nullVaildate(proteinInput, "단백질을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (fatInput.value.trim() == "") {
        nullVaildate(fatInput, "지방을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (sodInput.value.trim() == "") {
        nullVaildate(sodInput, "나트륨을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (fiderInput.value.trim() == "") {
        nullVaildate(fiderInput, "식이섬유를 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (typeof priceInput.value !== 'number' && isNaN(priceInput.value)) {
        alert("비용에 숫자만 입력해주세요.")
        priceInput.focus();
        e.preventDefault();
        return;
    }

    if (typeof calInput.value !== 'number' && isNaN(calInput.value)) {
        alert("칼로리에 숫자만 입력해주세요.")
        calInput.focus();
        e.preventDefault();
        return;
    }
    

    if (typeof hydroInput.value !== 'number' && isNaN(hydroInput.value)) {
        alert("탄수화물에 숫자만 입력해주세요.")
        hydroInput.focus();
        e.preventDefault();
        return;
    }

    if (typeof proteinInput.value !== 'number' && isNaN(proteinInput.value)) {
        alert("단백질에 숫자만 입력해주세요.")
        proteinInput.focus();
        e.preventDefault();
        return;
    }

    if (typeof fatInput.value !== 'number' && isNaN(fatInput.value)) {
        alert("지방에 숫자만 입력해주세요.")
        fatInput.focus();
        e.preventDefault();
        return;
    }

    if (typeof sodInput.value !== 'number' && isNaN(sodInput.value)) {
        alert("나트륨에 숫자만 입력해주세요.")
        sodInput.focus();
        e.preventDefault();
        return;
    }

    if (typeof fiderInput.value !== 'number' && isNaN(fiderInput.value)) {
        alert("식이섬유에 숫자만 입력해주세요.")
        fiderInput.focus();
        e.preventDefault();
        return;
    }
}



const recipeModal = document.getElementById("recipeListModal");

const updateModal = document.getElementById("recipeUpdateModal");

recipeModal.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'updateBtn') {
        recipeModal.style.display = "none";

        updateModal.style.display = "block";
        const updateTitle = document.getElementById("updateTitle");
        const updatePrice = document.getElementById("updatePrice");
        const updateContent = document.getElementById("updateContent");
        const updateCooktime = document.getElementById("updateCooktime");
        const updateCal = document.getElementById("updateCal");
        const updateHydro = document.getElementById("updateHydro");
        const updateProtein = document.getElementById("updateProtein");
        const updateFat = document.getElementById("updateFat");
        const updateSod = document.getElementById("updateSod");
        const updateFiber = document.getElementById("updateFiber");
        const updateIngerdient = document.getElementById("updateIngerdient");

        updateIngerdient.value = thisRecipe.recipeIngredient;
        updateTitle.value = thisRecipe.recipeTitle;
        updatePrice.value = thisRecipe.recipePrice;
        updateContent.value = thisRecipe.recipeContent;
        updateCooktime.value = thisRecipe.recipeCookTime;
        updateCal.value = thisRecipe.recipeCal;
        updateHydro.value = thisRecipe.recipeHydro;
        updateProtein.value = thisRecipe.recipeProtein;
        updateFat.value = thisRecipe.recipeFat;
        updateSod.value = thisRecipe.recipeSod;
        updateFiber.value = thisRecipe.recipeFiber;
    }
});










function nullVaildate(input, text) {
    input.focus();
    alert(text);
    return;
}




