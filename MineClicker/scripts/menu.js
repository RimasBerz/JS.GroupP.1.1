"use strict";

//const myButton = document.getElementById("myButton");
const newGameButton = document.getElementById("newGame");
const continueButton = document.getElementById("continueGame");
const muteMusicButton = document.getElementById("muteMusic");
const SaveProgressButton = document.getElementById("SaveProgress");
const manual = document.getElementById("manual");
const mainDiv = document.querySelector(".maindiv");
const close = document.getElementById("close");
/*const SellAllButton = document.getElementById("SellAll")*/
const audio = new Audio("sounds/audiosaundtreck1.mp3");
audio.volume = 0.3;

const importButton = document.getElementById("import");
const exportButton = document.getElementById("export");
exportButton.style.display = "none";

/*
myButton.addEventListener("click", function () {
    //myButton.disabled = true;
    //myButton.style.animation = "blink 1.5s linear infinite";
    

    setTimeout(function () {
        //myButton.style.animation = "disappear 0.5s linear forwards";
        setTimeout(function () {
            myButton.style.display = "none";
        }, 500);
    }, 1500);
    //myButton.classList.add("animated");
    //myButton.classList.add("fadeOut");

    setTimeout(function () {
        newGameButton.removeAttribute("disabled");
        continueButton.removeAttribute("disabled");
        muteMusicButton.removeAttribute("disabled");
        manual.removeAttribute("disabled");
//   SellAllButton.removeAttribute("disabled");
        newGameButton.style.transition = "opacity 0.5s ease-in-out";
        continueButton.style.transition = "opacity 0.5s ease-in-out";
        muteMusicButton.style.transition = "opacity 0.5s ease-in-out";
        newGameButton.style.transition = "opacity 0.5s ease-in-out";
        manual.style.transition = "opacity 0.5s ease-in-out";
// SellAllButton.style.transition = "opacity 0.7s ease-in-out";
        newGameButton.style.display = "block";
        continueButton.style.display = "block";
        muteMusicButton.style.display = "block";
        manual.style.display = "block";
    }, 2000);
});



document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        myButton.click();
        startGame();
    }
});
*/

function startGame() {
    myButton.style.display = "none";
    myButton.classList.add("animated", "fadeOut");
    audio.play();
    setTimeout(function () {
        myButton.style.display = "none";
    }, 1000);
}
setTimeout(function () {

    newGameButton.style.display = "block";
    continueButton.style.display = "block";
    SaveProgressButton.style.display = "block";
    muteMusicButton.style.display = "block";
    manual.style.display = "block";
}, 0);


let isMusicOn = true;

muteMusicButton.addEventListener("click", function () {
    if (isMusicOn) {
        audio.pause();
        isMusicOn = false;
        muteMusicButton.textContent = "Unmute music";
    } else {
        audio.play();
        isMusicOn = true;
        muteMusicButton.textContent = "Mute music";
    }
});
