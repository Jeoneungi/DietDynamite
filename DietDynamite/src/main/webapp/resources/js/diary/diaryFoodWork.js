let foodItemsList = [];
const exerciseListModal = document.getElementById('exerciseListModal');
const exerciseDetailModal = document.getElementById('exerciseDetailModal');
const openExerciseBtn = document.getElementById('openExerciseBtn');
const exerciseItemsContainer = document.getElementById('exerciseItems');
const exerciseSearchBtn = document.getElementById('exerciseSearchBtn');
const exerciseQuery = document.getElementById('exerciseQuery');
const totalCalElement = document.getElementById('totalCal');
const totalKgElement = document.getElementById('totalKg'); // 수정된 부분

let totalCalories = 0; 
let totalIntakeCalories = 0; 
let totalBurnedCalories = 0; 
let weight = 70; 

document.addEventListener('DOMContentLoaded', function() {

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
                        <div class="exercise-item" data-workoutno="${exercise.workoutNo}" data-name="${exercise.workoutName}" data-calories="${exercise.workoutMet}" data-repetitions="${exercise.workoutCnt}">
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
            const workoutNo = item.getAttribute('data-workoutno');
            const exerciseName = item.getAttribute('data-name');
            const calories = item.getAttribute('data-calories'); 
            const repetitions = item.getAttribute('data-repetitions');

            document.getElementById('exerciseDetailName').textContent = exerciseName;
            document.getElementById('exerciseDetailCalories').textContent = `${calories}kcal`;
            document.getElementById('exerciseDetailCalories').setAttribute('data-calories', calories); 
            document.getElementById('exerciseDetailCalories').setAttribute('data-original-calories', calories); 
            document.getElementById('exerciseDetailBadge').textContent = `${repetitions}회 이상`;

            document.getElementById('exerciseAddToDiaryBtn').setAttribute('data-workoutno', workoutNo);

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

    // 운동 정보를 일기에 추가
    document.getElementById('exerciseAddToDiaryBtn').addEventListener('click', function () {
        const exerciseName = document.getElementById('exerciseDetailName').textContent;
        const minutes = document.getElementById('exerciseMinute').value;
        const caloriesBurned = parseFloat(document.getElementById('exerciseDetailCalories').textContent);
        const workoutNo = this.getAttribute('data-workoutno'); // workoutNo 가져오기

        const workItemSection = document.getElementById('work-item');
        
        const exerciseEntry = document.createElement('div');
        exerciseEntry.classList.add('exercise-entry');
        exerciseEntry.setAttribute('data-workoutno', workoutNo); // workoutNo 저장
        exerciseEntry.innerHTML = `<p class="fs-12">${exerciseName}&nbsp;&nbsp;${minutes}분&nbsp;&nbsp;${caloriesBurned} 칼로리 <button class="delete-exercise-btn">삭제</button> </p>`;
        
        workItemSection.appendChild(exerciseEntry);
       
        totalBurnedCalories += caloriesBurned;
        totalCalories = totalIntakeCalories - totalBurnedCalories;
        totalKgElement.textContent = `체중 변화: ${calculateWeightChange(totalCalories)} kg`;
        
        totalCalElement.textContent = `총 칼로리: 섭취량: ${totalIntakeCalories.toFixed(2)}kcal, 소모: ${totalBurnedCalories.toFixed(2)}kcal, 누적: ${totalCalories.toFixed(2)}kcal`;
        
        exerciseDetailModal.style.display = "none";
    });

    
    // 음식 목록 모달 및 상세 모달 코드
    const foodListModal = document.getElementById("foodListModal");
    const foodDetailModal = document.getElementById("foodDetailModal");
    const openFoodBtn = document.getElementById("openFoodBtn");
    const foodItemsContainer = document.querySelector(".food-items");
    const query = document.getElementById("query");
    const searchBtn = document.getElementById("searchBtn");

    let selectedFoodNo = null; 


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
            foodItemsList = result;
            console.log("foodItemsList ");
            if (result.length === 0) {
                foodItemsContainer.innerHTML = '<p class="fs-12">검색 결과가 없습니다.</p>';
            } else {
            result.forEach(food => {
                const foodItemHTML = `
                <div class="food-item" data-foodno="${food.foodNo}" data-name="${food.foodName}" data-serving="${food.foodWeight}" data-calories="${food.foodCal}">
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
        }
        })
        .catch(err => {
            console.log("예외 발생", err);
        });
    });

  

    // 음식 아이템 클릭 시 상세 모달 내용 업데이트 및 표시
    foodItemsContainer.addEventListener('click', function(event) {
        const item = event.target.closest('.food-item');
        if (item) {
            selectedFoodNo = item.getAttribute('data-foodno'); 
            const foodName = item.getAttribute('data-name');
            const foodWeight = item.getAttribute('data-serving');
            const calories = item.getAttribute('data-calories');

            document.getElementById('foodName').textContent = foodName;
            document.getElementById('foodWeight').textContent = `${foodWeight}g`;
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
    
         // 중량 업데이트
         const foodWeight = parseFloat(document.getElementById('foodWeight').textContent);
         const totalWeight = foodWeight * quantity;
         document.getElementById('foodWeight').textContent = `${totalWeight}g`;
    
    });

    quantityMinus.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity)) quantity = 1;
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateCalories(parseFloat(document.getElementById('calories').getAttribute('data-calories')), quantity);
            
             // 중량 업데이트
             const foodWeight = parseFloat(document.querySelector('.food-item[data-foodno="' + selectedFoodNo + '"]').getAttribute('data-serving'));
             const totalWeight = foodWeight * quantity;
             document.getElementById('foodWeight').textContent = `${totalWeight}g`;
        
        }
    });

    function updateCalories(caloriesPerUnit, quantity) {
        if (isNaN(caloriesPerUnit) || isNaN(quantity)) {
            console.error("칼로리 값이나 수량이 유효하지 않습니다.");
            return;
        }
        const totalCaloriesForItem = caloriesPerUnit * quantity;
        document.getElementById('calories').setAttribute('data-calories', caloriesPerUnit);
        document.getElementById('calories').textContent = `${totalCaloriesForItem.toFixed(1)}kcal`;
    }

    // 음식 정보를 일기에 추가
    document.getElementById('addToDiaryBtn').addEventListener('click', function () {
        const foodName = document.getElementById('foodName').textContent;
        const servingSize = parseInt(document.getElementById('quantityInput').value, 10); // 섭취량
        const caloriesPerUnit = parseFloat(document.getElementById('calories').textContent); // 칼로리/단위
        const totalCalories = (caloriesPerUnit * servingSize).toFixed(1);
        
        //중량계산
        const foodWeight = parseFloat(document.getElementById('foodWeight').textContent); // 총 중량
        const totalWeight = foodWeight * servingSize; // 총 중량 계산

        const todayFoodSection = document.getElementById('food-item');
        
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-entry');
        foodItem.innerHTML = `<p class="fs-12">${foodName}&nbsp;&nbsp;${servingSize}g&nbsp;&nbsp;${totalCalories}kcal <button class="delete-food-btn">삭제</button></p>`;
        
        todayFoodSection.appendChild(foodItem);
        
        
        const caloriesValue = parseFloat(totalCalories);
        if (!isNaN(caloriesValue)) {
            totalIntakeCalories += caloriesValue;
            let totalCalories = totalIntakeCalories - totalBurnedCalories;
            totalCalories = totalIntakeCalories - totalBurnedCalories;
            totalKgElement.textContent = `체중 변화: ${calculateWeightChange(totalCalories)} kg`;
            totalCalElement.textContent = `총 칼로리: 섭취량: ${totalIntakeCalories.toFixed(2)}kcal, 소모: ${totalBurnedCalories.toFixed(2)}kcal, 누적: ${totalCalories.toFixed(2)}kcal`;
        }
        
        foodDetailModal.style.display = "none";
    });

    // 예상 체중 감소량 계산 
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


function getFoodItemsFromModal() {
    const foodItems = [];
      
    // 모든 .food-entry 요소를 순회
    Array.from(document.querySelectorAll('.food-entry')).forEach(entry => {
        const textContent = entry.querySelector('p').textContent;

        // 텍스트 내용에서 음식 이름, 섭취량, 칼로리 추출
        const parts = textContent.split(/\s{2,}/); // 두 개 이상의 공백으로 분리
        if (parts.length === 3) {
            const foodName = parts[0];
            const servingSizeMatch = parts[1].match(/(\d+)g/);
            const caloriesMatch = parts[2].match(/(\d+(?:\.\d+)?)kcal/);
            
            const servingSize = servingSizeMatch ? parseInt(servingSizeMatch[1], 10) : 0;
            const totalCalories = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0;
            
            const foodNo = getFoodNoFromName(foodName);

            foodItems.push({
                foodNo: foodNo,
                foodName: foodName,
                servingSize: servingSize,
                totalCalories: totalCalories
            });
        }
    });
    
    return foodItems;
}

// 식품 이름으로 foodNo를 가져오는 함수
function getFoodNoFromName(foodName) {
    console.log('Searching for foodName:', foodName); // 디버깅을 위한 로그

    const foodItem = foodItemsList.find(item => item.foodName === foodName);
    console.log('Found foodItem:', foodItem); // 디버깅을 위한 로그

    return foodItem ? foodItem.foodNo : null;
}

// 음식 항목 삭제
document.getElementById('food-item').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-food-btn')) {
        event.preventDefault(); // 폼 제출 방지

        const entry = event.target.closest('.food-entry');
        
        // 음식 칼로리를 텍스트에서 추출하여 숫자로 변환
        const caloriesText = entry.querySelector('p').textContent.split(/\s{2,}/)[2];
        const calories = parseFloat(caloriesText.replace('kcal', '').trim());

        if (!isNaN(calories)) {
            // UI에서 항목 제거
            entry.remove(); 

            // 총 섭취 칼로리에서 삭제된 칼로리만큼 빼기
            totalIntakeCalories -= calories;

            // 칼로리 값이 0 미만으로 내려가는 경우 0으로 설정
            totalIntakeCalories = Math.max(totalIntakeCalories, 0);

            // 총 칼로리 및 체중 변화량 업데이트
            updateTotalCalories();
        } else {
            console.error("칼로리 값이 유효하지 않습니다:", caloriesText);
        }
    }
});

// 칼로리 변화로 체중 변화를 계산하는 함수 (단위: kg)
function calculateWeightChange(totalCalories) {
    const caloriesPerKg = 7700; // 1kg 체중 변화에 필요한 칼로리
    return (totalCalories / caloriesPerKg).toFixed(2); // 소수점 둘째 자리까지 표시
}

// 총 칼로리 업데이트 함수
function updateTotalCalories() {
    const totalCalories = totalIntakeCalories - totalBurnedCalories;

    totalKgElement.textContent = `체중 변화: ${calculateWeightChange(totalCalories)} kg`;
    totalCalElement.textContent = `총 칼로리: 섭취량: ${totalIntakeCalories.toFixed(2)}kcal, 소모: ${totalBurnedCalories.toFixed(2)}kcal, 누적: ${totalCalories.toFixed(2)}kcal`;

    // 총 칼로리와 체중 변화가 0이면 UI에서 제거
    if (totalIntakeCalories === 0 && calculateWeightChange(totalCalories) === "0.00") {
        totalKgElement.textContent = '';  // 체중 변화 텍스트 제거
        totalCalElement.textContent = ''; // 칼로리 텍스트 제거
    }
}



// 운동 항목 삭제
document.getElementById('work-item').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-exercise-btn')) {
        event.preventDefault(); // 폼 제출 방지

        const entry = event.target.closest('.exercise-entry');
        const calories = parseFloat(entry.querySelector('p').textContent.split(/\s{2,}/)[2].replace(' 칼로리', ''));

        // UI에서 항목 제거
        entry.remove(); 
        totalBurnedCalories -= calories;
        updateTotalCalories();
    }
});


function getWorkoutsFromModal() {
    const workoutItems = [];
    
    // 모든 .exercise-entry 요소를 순회
    Array.from(document.querySelectorAll('.exercise-entry')).forEach(entry => {
        const textContent = entry.querySelector('p').textContent;

        // 텍스트 내용에서 운동 이름, 시간, 칼로리 추출
        const parts = textContent.split(/\s{2,}/); // 두 개 이상의 공백으로 분리
        if (parts.length === 3) {
            const workoutName = parts[0];
            const minutesMatch = parts[1].match(/(\d+)분/);
            const caloriesMatch = parts[2].match(/(\d+(?:\.\d+)?) 칼로리/);
            const duration = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
            const caloriesBurned = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0;
            
            const workoutNo = entry.getAttribute('data-workoutno');


            workoutItems.push({
                workoutNo : workoutNo,
                workoutName: workoutName,
                duration: duration,
                caloriesBurned: caloriesBurned
            });
        }
    });
    
    return workoutItems;
}



document.getElementById('diaryWriteFrm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // foods 및 workouts 데이터 추가
    formData.append('foods', JSON.stringify(getFoodItemsFromModal()));
    formData.append('exercises', JSON.stringify(getWorkoutsFromModal()));

    // 폼 데이터와 JSON 데이터를 포함하여 서버로 전송
    fetch(form.action, {
        method: 'POST',
        body: formData
    })


    .then(response => response.text()) // 응답을 텍스트로 받음
    .then(text => {
        console.log(text); // 응답 내용을 로그에 출력
        try {
            const data = JSON.parse(text); // 응답을 JSON으로 파싱
            if (data.success) {
                alert("게시글 등록 성공");
                window.location.href = `/diary/${data.boardType}/${data.boardNo}`;
            } else {
                alert(data.message || '게시글 등록 실패');
            }
        } catch (e) {
            console.error('응답을 JSON으로 파싱하는 중 오류 발생:', e);
        }
    })
    .catch(error => console.error('서버 오류:', error));
});

