var main = document.querySelector(".main");

const scoreElem = document.getElementById('score');
const levelElem = document.getElementById('level');
const nextTetroElem = document.getElementById('next-tetro');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const gameOver = document.getElementById('game-over');

var playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var score = 0;
var gameTimerID;
var currentLevel = 1;
var isPaused = false;

var possibleLevels = {
    1: {
        scorePerLine: 10,
        speed: 500,
        nextLevelScore: 100 
    },
    2: {
        scorePerLine: 15,
        speed: 500,
        nextLevelScore: 300 
    },
    3: {
        scorePerLine: 20,
        speed: 400,
        nextLevelScore: 600 
    },
    4: {
        scorePerLine: 25,
        speed: 400,
        nextLevelScore: 1000 
    },
    5: {
        scorePerLine: 30,
        speed: 300,
        nextLevelScore: 1500 
    },
    6: {
        scorePerLine: 35,
        speed: 300,
        nextLevelScore: 2000 
    },
    7: {
        scorePerLine: 40,
        speed: 200,
        nextLevelScore: 3000 
    },
    8: {
        scorePerLine: 45,
        speed: 150,
        nextLevelScore: 4000 
    },
    9: {
        scorePerLine: 50,
        speed: 100,
        nextLevelScore: 5000 
    },
    10: {
        scorePerLine: 100,
        speed: 50,
        nextLevelScore: Infinity, 
    },
};

var figures = {
    O: [
        [1,1],
        [1,1],
    ],
    I: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    S: [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    Z: [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    L: [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    J: [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    T: [
        [1,1,1],
        [0,1,0],
        [0,0,0],
    ],
};

var activeTetro = getNewTetro();
var nextTetro = getNewTetro();

function draw() {
    var mainInnerHTML = "";
        for (var y = 0; y < playfield.length; y++) {
            for (var x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x] === 1) {
                    mainInnerHTML += '<div class="cell movingCell"></div>';
                } else if (playfield[y][x] === 2) {
                    mainInnerHTML += '<div class="cell fixedCell"></div>';
                } else {
                    mainInnerHTML += '<div class="cell"></div>';
                }
            }
        }
    main.innerHTML = mainInnerHTML;
}

function drawNextTetro() {
    let nextTetroInnerHTML = "";
    for (let y = 0; y < nextTetro.shape.length; y++) {
      for (let x = 0; x < nextTetro.shape[y].length; x++) {
        if (nextTetro.shape[y][x]) {
          nextTetroInnerHTML += '<div class="cell movingCell"></div>';
        } else {
          nextTetroInnerHTML += '<div class="cell"></div>';
        }
      }
      nextTetroInnerHTML += "<br/>";
    }
    nextTetroElem.innerHTML = nextTetroInnerHTML;
  }

function removePrevActiveTetro() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 0;
            }
        }
    }
}

function addActiveTetro() {
    removePrevActiveTetro();
    for (var y = 0; y < activeTetro.shape.length; y++) {
        for (var x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] === 1) {
                playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
            }
        }
    }
}

function rotateTetro() {
    const prevTetroState = activeTetro.shape;
    activeTetro.shape = activeTetro.shape[0].map((val, index) => 
    activeTetro.shape.map((row) => row[index]).reverse()
);
    if (hasCollisions()) {
        activeTetro.shape = prevTetroState;
    }
}

function hasCollisions() {
    for (var y = 0; y < activeTetro.shape.length; y++) {
        for (var x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] && (playfield[activeTetro.y + y] === undefined ||
                playfield[activeTetro.y + y][activeTetro.x + x] === undefined || 
                playfield[activeTetro.y + y][activeTetro.x + x] === 2)
                ) {
                return true;
            }
        }
    } 
    return false;
}

function removeFullLines() {
    var canRemoveLine = true,
    filledLines = 0;
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] !== 2) {
                canRemoveLine = false;
                break;
            }
        }
        if (canRemoveLine) {
            playfield.splice(y, 1);
            playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            filledLines += 1;
        }
        canRemoveLine = true;
    }

    switch (filledLines) {
        case 1:
            score += possibleLevels[currentLevel].scorePerLine;
            break;
        case 2:
            score += possibleLevels[currentLevel].scorePerLine * 3;
            break;
        case 3:
            score += possibleLevels[currentLevel].scorePerLine * 6;
            break;
        case 4:
            score += possibleLevels[currentLevel].scorePerLine * 12;
            break;
    }

        scoreElem.innerHTML = score;

        if(score >= possibleLevels[currentLevel].nextLevelScore) {
            currentLevel++;
            levelElem.innerHTML = currentLevel;
        }
        
}

function getNewTetro(){
    const possibleFigures = 'IOLJTSZ';
    const rand = Math.floor(Math.random()*7);
    const newTetro = figures[possibleFigures[rand]];
    return {
        x: Math.floor((10 - newTetro[0].length) / 2),
        y: 0,
        shape: newTetro,
    };
}

function fixTetro() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 2;
            }
        }
    }
}

function moveTetroDown() {
        activeTetro.y += 1; //moveTetroDown();
        if (hasCollisions()) {
            activeTetro.y -= 1;
            fixTetro();
            removeFullLines();
            activeTetro = nextTetro;
            if (hasCollisions()) {
            }
            nextTetro = getNewTetro(); 
        }
}

function dropTetro() {
    for (var y = activeTetro.y; y < playfield.length; y++){
        activeTetro.y += 1;
        if (hasCollisions()) {
            activeTetro.y -= 1;
            break;
        }
    }
}

document.onkeydown = function(e) { 
    if (!isPaused) {
    if (e.code === "ArrowLeft") {
            activeTetro.x -= 1; //moveTetroLeft();
            if (hasCollisions()) {
                activeTetro.x += 1;
            }
        } else if (e.code === "ArrowRight") {
            activeTetro.x += 1; //moveTetroRight();
            if (hasCollisions()) {
                activeTetro.x -= 1;
            }
        } else if (e.code === "ArrowDown") {
            moveTetroDown();
        } else if (e.code === "ArrowUp") {
            rotateTetro();
        } else if (e.code === "Space") {
            dropTetro();
        }

    addActiveTetro();
    draw();
    drawNextTetro(); 
    }
};

pauseBtn.addEventListener("click", (e) => {
    if (e.target.innerHTML === "Pause") {
      e.target.innerHTML = "Play";
      clearTimeout(gameTimerID);
    } else {
      e.target.innerHTML = "Pause";
      //gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
    }
    isPaused = !isPaused;
  });

startBtn.addEventListener("click", (e) => {
    /*e.target.innerHTML = "Again";
    isPaused = false;*/
    gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
    /*gameOver.style.display = "none";*/
  });

scoreElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

draw();

function startGame() {
    if (!isPaused) {
    moveTetroDown();
    addActiveTetro();
    draw();
    drawNextTetro(); 
    }
    gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
}

