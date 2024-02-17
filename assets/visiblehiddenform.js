let dropdownBtn = document.getElementsByClassName("dropdownBtn")[0];
const hiddenForm = document.getElementById("player-form");
let videoArea = document.getElementById("player-container");
dropdownBtn.addEventListener('click',
    function () {

        //화면에 보이지 않는 상태면 보이게(가장 처음 시작시 빈값이 들어가서 그것도 같이 체크)
        if (hiddenForm.style.display === "" || hiddenForm.style.display === "none") {
            hiddenForm.style.display = "block";
            hiddenForm.style.marginTop = "2px";
            hiddenForm.style.height = "5%";
            dropdownBtn.innerHTML = "▴";
            videoArea.style.height = "82%";
        } else {
            hiddenForm.style.display = "none";
            dropdownBtn.innerHTML = "▾"
            videoArea.style.height = "95%";
        }
    });
