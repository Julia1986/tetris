var main = document.querySelector(".main");

var playfield = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
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
    [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
];

var gameSpeed = 400;

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
                if (x === 0) {
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

function fixTetro() {
    for (var y = 0; y < playfield.length; y++) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 2;
            }
        }
    }

    playfield[0] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    playfield[1] = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0];
}

draw();

document.onkeydown = function (e) { 
    console.log(e);
    if (e.code === 37) {
        //двигаем фигурку вправо
        moveTetroLeft();
        } else if (e.code === 39) {
            //двигаем фигурку вправо
        }
        else if (e.code === 40) {
            //ускоряемся
    }
};  

function startGame() {
    moveTetroDown();
    draw();
    setTimeout(startGame, gameSpeed);
}

setTimeout(startGame, gameSpeed);

var dispatchForCode = function(event, callback) {
    var code;
  
    if (event.key !== undefined) {
      code = event.key;
    } else if (event.keyIdentifier !== undefined) {
      code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }
  
    callback(code);
  };
