document.addEventListener('DOMContentLoaded', function() {
    const exerciseListModal = document.getElementById('exerciseListModal');
    const exerciseDetailModal = document.getElementById('exerciseDetailModal');
    const openExerciseBtn = document.getElementById('openExerciseBtn');
    const closeModalBtns = document.querySelectorAll('.close-btn');
    const exerciseItemsContainer = document.getElementById('exerciseItems');
    const exerciseSearchBtn = document.getElementById('exerciseSearchBtn');
    const exerciseQuery = document.getElementById('exerciseQuery');
    const totalCalElement = document.getElementById('totalCal'); // Total Calories element
    let totalCalories = parseFloat(totalCalElement.textContent) || 0; // Initial total calories

    // 운동 목록 모달 열기
    if (openExerciseBtn) {
        openExerciseBtn.addEventListener('click', function () {
            exerciseListModal.style.display = "block";
        });
    }

    // 모달 닫기 버튼 처리
    closeModalBtns.forEach(button => {
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

        totalCalories += caloriesBurned;
        totalCalElement.textContent = `총 소모 칼로리: ${totalCalories.toFixed(2)}kcal`; 

        exerciseDetailModal.style.display = "none"; 
    });

    // 모달 외부 클릭 시 모달 닫기 
    window.addEventListener('click', function(event) {
        if (event.target === exerciseListModal || event.target === exerciseDetailModal) {
            exerciseListModal.style.display = "none";
            exerciseDetailModal.style.display = "none";
        } else if (event.target === foodListModal || event.target === foodDetailModal) {
            foodListModal.style.display = "none";
            foodDetailModal.style.display = "none";
        }
    });
});
    
