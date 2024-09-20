// 미리보기 관련 요소 모두 얻어오기
const preview = document.getElementsByClassName("preview");
const inputImage = document.getElementsByClassName("inputImage");
const deleteImage = document.getElementsByClassName("delete-image");

// 삭제된 이미지 경로를 저장할 변수
const deleteImagePathInput = document.getElementById("deleteImagePath");


    inputImage[0].addEventListener("change", e => {
        const file = e.target.files[0]; // 선택된 파일의 데이터
        if (file != undefined) { // 파일이 선택되었을 때
            const reader = new FileReader(); // 파일을 읽는 객체
            reader.readAsDataURL(file); // 지정된 파일을 읽음
            reader.onload = e => { // 파일을 다 읽은 후 수행
                preview[0].setAttribute("src", e.target.result);
                deleteImagePathInput.value = ""; // 새 이미지가 선택되었으므로 삭제 경로 초기화
            };
        } else { // 선택 후 취소했을 때
            preview[0].removeAttribute("src"); // 미리보기 삭제
        }
    });

    // 미리보기 삭제(x버튼)
    deleteImage[0].addEventListener("click", () => {
        if (preview[0].getAttribute("src") != "") {
            preview[0].removeAttribute("src"); // 미리보기 삭제
            inputImage[0].value = ""; // 파일 선택 삭제

            // 기존 이미지 경로를 hidden 필드에 저장
            deleteImagePathInput.value = preview[0].src;
        }
    });


// 폼 제출 시
const diaryWriteFrm = document.getElementById("diaryWriteFrm");
const diaryTitle = document.getElementById("diaryTitle");
const boardContent = document.querySelector("[name='boardContent']");

diaryWriteFrm.addEventListener("submit", e => {
    if (diaryTitle.value.trim().length == 0) {
        alert("제목을 입력해주세요.");
        diaryTitle.value = "";
        diaryTitle.focus();
        e.preventDefault();
        return;
    }

    if (boardContent.value.trim().length == 0) {
        alert("내용을 입력해주세요.");
        boardContent.value = "";
        boardContent.focus();
        e.preventDefault();
        return;
    }
});