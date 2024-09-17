// 검색 input창 요소 입력
const query = document.getElementById("query");
const keyword = document.getElementById("keyword");
const result = document.getElementById("food-cont");
const foodInfoBox = document.getElementById("food-info-box");
const foodTable = document.getElementById("food-table");

console.log("test");

const thumbIcon = document.getElementById('thumbIcon');
thumbIcon.addEventListener('click', () => {
console.log(thumbIcon.style.color);
thumbIcon.style.color = thumbIcon.style.color === 'black' ? '#FFAB5E' : 'black';
});

query.addEventListener("input", (e) => {
    fetch("/dietInfo/foodInfoSearch?query=" + e.target.value)
    .then(resp => resp.json()) // 응답객체
    .then(searchKeyword => {
        console.log(searchKeyword);
        result.innerText = "";
        foodInfoBox.innerText = "";
        foodTable.innerText = "";
        result.style.display='block';
        if(searchKeyword.length > 0){
            let htmls = "";
            for(let keyword of searchKeyword){

                let keywordhighlight = keyword.foodName;

                htmls +=`<div class="food-container">
                                <span class="base__lorange fs-14">${keyword.foodCnt}</span> <br> <br>
                                <a href="#" class="fs-16" onclick = "dietInfoDetail('${keyword.foodNo}')">
                                ${keywordhighlight.replace(e.target.value,"<mark>" + e.target.value + "</mark>")}${keyword.foodType}
                                </a><br>
                                <span class="fs-16">중량 : ${keyword.foodWeight}g</span>
                                <span class="fc__orange fs-16"style="margin-left:400px">열량 : ${keyword.foodCal}kcal</span>
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

    
query.addEventListener("focusin", ()=>{
    setTimeout(() => {
        result.style.display='block';
    }, 3000);    
    
})
        
query.addEventListener("focusout", ()=>{
    setTimeout(() => {
        result.style.display='none';
    }, 3000);    
    
})

function dietInfoDetail(foodNo){


    fetch("/dietInfo/foodInfoDetail?foodNo=" + foodNo)
    .then(resp => resp.json()) // 응답객체
    .then(foodInfo => {
        
        const food = foodInfo[0];

        foodInfoBox.innerHTML = `
        <span class="base__lorange fs-14">${food.foodCnt}</span> <br> <br>
        <p class="fs-16">${food.foodName}(${food.foodType})} / ${food.foodWeight}g</p>
        <p class="fc__orange fs-16">${food.foodCal}kcal</p>
        <canvas id="myPieChart" width="100" height="100"></canvas>
        `;
    
        foodTable.innerHTML = `
            <tr>
                <td>단백질</td>
                <td>${food.foodProtein}(g)</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>지방</td>
                <td>${food.foodFat}(g)</td>
                <td>탄수화물</td>
                <td>${food.foodHydro}(g)</td>
            </tr>
            <tr>
                <td>당류</td>
                <td>${food.foodSugar}(g)</td>
                <td>식이섬유</td>
                <td>${food.foodFiber}50(g)</td>
            </tr>
            <tr>
                <td>나트륨</td>
                <td>${food.foodSOD}(g)</td>
                <td>콜레스테롤</td>
                <td>${food.foodCOL}(g)</td>
            </tr>
            <tr>
                <td>포화지방</td>
                <td>${food.foodSATfat}(g)</td>
                <td>트랜스지방</td>
                <td>${food.foodTransFat}(g)</td>
            </tr>
            <tr>
                <td>제조자</td>
                <td>${food.foodManufacture}</td>
                <td></td>
                <td></td>
            </tr>
            `;
        
        var ctx = document.getElementById('myPieChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
        type: 'pie',
         data: {
        labels: ['탄수화물', '단백질', '지방'],
        datasets: [{
            label: '# of Votes',
            data: [food.foodHydro, food.foodProtein, food.foodFat],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
         },
        options: {
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
                },
            title: {
                display: true,
                text: '영양소 구성'
            }
         }
        }
        });
    }
    )
    
    .catch( err => {
        console.log(err);
    })

    
}