const cal = document.getElementById("cal");
const genSelect = document.getElementById("gen");
const docInput = document.getElementsByClassName("docInput");
const birthDayInput = document.getElementById("old");
const userBirthDay = birthDayInput.getAttribute("data-birth-day");

// 로그인한 사용자의 성별을 설정
const loggedInUserGender = genSelect.value;
if (loggedInUserGender !== "0") {
  genSelect.setAttribute("disabled", "disabled"); // 성별 선택 비활성화
  BMRCAL(); // 로그인한 사용자의 성별이 설정된 후 바로 칼로리 계산
} else {
  genSelect.removeAttribute("disabled"); // 성별 선택 활성화
}

for (let i = 0; i < docInput.length; i++) {
  docInput[i].addEventListener("input", () => {
    BMRCAL();
  });

  genSelect.addEventListener("change", () => {
    BMRCAL();
  });
}

function BMRCAL() {
  let hei = Number(document.getElementById("hei").value);
  let wei = Number(document.getElementById("wei").value);
  let old = Number(document.getElementById("old").value);
  let gen = genSelect.value;

  if (!isNaN(hei) && typeof hei === 'number'
    && !isNaN(wei) && typeof wei === 'number'
    && !isNaN(old) && typeof old === 'number') {

    let result;

    if (gen == "M") {
      result = 66.47 + (13.75 * wei) + (5 * hei) - (6.76 * old);
    }

    if (gen == "F") {
      result = 655.1 + (9.56 * wei) + (1.85 * hei) - (4.68 * old);
    }

    if (hei === 0 || wei === 0 || old === 0 || gen == 0) {
      result = 0;
    }

    cal.innerText = result.toFixed(1);
  }
}

// userBirthDay 값이 비어있지 않다면 자동으로 나이를 계산
if (userBirthDay && userBirthDay.length === 8) {

  // 생년월일을 연, 월, 일로 분리
  const birthYear = parseInt(userBirthDay.substring(0, 4), 10);  // 1999
  const birthMonth = parseInt(userBirthDay.substring(4, 6), 10); // 09
  const birthDay = parseInt(userBirthDay.substring(6, 8), 10);   // 24

  // 현재 날짜 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;  // 0-based (0 = January)
  const currentDay = today.getDate();

  // 나이 계산 (생일이 지났는지 확인)
  let age = currentYear - birthYear;

  // 생일이 지나지 않았다면 나이를 1살 적게 계산
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  // 나이 출력
  birthDayInput.value = age;

} else {

  // 로그인하지 않았거나 생일 정보가 없으면 사용자가 입력 가능
  birthDayInput.removeAttribute("readonly");
}

// 초기화 시 BMR 계산
BMRCAL();