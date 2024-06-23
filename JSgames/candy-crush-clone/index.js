const sweets = ["Blue-Striped-Vertical", "Orange-Striped-Vertical", "Green-Striped-Horizontal", "Yellow-Striped-Horizontal", "Red", "Purple"];
const board = [];
const rows = 9;
const columns = 9;

let score = 0;
let currTile;
let otherTile;

window.onload = function () {
  startGame();

  window.setInterval(function(){
    smashSweets();
    slideSweets();
    generateSweets();
  }, 100);
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

  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

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

    let validMove = checkValid();
    if (!validMove) {
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

function smashSweets() {
  smashThree();
  document.getElementById("score").innerText = score;
}

function smashThree() {

  //CHECK ROWS
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns-2; c++) {
      let sweet1 = board[r][c];
      let sweet2 = board[r][c+1];
      let sweet3 = board[r][c+2];

      if (sweet1.src == sweet2.src && sweet2.src == sweet3.src && !sweet1.src.includes("blank")) {
        sweet1.src = "./assets/blank.png";
        sweet2.src = "./assets/blank.png";
        sweet3.src = "./assets/blank.png";
        score += 30;
      }
    }
  }

  //CHECK COLUMNS
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows -2; r++) {
      let sweet1 = board[r][c];
      let sweet2 = board[r+1][c];
      let sweet3 = board[r+2][c];

      if (sweet1.src == sweet2.src && sweet2.src == sweet3.src && !sweet1.src.includes("blank")) {
        sweet1.src = "./assets/blank.png";
        sweet2.src = "./assets/blank.png";
        sweet3.src = "./assets/blank.png";
        score += 30;
      }
    }
  }
}


function checkValid() {

  //CHECK ROWS
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns-2; c++) {
      let sweet1 = board[r][c];
      let sweet2 = board[r][c+1];
      let sweet3 = board[r][c+2];

      if (sweet1.src == sweet2.src && sweet2.src == sweet3.src && !sweet1.src.includes("blank")) {
        return true;
      }
    }
  }

  //CHECK COLUMNS
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows -2; r++) {
      let sweet1 = board[r][c];
      let sweet2 = board[r+1][c];
      let sweet3 = board[r+2][c];

      if (sweet1.src == sweet2.src && sweet2.src == sweet3.src && !sweet1.src.includes("blank")) {
        return true;
      }
    }
  }
  return false;
}

function slideSweets() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1;
    for (let r = columns-1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }
    for (let r = ind; r >=0; r--){
      board[r][c].src = "./assets/blank.png";
    }
  }
}

function generateSweets() {
  for (let c=0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./assets/" + randomSweet() + ".png";
    }
  }
}
