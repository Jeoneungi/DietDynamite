const preview = document.getElementsByClassName("preview");
const inputImage = document.getElementsByClassName("inputImage");
const deleteImage = document.getElementsByClassName("delete-image");

const deleteSet = new Set(); // 삭제할 이미지 경로를 담는 Set

for (let i = 0; i < inputImage.length; i++) {
    // 이미지 파일 선택 이벤트
    inputImage[i].addEventListener("change", e => {
        const file = e.target.files[0];

        if (file !== undefined) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = e => {
                preview[i].setAttribute("src", e.target.result);
                deleteSet.delete(preview[i].getAttribute("data-original-src")); // 이전에 삭제할 이미지 목록에서 제거
            };
        } else {
            preview[i].removeAttribute("src");
        }
    });

    // 이미지 삭제 버튼 이벤트
    deleteImage[i].addEventListener("click", () => {
        if (preview[i].getAttribute("src") !== "") {
            const originalSrc = preview[i].getAttribute("data-original-src");
            preview[i].removeAttribute("src");
            inputImage[i].value = ""; // input 요소 초기화
            deleteSet.add(originalSrc); // 삭제 목록에 추가
        }
    });
}

// 폼 제출 시 삭제 이미지 목록 추가
const boardUpdateFrm = document.getElementById("boardUpdateFrm");
const boardTitle = document.getElementById("boardTitle");
const boardContent = document.querySelector("[name='boardContent']");

boardUpdateFrm.addEventListener("submit", e => {
    if (boardTitle.value.trim().length === 0) {
        alert("제목을 입력해주세요.");
        boardTitle.value = "";
        boardTitle.focus();
        e.preventDefault();
        return;
    }

    if (boardContent.value.trim().length === 0) {
        alert("내용을 입력해주세요.");
        boardContent.value = "";
        boardContent.focus();
        e.preventDefault();
        return;
    }

    // 삭제할 이미지 목록을 폼에 추가
    const deleteImagePaths = Array.from(deleteSet); // Set에서 배열로 변환
    document.querySelector("[name='deleteList']").value = deleteImagePaths.join(",");
});

// select 디폴트 값을 설정

document.querySelector("#challengeSelect option[value='" + challengeNo + "']").selected = true;