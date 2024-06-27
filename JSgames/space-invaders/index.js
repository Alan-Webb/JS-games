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

window.onload = function() {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  shipImg = new Image();
  shipImg.src = "./images/ship.png";
  shipImg.onload = function() {
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

  }
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip());
}

function update() {
  requestAnimationFrame(update)
  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}

function moveShip(e) {
  if (e.code == "ArrowLeft") {
    ship.x -= shipMovementX;
  } else if (e.code == "ArrowRight") {
    ship.x += shipMovementX;
  }
}