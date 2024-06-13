let currentAppleTile;
let currentLinuxTile;

window.onload = function() {
  SetGame();
}

function SetGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setApple, 1000);
  setInterval(setLinux, 2000);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setApple() {
  if (currentAppleTile) {
    currentAppleTile.innerHTML = "";
  }

  let apple = document.createElement("img");
  apple.src = "./assets/apple.png";

  let num = getRandomTile();
  if (currentLinuxTile && currentLinuxTile.id == num) {
    return;
  }

  currentAppleTile = document.getElementById(num);
  currentAppleTile.appendChild(apple);
}

function setLinux() {
  if (currentLinuxTile) {
    currentLinuxTile.innerHTML = "";
  }

  let linux = document.createElement("img");
  linux.src = "./assets/penguin.png";

  let num = getRandomTile();
  
  currentLinuxTile = document.getElementById(num);
  currentLinuxTile.appendChild(linux);
}