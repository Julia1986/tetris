var main = document.querySelector(".main");

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

var gameSpeed = 400;
var activeTetro = {
    x: 0,
    y: 0,
    shape: [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
};

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
            if (activeTetro.shape[y][x]) {
                playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
            }
        }
    }
}

function canTetroMoveDown() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                if (y === playfield.length - 1 || playfield[y + 1][x] === 2) {
                    return false;
                }
            }
        }
    }

    return true;
}

function moveTetroDown() {
    if(canTetroMoveDown()) {
        for (var y = playfield.length - 1; y >= 0; y--) {
            for (var x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x] === 1) {
                    playfield[y + 1][x] = 1;
                    playfield[y][x] = 0;
                }
            }
        }
    } else {
        fixTetro();
    }
}

//Двигаем фигурку влево
function canTetroMoveLeft() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                if (x === 0 || playfield[y][x-1] === 2) {
                    return false;
                }
            }
        }
    }

    return true;
}

function moveTetroLeft() {
    if (canTetroMoveLeft()) {
        for (var y = playfield.length - 1; y >= 0; y--) {
            for (var x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x] === 1) {
                    playfield[y][x - 1] = 1;
                    playfield[y][x] = 0;
                }
            }
        }
    } 
}

//Двигаем фигурку вправо
function canTetroMoveRight() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                if (x === 9 || playfield[y][x + 1] ===2) { //вместо девятки можно playfield[0].length - 1
                    return false;
                }
            }
        }
    }

    return true;
}

function moveTetroRight() {
    if (canTetroMoveRight()) {
        for (var y = playfield.length - 1; y >= 0; y--) {
            for (var x = 9; x >= 0; x--) {
                if (playfield[y][x] === 1) {
                    playfield[y][x + 1] = 1;
                    playfield[y][x] = 0;
                }
            }
        }
    } 
}

function removeFullLines() {
    var canRemoveLine = true;
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
        }
        canRemoveLine = true;
    }
}

function fixTetro() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 2;
            }
        }
    }

    removeFullLines();

    playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
    playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
}

document.onkeydown = function(e) { 
    if (e.code === "ArrowLeft") {
            activeTetro.x -= 1; //moveTetroLeft();
        } else if (e.code === "ArrowRight") {
            activeTetro.x += 1; //moveTetroRight();
        }
        else if (e.code === "ArrowDown") {
            activeTetro.y += 1; //moveTetroDown();
    }

    addActiveTetro();
    draw();
};

addActiveTetro();
draw();

/*function startGame() {
    moveTetroDown();
    draw();
    setTimeout(startGame, gameSpeed);
}

setTimeout(startGame, gameSpeed);*/