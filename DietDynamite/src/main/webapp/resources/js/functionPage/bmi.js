

const bmi = document.getElementById("bmi");

const myst = document.getElementById("myst");

const docInput = document.getElementsByClassName("docInput");


(()=>{
    BMICAL();
})()


for (let i = 0; i < docInput.length; i++) {
    docInput[i].addEventListener("input", () => {
        BMICAL();
    }
    )
};



function BMICAL() {
    let hei = Number(document.getElementById("hei").value);
    let wei = Number(document.getElementById("wei").value);

    // 둘다 입력했을 경우
    if (document.getElementById("hei").value.trim().length != 0 &&
        document.getElementById("wei").value.trim().length != 0) {

        // 입력한 값이 숫자일 경우에만
        if (!isNaN(hei) && typeof hei === 'number'
            && !isNaN(wei) && typeof wei === 'number') {



            // bmi 계산
            let result = (wei / (hei / 100 * hei / 100));

            if (hei === 0 || wei === 0) {
                result = 0
            }

            // 결과 값 소수점 한 자리만 남기기
            bmi.innerText = result.toFixed(1);

            // 나의 상태용 메세지
            let mystMsg = "";

            switch (true) {
                case (result <= 18.5):
                    mystMsg = "저체중"
                    myst.style.color = "black"
                    break;

                case (result > 18.5 && result <= 22.9):
                    mystMsg = "정상 체중"
                    myst.style.color = "#63BD44"

                    break;

                case (result >= 23 && result <= 24.9):
                    mystMsg = "비만 전 단계"
                    myst.style.color = "#7D8D16"
                    break;

                case (result >= 25 && result <= 29):
                    mystMsg = "1단계 비만"
                    myst.style.color = "#A18231"
                    break;

                case (result >= 30 && result <= 34.9):
                    mystMsg = "2단계 비만"
                    myst.style.color = "#92522E"
                    break;

                case (result >= 35):
                    mystMsg = "3단계 비만"
                    myst.style.color = "#EC3434"
                    break;
            }

            myst.innerText = mystMsg;

        }
    }
}






