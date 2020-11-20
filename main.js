var main = document.querySelector(".main");

var playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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

function draw() {
    var mainInnerHTML = "";
        for (var y = 0; y < playfield.length; y++) {
            for (var x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x] === 1) {
                    mainInnerHTML += '<div class="cell movingCell"></div>';
                } else {
                    mainInnerHTML += '<div class="cell"></div>';
                }
            }
        }
    main.innerHTML = mainInnerHTML;
}

function moveTetroDown() {
    for (var y = playfield.length - 1; y >= 0; y--) {
        for (var x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                console.log(playfield[y]);
                playfield[y + 1][x] = 1;
                playfield[y][x] = 0;
            }
        }
    }
}

draw();
function startGame() {
    moveTetroDown();
    draw();
    setTimeout(startGame, 1000);
}

setTimeout(startGame, 1000);

