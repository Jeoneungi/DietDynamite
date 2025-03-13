// 검색 input창 요소 입력
const query = document.getElementById("query");
const keyword = document.getElementById("keyword");
const result = document.getElementById("food-cont");
const workoutInfoBox = document.getElementById("workout-info-box");

console.log("test");

query.addEventListener("input", (e) => {
    fetch("/dietInfo/workoutInfoSearch?query=" + e.target.value)
    .then(resp => resp.json()) // 응답객체
    .then(searchKeyword => {
        result.innerText = "";
        workoutInfoBox.innerText = "";
        result.style.display='block';
        workoutInfoBox.style.display="none";

        if(searchKeyword.length > 0){
            let htmls = "";
            for(let keyword of searchKeyword){

                let keywordhighlight = keyword.workoutName;

                htmls +=`<div class="food-container">
                                <a href="#" class="fs-16" onclick = "dietInfoDetail('${keyword.workoutNo}')">
                                ${keywordhighlight.replace(e.target.value,"<mark>" + e.target.value + "</mark>")}
                                </a><br>
                                <span class="fs-14" style="margin-left: 30px">${keyword.workoutClass}</span>
                                <span class="fs-14" style="margin-left: 400px">MET 계수  ${keyword.workoutMet}</span>
                                </div>`;
            }
            result.innerHTML = htmls;
        } else {
            result.innerText = "";
        }
    })
    
    .catch( err => {
        console.log(err);
    })
})
   
       
query.addEventListener("focusout", ()=>{
    setTimeout(() => {
        result.style.display='none';
    }, 300);    
    
})

function dietInfoDetail(workoutNo){
    fetch("/dietInfo/workoutInfoDetail?workoutNo=" + workoutNo)
    .then(resp => resp.json()) // 응답객체
    .then(workoutInfo => {
        const workout = workoutInfo[0];
        workoutInfoBox.style.display="block";

        workoutInfoBox.innerHTML = `
            <div class="workout-title fs-16" style="width:630px; margin-left:30px">${workout.workoutName}(${workout.workoutClass})</div>

                <div class="workout-container">
                    <div class="workout-number fs-16">
                        <span>운동시간</span> <input type="text" id="workout-time" size="10px" style="border:none; text-align: right;"> <span>분</span>
                    </div>
                    <div class="workout-number fs-16">
                        <span>현재체중</span> <input type="text" id="current-weight" size="10px" style="border:none; text-align: right;"> <span>kg</span>
                    </div>
                </div>

                <hr>

                <span>예상 소모 칼로리</span> <span id="calories-burned" class="fs-16" style="margin-left: 400px"> </span>

                <button class="btn-exsmall__lorange" onclick="updateCalories(${workout.workoutMet}, ${workout.workoutNo})">계산</button>

            `;
    })
        .catch( err => {
            console.log(err);
         })
}


// 칼로리 계산 및 업데이트 함수
function updateCalories(met, workoutNo) {
    const time = parseFloat(document.getElementById('workout-time').value);
    const weight = parseFloat(document.getElementById('current-weight').value);
  
    if (!isNaN(time) && !isNaN(weight)) {
      const calories = (met * 3.5 * weight / 200) * time
      document.getElementById('calories-burned').textContent = `${calories.toFixed(2)} kcal`;
    } else {
      document.getElementById('calories-burned').textContent = '유효한 값을 입력하세요';
    }

  }