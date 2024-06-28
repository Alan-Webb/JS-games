/* BOARD */
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

/* PLAYER SHIP */
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
  x : shipX,
  y : shipY,
  width : shipWidth,
  height : shipHeight
}

let shipImg;
shipMovementX = tileSize;

/* INVADERS */
let invaderArray = [];
let invaderWidth = tileSize * 2;
let invaderHeight = tileSize;
let invaderX = tileSize;
let invaderY = tileSize;
let invaderImg;

let invaderRows = 2;
let invaderColumns = 3;
let invaderCount = 0;

window.onload = function() {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");


  /* IMAGE LOADING */
  shipImg = new Image();
  shipImg.src = "./images/ship.png";
  shipImg.onload = function() {
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
  }

  invaderImg = new Image();
  invaderImg.src = "./images/invader.png";

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip);
}



function update() {
  requestAnimationFrame(update);

  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}

/* PLAYER SHIP MOVEMENT */
function moveShip(e) {
  if (e.code == "ArrowLeft" && ship.x - shipMovementX >= 0) {
    ship.x -= shipMovementX;
  } else if (e.code == "ArrowRight" && ship.x + shipMovementX + ship.width <= board.width) {
    ship.x += shipMovementX;
  }
}

function createInvaders() {
  for (let c = 0; c < invaderColumns; c++) {
    for (let r = 0; r < invaderRows; r++) {
      let invader = {
        img : invaderImg,
        x : invaderX + c * invaderWidth,
        y : invaderY + r * invaderHeight,
        width : invaderWidth,
        height : invaderHeight
      }
    }
  }
}