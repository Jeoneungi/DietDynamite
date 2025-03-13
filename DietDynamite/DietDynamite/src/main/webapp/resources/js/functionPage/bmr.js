const cal = document.getElementById("cal");

const genSelect = document.getElementById("gen");

const docInput = document.getElementsByClassName("docInput");

for (let i = 0; i < docInput.length; i++) {
    docInput[i].addEventListener("input", () => {
        BMRCAL();
    }
    )
    
    genSelect.addEventListener("change", () => {
        BMRCAL();
    })

};


function BMRCAL() {
    let hei = Number(document.getElementById("hei").value);
    let wei = Number(document.getElementById("wei").value);
    let old = Number(document.getElementById("old").value);
    let gen = genSelect.value;



    if (!isNaN(hei) && typeof hei === 'number'
    && !isNaN(wei) && typeof wei === 'number'
    && !isNaN(old) && typeof old === 'number') {

    let result ;

    if( gen == "M"){
        result = 66.47 + (13.75 * wei) + (5 + hei) + (6.76 * old);
    }

    if(gen == "F"){
        result = 655.1 + (9.56 * wei) + (1.85 + hei) + (4.68 * old);
    }

    if (hei === 0 || wei === 0 || old === 0 || gen == 0) {
        result = 0;
    }

    cal.innerText = result.toFixed(1);

}
}