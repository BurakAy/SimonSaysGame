var startButton = document.getElementById("start").addEventListener("click", startGame);
var strictButton = document.getElementById("strict").addEventListener("click", strictGame);

var score = document.getElementById("score");

var green = document.getElementById("greenpad");
var red = document.getElementById("redpad");
var yellow = document.getElementById("yellowpad");
var blue = document.getElementById("bluepad");

var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var compMoveArray = [];
var counter = 1;
var playSpeed = 0;
var strict = false;

var z = 0;
var w = 0;

function showScore() {
    score.innerHTML = counter;
}

function clearScore() {
    counter = 1;
    z = 0;
    w = 0;
    compMoveArray = [];
}

function resetColor() {
    var green = document.getElementById("greenpad");
    var red = document.getElementById("redpad");
    var yellow = document.getElementById("yellowpad");
    var blue = document.getElementById("bluepad");

    green.style.backgroundColor = "#30C83F";
    green.style.boxShadow = "none";
    red.style.backgroundColor = "#F9220E";
    red.style.boxShadow = "none";
    yellow.style.backgroundColor = "#ece120";
    yellow.style.boxShadow = "none";
    blue.style.backgroundColor = "#0187E6";
    blue.style.boxShadow = "none";
}

function setColor() {
    move = (Math.random() * 3).toFixed();
    var padColor;

    if (move == 0) {
        padColor = "green";
    } else if (move == 1) {
        padColor = "red";
    } else if (move == 2) {
        padColor = "yellow";
    } else if (move == 3) {
        padColor = "blue";
    }
    compMoveArray.push(padColor);
}

function strictGame() {
    strict = !strict; //toggle true/false
    var bullet = "&bull;";
    document.getElementById("stricttoggle").classList.toggle("bullet");

    if (strict == true) {
        document.getElementById("stricttoggle").innerHTML = bullet;
    } else {
        document.getElementById("stricttoggle").innerHTML = "";
    }
}

function gameSpeed() {
    if (counter < 7) {
        playSpeed = 1000;
    } else if (counter >= 7 && counter < 14) {
        playSpeed = 800;
    } else if (counter >= 14) {
        playSpeed = 600;
    }
}

var greenClick = document.getElementById("greenpad").addEventListener("click", function () {
    var padColor = "green";
    greenSound.play();
    green.style.backgroundColor = "#7cff87";
    green.style.boxShadow = "1px 1px 20px #b9ffb0";

    setTimeout(function () {
        resetColor();
    }, 100);

    checkMove(padColor);
});

var redClick = document.getElementById("redpad").addEventListener("click", function () {
    var padColor = "red";
    redSound.play();
    red.style.backgroundColor = "#ff5454";
    red.style.boxShadow = "1px 1px 20px #f96f6f";

    setTimeout(function () {
        resetColor();
    }, 100);

    checkMove(padColor);
});

var yellowClick = document.getElementById("yellowpad").addEventListener("click", function () {
    var padColor = "yellow";
    yellowSound.play();
    yellow.style.backgroundColor = "#fff67f";
    yellow.style.boxShadow = "1px 1px 20px #fff545";

    setTimeout(function () {
        resetColor();
    }, 100);

    checkMove(padColor);
});

var blueClick = document.getElementById("bluepad").addEventListener("click", function () {
    var padColor = "blue";
    blueSound.play();
    blue.style.backgroundColor = "#4fc1ff";
    blue.style.boxShadow = "1px 1px 20px #97bae6";

    setTimeout(function () {
        resetColor();
    }, 100);

    checkMove(padColor);
});

function computerMove() {
    for (var i = 0; i < counter; i++) {
        setColor();
    }
    compSoundColor();

    console.log(compMoveArray);
}

function addToMove() {
    if (counter - compMoveArray.length == 1) { //if values already in array, push one new value
        setColor();
    }
    compSoundColor();

    console.log(compMoveArray);
}

function compSoundColor() {
    gameSpeed();

    setTimeout(function () { //adjust time between next value
        if (compMoveArray[z] == "green") {
            green.style.backgroundColor = "#7cff87";
            green.style.boxShadow = "1px 1px 20px #b9ffb0";
            greenSound.play();
        } else if (compMoveArray[z] == "red") {
            red.style.backgroundColor = "#ff5454";
            red.style.boxShadow = "1px 1px 20px #f96f6f";
            redSound.play();
        } else if (compMoveArray[z] == "yellow") {
            yellow.style.backgroundColor = "#fff67f";
            yellow.style.boxShadow = "1px 1px 20px #fff545";
            yellowSound.play();
        } else if (compMoveArray[z] == "blue") {
            blue.style.backgroundColor = "#4fc1ff";
            blue.style.boxShadow = "1px 1px 20px #97bae6";
            blueSound.play();
        }

        setTimeout(function () { //speed of color reset determined by playspeed
            resetColor();
        }, playSpeed - 250);

        z++;

        if (z < compMoveArray.length) {
            compSoundColor();
        }
    }, playSpeed)
}

function wonGame() {
    if (counter > 20) {
        score.innerHTML = "W";
        setTimeout(function() {
            clearScore();
        }, 1500)
    }    
}

function checkMove(moveColor) {
    if (compMoveArray[w] != moveColor && strict == true) {
        score.innerHTML = "X";
        setTimeout(function() {
            clearScore();
            computerMove(); 
        }, 1500)
    }

    if (compMoveArray[w] != moveColor) {
        w = 0;
        z = 0;
        score.innerHTML = "X";
        setTimeout(function () {
            showScore();
            compSoundColor();
        }, 1500);
    } else if (compMoveArray[w] === moveColor) {
        w++;
        if (w >= compMoveArray.length) {
            w = 0;
            z = 0;
            counter++;
            wonGame();
            setTimeout(function () {
                showScore();
                addToMove();
            }, 1500);
        }
    }
}

function startGame() {
    clearScore();
    showScore();
    computerMove();
}