document.addEventListener('DOMContentLoaded', function() {
    const exerciseListModal = document.getElementById('exerciseListModal');
    const exerciseDetailModal = document.getElementById('exerciseDetailModal');
    const openExerciseBtn = document.getElementById('openExerciseBtn');
    const exerciseItemsContainer = document.getElementById('exerciseItems');
    const exerciseSearchBtn = document.getElementById('exerciseSearchBtn');
    const exerciseQuery = document.getElementById('exerciseQuery');
    const totalCalElement = document.getElementById('totalCal');
    const totalKgElement = document.getElementById('tatalKg'); 

    let totalCalories = 0; 
    let totalIntakeCalories = 0; 
    let totalBurnedCalories = 0; 
    let weight = 70; 

    // 운동 목록 모달 열기
    if (openExerciseBtn) {
        openExerciseBtn.addEventListener('click', function () {
            exerciseListModal.style.display = "block";
        });
    }

    // 모달 닫기 버튼 처리
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    // 운동 검색 버튼 클릭 시 검색 수행
    if (exerciseSearchBtn) {
        exerciseSearchBtn.addEventListener('click', e => {
            e.preventDefault();

            const data = { query: exerciseQuery.value };

            fetch("/diary/searchWorkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                exerciseItemsContainer.innerHTML = ''; 
                if (result.length === 0) {
                    exerciseItemsContainer.innerHTML = '<p class="fs-12">검색 결과가 없습니다.</p>';
                } else {
                    result.forEach(exercise => {
                        const exerciseItemHTML = `
                        <div class="exercise-item" data-name="${exercise.workoutName}" data-calories="${exercise.workoutMet}" data-repetitions="${exercise.workoutCnt}">
                            <div class="badge fs-12">${exercise.workoutCnt}회 이상</div>
                            <div class="exercise-info">
                                <div class="exercise-details">
                                    <p class="fs-12">${exercise.workoutName}</p>
                                    <p class="fs-12">열량: ${exercise.workoutMet}kcal</p>
                                </div>
                            </div>
                        </div>`;
                        exerciseItemsContainer.innerHTML += exerciseItemHTML;
                    });
                }
            })
            .catch(err => {
                console.error("예외 발생", err);
            });
        });
    }

    // 운동 항목 클릭 시 운동 상세 모달 표시
    exerciseItemsContainer.addEventListener('click', function(event) {
        const item = event.target.closest('.exercise-item');
        if (item) {
            const exerciseName = item.getAttribute('data-name');
            const calories = item.getAttribute('data-calories'); 
            const repetitions = item.getAttribute('data-repetitions');

            document.getElementById('exerciseDetailName').textContent = exerciseName;
            document.getElementById('exerciseDetailCalories').textContent = `${calories}kcal`;
            document.getElementById('exerciseDetailCalories').setAttribute('data-calories', calories); 
            document.getElementById('exerciseDetailCalories').setAttribute('data-original-calories', calories); 
            document.getElementById('exerciseDetailBadge').textContent = `${repetitions}회 이상`;

            exerciseListModal.style.display = "none";
            exerciseDetailModal.style.display = "block";
        }
    });

    // 시간과 몸무게 입력 시 칼로리 자동 계산
    document.getElementById('exerciseKg').addEventListener('input', calculateCalories);
    document.getElementById('exerciseMinute').addEventListener('input', calculateCalories);

    function calculateCalories() {
        const weight = document.getElementById('exerciseKg').value;
        const minutes = document.getElementById('exerciseMinute').value;
        const MET = document.getElementById('exerciseDetailCalories').getAttribute('data-calories'); 
        const originalCalories = document.getElementById('exerciseDetailCalories').getAttribute('data-original-calories'); 
        if (weight && minutes && MET) {
            // 칼로리: MET * 체중(kg) * 시간(h)
            const hours = minutes / 60;
            const caloriesBurned = (MET * weight * hours).toFixed(2);

            document.getElementById('exerciseDetailCalories').textContent = `${caloriesBurned}kcal`;
            
        } else {
            document.getElementById('exerciseDetailCalories').textContent = `${originalCalories}kcal`;
        }
    }

    // 운동 상세 모달에서 운동을 일기에 추가 (오늘 일기 추가)
    document.getElementById('exerciseAddToDiaryBtn').addEventListener('click', function () {
        const exerciseName = document.getElementById('exerciseDetailName').textContent;
        const minutes = document.getElementById('exerciseMinute').value;
        const caloriesBurned = parseFloat(document.getElementById('exerciseDetailCalories').textContent); 

        const workItemSection = document.getElementById('work-item'); 

        const exerciseEntry = document.createElement('div');
        exerciseEntry.classList.add('exercise-entry');
        exerciseEntry.innerHTML = `<p class="fs-12">${exerciseName}&nbsp;&nbsp;${minutes}분&nbsp;&nbsp;${caloriesBurned} 칼로리</p>`;

        workItemSection.appendChild(exerciseEntry);

        totalBurnedCalories += caloriesBurned;
        totalCalories = totalIntakeCalories - totalBurnedCalories;
        totalKgElement.textContent = `체중 변화: ${calculateWeightChange(totalCalories)} kg`;

        totalCalElement.textContent = `총 칼로리: 섭취량: ${totalIntakeCalories.toFixed(2)}kcal, 소모: ${totalBurnedCalories.toFixed(2)}kcal, 누적: ${totalCalories.toFixed(2)}kcal`; // Update total calories

        exerciseDetailModal.style.display = "none"; // Close modal
    });

    // 음식 목록 모달 및 상세 모달 코드
    const foodListModal = document.getElementById("foodListModal");
    const foodDetailModal = document.getElementById("foodDetailModal");
    const openFoodBtn = document.getElementById("openFoodBtn");
    const foodItemsContainer = document.querySelector(".food-items");
    const query = document.getElementById("query");
    const searchBtn = document.getElementById("searchBtn");

    // 음식 목록 모달 열기
    openFoodBtn.addEventListener('click', function () {
        foodListModal.style.display = "block";
    });

    // 음식 검색
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
            console.log("예외 발생", err);
        });
    });

    // 음식 아이템 클릭 시 상세 모달 내용 업데이트 및 표시
    foodItemsContainer.addEventListener('click', function(event) {
        const item = event.target.closest('.food-item');
        if (item) {
            const foodName = item.getAttribute('data-name');
            const servingSize = item.getAttribute('data-serving');
            const calories = item.getAttribute('data-calories');

            document.getElementById('foodName').textContent = foodName;
            document.getElementById('servingSize').textContent = `기본중량: ${servingSize}`;
            document.getElementById('calories').textContent = calories;

            const quantityInput = document.getElementById('quantityInput');
            quantityInput.value = 1;
            updateCalories(calories, 1);

            foodListModal.style.display = "none";
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
        const totalCaloriesForItem = caloriesPerUnit * quantity;
        document.getElementById('calories').textContent = `${totalCaloriesForItem.toFixed(1)}kcal`;
    }

    // 음식 상세 모달에서 "오늘 일기에 추가하기" 버튼 클릭 시
    document.getElementById('addToDiaryBtn').addEventListener('click', function () {
        const foodName = document.getElementById('foodName').textContent;
        const servingSize = document.getElementById('servingSize').textContent;
        const calories = document.getElementById('calories').textContent;

        const todayFoodSection = document.getElementById('food-item');

        const foodItem = document.createElement('div');
        foodItem.classList.add('food-entry');
        foodItem.innerHTML = `<p class="fs-12">${foodName}&nbsp;&nbsp;${servingSize}g&nbsp;&nbsp;${calories}</p>`;

        todayFoodSection.appendChild(foodItem);

        const caloriesValue = parseFloat(calories);
        if (!isNaN(caloriesValue)) {
            totalIntakeCalories += caloriesValue;
            totalCalories = totalIntakeCalories - totalBurnedCalories;
            totalKgElement.textContent = `체중 변화: ${calculateWeightChange(totalCalories)} kg`;
            totalCalElement.textContent = `총 칼로리: 섭취량: ${totalIntakeCalories.toFixed(2)}kcal, 소모: ${totalBurnedCalories.toFixed(2)}kcal, 누적: ${totalCalories.toFixed(2)}kcal`;
        }

        foodDetailModal.style.display = "none";
    });

    //예상체중증감량 계산 
    function calculateWeightChange(totalCalories) {
        const weightChange = totalCalories / 7700;
        return weightChange;
    }

    window.addEventListener('click', function(event) {
        if (event.target === foodListModal || event.target === foodDetailModal) {
            foodListModal.style.display = "none";
            foodDetailModal.style.display = "none";
        } else if (event.target === exerciseListModal || event.target === exerciseDetailModal) {
            exerciseListModal.style.display = "none";
            exerciseDetailModal.style.display = "none";
        }
    });
});
