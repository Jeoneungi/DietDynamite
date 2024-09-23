const recipe = document.getElementsByClassName("recipe-area");

document.getElementById("insert").addEventListener("click", function(){
    recipeInsertModal.style.display = "block";

})


for(let i = 0; i < recipe.length ; i ++){
    recipe[i].addEventListener("click", ()=>{
        exerciseListModal.style.display = "block";
        
        // 클릭한 레시피의 레시피번호 얻어오기
        const recipeNo = recipe[i].firstElementChild.innerHTML;


        fetch("/recipe/main", {
            method : "POST",
            headers : {"Content-type" : "application/text"},
            body : recipeNo
        })
        .then(response => response.json() ) // 응답 객체를 필요한 형태로 파싱해서 리턴
    
        .then(result => { // 파싱된 데이터를 받아서 처리하는 코드 작성
            console.log("recipeModal : " + result);
            result.forEach(r => {

                const exerciseListModal = document.getElementById("exerciseListModal");
                exerciseListModal.innerHTML = "";

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content")

                const closeBtn = document.createElement("span");
                closeBtn.classList.add("close-btn");
                closeBtn.classList.add("fs-16");
                closeBtn.innerHTML = "&times;"

                
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

                

                recipeIngredientArea.append(ingerdient)
                
                nutritionBox.append(recipeCal,recipeHydro,recipeProtein,recipeFat,
                    recipeSod,recipeFiber,recipeCnt)

                modalBody.append(imageArea,sideBoxUrl,urlArea,
                    sideBoxIgd,recipeIngredientArea,siedBoxNt,nutritionBox)
                
                modalHeader.append(recipeTitle)

                modalContent.append(closeBtn,modalHeader,modalBody)

                exerciseListModal.append(modalContent)

              });

        }) 
        .catch(e => {
            console.log("좋아요 중 예외 발생")
            console.log(e);
        })  
    
        
    })
};



closeModalBtns.forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
    });
});





