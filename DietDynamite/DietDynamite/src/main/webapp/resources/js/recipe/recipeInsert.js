// 미리보기 관련 요소 모두 얻어오기
const preview = document.getElementsByClassName("preview");
const inputImage = document.getElementsByClassName("inputImage");
const deleteImage = document.getElementsByClassName("delete-image");

// 삭제된 이미지 경로를 저장할 변수
const deleteImagePathInput = document.getElementById("deleteImagePath");

for (let i = 0; i < inputImage.length; i++) {
    // 파일 선택 시 미리보기 설정
    inputImage[i].addEventListener("change", e => {
        const file = e.target.files[0]; // 선택된 파일의 데이터
        if (file != undefined) { // 파일이 선택되었을 때
            const reader = new FileReader(); // 파일을 읽는 객체
            reader.readAsDataURL(file); // 지정된 파일을 읽음
            reader.onload = e => { // 파일을 다 읽은 후 수행
                preview[i].setAttribute("src", e.target.result);
                deleteImagePathInput.value = ""; // 새 이미지가 선택되었으므로 삭제 경로 초기화
            };
        } else { // 선택 후 취소했을 때
            preview[i].removeAttribute("src"); // 미리보기 삭제
        }
    });

    // 미리보기 삭제(x버튼)
    deleteImage[i].addEventListener("click", () => {
        if (preview[i].getAttribute("src") != "") {
            preview[i].removeAttribute("src"); // 미리보기 삭제
            inputImage[i].value = ""; // 파일 선택 삭제

            // 기존 이미지 경로를 hidden 필드에 저장
            deleteImagePathInput.value = preview[i].src;
        }
    });
}