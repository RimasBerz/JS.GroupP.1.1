"use strict";

const myButton = document.getElementById("myButton");
const newGameButton = document.getElementById("newGame");
const continueButton = document.getElementById("continueGame");
const muteMusicButton = document.getElementById("muteMusic");
const SaveProgressButton = document.getElementById("SaveProgress");
const mainDiv = document.querySelector(".maindiv");
const lessonButton = document.getElementById("lessonbutton")
const audio = new Audio("sounds/audiosaundtreck1.mp3");
audio.volume = 0.3;
const ST1 = document.createElement("img");
ST1.id = "ST1";
ST1.src = "pictures/ST1.png";
document.querySelector(".maindiv").appendChild(ST1);
myButton.addEventListener("click", function () {
    myButton.disabled = true;
    myButton.style.animation = "blink 1.5s linear infinite";
    audio.play();
    setTimeout(function () {
        myButton.style.animation = "disappear 0.5s linear forwards";
        setTimeout(function () {
            myButton.style.display = "none";
        }, 500);
    }, 1500);
    myButton.classList.add("animated");
    myButton.classList.add("fadeOut");

    setTimeout(function () {
        newGameButton.removeAttribute("disabled");
        continueButton.removeAttribute("disabled");
        muteMusicButton.removeAttribute("disabled");
        SaveProgressButton.removeAttribute("disabled");
        lessonButton.removeAttribute("disabled");
        newGameButton.style.transition = "opacity 0.5s ease-in-out";
        SaveProgressButton.style.transition = "opacity 0.5s ease-in-out";
        continueButton.style.transition = "opacity 0.5s ease-in-out";
        muteMusicButton.style.transition = "opacity 0.5s ease-in-out";
        newGameButton.style.transition = "opacity 0.5s ease-in-out";
        newGameButton.style.opacity = 1;
        continueButton.style.opacity = 1;
        muteMusicButton.style.opacity = 1;
        SaveProgressButton.style.opacity = 1;
        lessonButton.style.opacity = 1;
        ST1.style.opacity = 1;
        ST1.style.pointerEvents = "auto";
        ST1.classList.add("animated");
        ST1.classList.add("fadeIn");
    }, 2000);
});

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        myButton.click();
        startGame();
    }
});

function startGame() {
    myButton.style.opacity = 0;
    myButton.classList.add("animated", "fadeOut");
    audio.play();
    setTimeout(function () {
        myButton.style.display = "none";
    }, 1000);
}
setTimeout(function () {
    newGameButton.style.display = "block";
    continueButton.style.display = "block";
    muteMusicButton.style.display = "block";
}, 2000);


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


lessonButton.addEventListener("mouseover", function () {
    lessonButton.textContent = "Кликни по кнопке,чтобы продать все !";
});

lessonButton.addEventListener("mouseout", function () {
    lessonButton.textContent = "Кликни по мне, чтобы удалить!";
});

lessonButton.addEventListener("click", function () {
    lessonButton.style.opacity = 0;
    lessonButton.style.pointerEvents = "none";
    lessonButton.style.opacity = 0;
    lessonButton.style.transition = "opacity 0.5s ease-in-out";
});
