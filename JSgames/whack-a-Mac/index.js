let currentAppleTile;
let currentLinuxTile;
let currentWindowsTile;
let score = 0;
let gameOver = false;

window.onload = function() {
  SetGame();
}

function SetGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setApple, 1000);
  setInterval(setLinux, 2000);
  setInterval(setWindows, 10000);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

/* APPLE TILE MOVEMENT */

function setApple() {
  if (gameOver) {
    return;
  }

  if (currentAppleTile) {
    currentAppleTile.innerHTML = "";
  }

  let apple = document.createElement("img");
  apple.src = "./assets/apple.png";

  let num = getRandomTile();
  if (currentAppleTile && currentAppleTile.id == num) {
    return;
  }

  currentAppleTile = document.getElementById(num);
  currentAppleTile.appendChild(apple);
}

/* LINUX TILE MOVEMENT */

function setLinux() {
  if (gameOver) {
    return;
  }

  if (currentLinuxTile) {
    currentLinuxTile.innerHTML = "";
  }

  let linux = document.createElement("img");
  linux.src = "./assets/penguin.png";

  let num = getRandomTile();
  if (currentLinuxTile && currentLinuxTile.id == num) {
    return;
  }

  currentLinuxTile = document.getElementById(num);
  currentLinuxTile.appendChild(linux);
}

/* WINDOWS TILE MOVEMENT */

function setWindows() {
  if (gameOver) {
    return;
  }

  if (currentWindowsTile) {
    currentWindowsTile.innerHTML = "";
  }

  let windows = document.createElement("img");
  windows.src = "./assets/windows.png";

  let num = getRandomTile();
  if (currentWindowsTile && currentWindowsTile.id == num) {
    return;
  }

  currentWindowsTile = document.getElementById(num);
  currentWindowsTile.appendChild(windows);
}


function selectTile() {
  if (gameOver) {
    return;
  }
  
  if (this == currentAppleTile) {
    score += 1;
    document.getElementById("score").innerText = score.toString();
  } else if (this == currentWindowsTile) {
    score += 5;
    document.getElementById("score").innerText = score.toString();
  } else {
    document.getElementById("score").innerText = "GAME OVER: " + score.toString();
    gameOver = true;
  }
}