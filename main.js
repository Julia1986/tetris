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
            if (activeTetro.shape[y][x] === 1) {
                playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
            }
        }
    }
}

function rotateTetro() {
    activeTetro.shape = activeTetro.shape[0].map((val, index) => 
    activeTetro.shape.map((row) => row[index]).reverse()
);
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
}

document.onkeydown = function(e) { 
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
            activeTetro.y += 1; //moveTetroDown();
            if (hasCollisions()) {
                activeTetro.y -= 1;
                fixTetro();
                activeTetro.y = 0;
            }
        } else if (e.code === "ArrowUp") {
            rotateTetro();
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