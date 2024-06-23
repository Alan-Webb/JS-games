const sweets = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
const board = [];
const rows = 9;
const columns = 9;

let score = 0;
let currTile;
let otherTile;

window.onload = function () {
  startGame();
}

function randomSweet() {
  return sweets[Math.floor(Math.random() * sweets.length)];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./assets/" + randomSweet() + ".png";

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart);  //click sweet, starts drag process
      tile.addEventListener("dragover", dragOver);    //clikcing sweet, move mouse to drag
      tile.addEventListener("dragenter", dragEnter);  //drag sweet to another sweet
      tile.addEventListener("dragleave", dragLeave);  //leave sweet on another sweet
      tile.addEventListener("drop", dragDrop);        //drop sweet onto another sweet
      tile.addEventListener("dragend", dragEnd);      //after drag process, swap sweets
      

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  currTile = this;
}

function dragOver() {
  event.preventDefault();
}

function dragEnter() {
  event.preventDefault();
}

function dragLeave() {
  
}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = c2 == c-1 && r == r2;
  let moveRight = c2 == c+1 && r == r2;

  let moveUp = r2 == r-1 && c == c2;
  let moveDown = r2 == r+1 && c == c2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
  }
}