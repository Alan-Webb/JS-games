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
let invaderMovementX = 1;

/* LASERS */
let laserArray = [];
let laserMovementY = -10;

let score = 0;
let gameOver = false;

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
  createInvaders();

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip);
  document.addEventListener("keyup", shoot);
}

function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

  for (let i = 0; i < invaderArray.length; i++) {
    let invader = invaderArray[i];
    if (invader.alive) {
      invader.x += invaderMovementX;

      if (invader.x + invader.width >= board.width || invader.x <= 0) {
        invaderMovementX *= -1;
        invader.x += invaderMovementX * 2;

        for (let j = 0; j < invaderArray.length; j ++) {
          invaderArray[j].y += invaderHeight;
        }
      }
      context.drawImage(invaderImg, invader.x, invader.y, invader.width, invader.height);
    }
  }
}



/* PLAYER SHIP MOVEMENT */
function moveShip(e) {
  if (e.code == "ArrowLeft" && ship.x - shipMovementX >= 0) {
    ship.x -= shipMovementX;
  } else if (e.code == "ArrowRight" && ship.x + shipMovementX + ship.width <= board.width) {
    ship.x += shipMovementX;
  }
}

/* INVADER SPAWNING */
function createInvaders() {
  for (let c = 0; c < invaderColumns; c++) {
    for (let r = 0; r < invaderRows; r++) {
      let invader = {
        img : invaderImg,
        x : invaderX + c * invaderWidth,
        y : invaderY + r * invaderHeight,
        width : invaderWidth,
        height : invaderHeight,
        alive : true
      }
      invaderArray.push(invader);
    }
  }
  invaderCount = invaderArray.length;
}

/* SHOOT LASERS */
function shoot(e) {
  if (e.code == "space") {
    let laser = {
      x : ship.x + shipWidth * 15 / 32;
      y : ship.y,
      width : tileSize / 8,
      height : tileSize / 2,
      used : false
    }
    laserArray.push(laser);
  }
}