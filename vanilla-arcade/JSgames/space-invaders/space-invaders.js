/* BOARD */
const tileSize = 32;
const rows = 16;
const columns = 16;

let board;
let boardWidth = tileSize * columns; 
let boardHeight = tileSize * rows; 
let context;

/* PLAYER SHIP */
const shipWidth = tileSize * 2;
const shipHeight = tileSize;
const shipX = tileSize * columns / 2 - tileSize;
const shipY = tileSize * rows - tileSize * 2;

const ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImg;
let shipVelocityX = tileSize;

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
let invaderVelocityX = 1; 

/* LASERS */
let laserArray = [];
let laserVelocityY = -10;

let score = 0;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    //image loading
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

    //ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    //invader
    for (let i = 0; i < invaderArray.length; i++) {
        let invader = invaderArray[i];
        if (invader.alive) {
            invader.x += invaderVelocityX;

            if (invader.x + invader.width >= board.width || invader.x <= 0) {
                invaderVelocityX *= -1;
                invader.x += invaderVelocityX*2;

                for (let j = 0; j < invaderArray.length; j++) {
                    invaderArray[j].y += invaderHeight;
                }
            }
            context.drawImage(invaderImg, invader.x, invader.y, invader.width, invader.height);

            if (invader.y >= ship.y) {
                gameOver = true;
            }
        }
    }

    //lasers
    for (let i = 0; i < laserArray.length; i++) {
        let laser = laserArray[i];
        laser.y += laserVelocityY;
        context.fillStyle="white";
        context.fillRect(laser.x, laser.y, laser.width, laser.height);

        for (let j = 0; j < invaderArray.length; j++) {
            let invader = invaderArray[j];
            if (!laser.used && invader.alive && detectCollision(laser, invader)) {
                laser.used = true;
                invader.alive = false;
                invaderCount--;
                score += 100;
            }
        }
    }

    while (laserArray.length > 0 && (laserArray[0].used || laserArray[0].y < 0)) {
        laserArray.shift();
    }

    //refresh invaders
    if (invaderCount == 0) {
        score += invaderColumns * invaderRows * 100;
        invaderColumns = Math.min(invaderColumns + 1, columns/2 -2);
        invaderRows = Math.min(invaderRows + 1, rows-4);
        if (invaderVelocityX > 0) {
            invaderVelocityX += 0.2; 
        }
        else {
            invaderVelocityX -= 0.2;
        }
        invaderArray = [];
        laserArray = [];
        createInvaders();
    }

    //score
    context.fillStyle="white";
    context.font="16px courier";
    context.fillText(score, 5, 20);
}

/* MOVEMENT */
function moveShip(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX; 
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX; 
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

/* SHOOTING AND COLLISION */
function shoot(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "Space") {
        
        let laser = {
            x : ship.x + shipWidth * 15/32,
            y : ship.y,
            width : tileSize / 8,
            height : tileSize / 2,
            used : false
        }
        laserArray.push(laser);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}