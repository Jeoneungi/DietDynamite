document.addEventListener('DOMContentLoaded', function() {
    const foodListModal = document.getElementById("foodListModal");
    const foodDetailModal = document.getElementById("foodDetailModal");
    const openFoodBtn = document.getElementById("openFoodBtn");
    const closeModalBtns = document.querySelectorAll('.modal .close-btn');
    const foodItemsContainer = document.querySelector(".food-items");
    const totalCalElement = document.getElementById("totalCal");
    let totalCalories = 0; // 누적 칼로리

    // 음식 목록 모달 열기
    openFoodBtn.addEventListener('click', function () {
        foodListModal.style.display = "block";
    });

    closeModalBtns.forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    // 음식 검색
    const query = document.getElementById("query");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", e => {
        e.preventDefault();

        const data = { query: query.value };

        fetch("/diary/searchFood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            foodItemsContainer.innerHTML = ''; 
            result.forEach(food => {
                const foodItemHTML = `
                <div class="food-item" data-name="${food.foodName}" data-serving="${food.foodWeight}" data-calories="${food.foodCal}">
                    <div class="badge fs-12">${food.foodCnt}회 이상</div>
                    <div class="food-info">
                        <div class="food-details">
                            <p class="fs-12">${food.foodName}</p>
                            <p class="fs-12">중량: ${food.foodWeight}g</p>
                        </div>
                        <p class="fs-12 kcal">열량: ${food.foodCal}kcal</p>
                    </div>
                </div>`;
                foodItemsContainer.innerHTML += foodItemHTML;
            });
        })
        .catch(err => {
            console.log("예외 발생");
            console.log(err);
        });
    });

    // 음식 아이템 클릭 시 상세 모달 내용 업데이트 및 표시
    foodItemsContainer.addEventListener('click', function(event) {
        const item = event.target.closest('.food-item');
        if (item) {
            const foodName = item.getAttribute('data-name');
            const servingSize = item.getAttribute('data-serving');
            const calories = item.getAttribute('data-calories');

            // 상세 모달 내용 업데이트
            document.getElementById('foodName').textContent = foodName;
            document.getElementById('servingSize').textContent = `기본중량: ${servingSize}`;
            document.getElementById('calories').textContent = calories;

            // 수량 입력 필드와 칼로리 업데이트
            const quantityInput = document.getElementById('quantityInput');
            quantityInput.value = 1;
            updateCalories(calories, 1);

            // 음식 목록 모달 닫기
            foodListModal.style.display = "none";

            // 상세 모달 열기
            foodDetailModal.style.display = "block";
        }
    });

    // 수량 선택기 조절
    const quantityInput = document.getElementById('quantityInput');
    const quantityPlus = document.getElementById('quantityPlus');
    const quantityMinus = document.getElementById('quantityMinus');

    quantityPlus.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity)) quantity = 1;
        quantity++;
        quantityInput.value = quantity;
        updateCalories(parseFloat(document.getElementById('calories').getAttribute('data-calories')), quantity);
    });

    quantityMinus.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity)) quantity = 1;
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateCalories(parseFloat(document.getElementById('calories').getAttribute('data-calories')), quantity);
        }
    });

    function updateCalories(caloriesPerUnit, quantity) {
        if (isNaN(caloriesPerUnit) || isNaN(quantity)) {
            console.error("칼로리 값이나 수량이 유효하지 않습니다.");
            return;
        }
        const totalCalories = caloriesPerUnit * quantity;
        document.getElementById('calories').textContent = `${totalCalories.toFixed(1)}kcal`;
    }

    // 음식 상세 모달에서 "오늘 일기에 추가하기" 버튼 클릭 시
    document.getElementById('addToDiaryBtn').addEventListener('click', function () {
        const foodName = document.getElementById('foodName').textContent;
        const servingSize = document.getElementById('servingSize').textContent;
        const calories = document.getElementById('calories').textContent;

        // "오늘 먹은 음식" 섹션에 음식 추가
        const todayFoodSection = document.getElementById('food-item');

        // 음식 항목 생성
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-entry');
        foodItem.innerHTML = `<p class="fs-12">${foodName}&nbsp;&nbsp;${servingSize}g&nbsp;&nbsp;${calories}</p>`;

        // 항목 추가
        todayFoodSection.appendChild(foodItem);

        // 누적 칼로리 업데이트
        const caloriesValue = parseFloat(calories);
        if (!isNaN(caloriesValue)) {
            totalCalories += caloriesValue;
            totalCalElement.textContent = `섭취량: ${totalCalories.toFixed(1)}kcal`;
        }

        // 상세 모달 닫기
        foodDetailModal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == foodListModal || event.target == foodDetailModal) {
            foodListModal.style.display = "none";
            foodDetailModal.style.display = "none";
        }
    });
});
