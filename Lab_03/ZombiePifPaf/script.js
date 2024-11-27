let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let livesBox = document.getElementById("livesBox");
let gameOver = document.getElementById("gameOver");
let gameOverText = document.getElementById("gameOverText");
let gameOverScore = document.getElementById("gameOverScore");
let restartButton = document.getElementById("restartButton");
let scoreBox = document.getElementById("scoreBox");

// Ustawienia canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener("mousedown", shootZombies);

// Zapisywanie sprite zombie do zmiennej
const zombieSprite = new Image();
zombieSprite.src = "Assets/walkingdead.png";

// Ładowanie obrazka tła
const backgroundImage = new Image();
backgroundImage.src = "Assets/board-bg.jpg";

backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

class Zombie {
  constructor(dificulty) {
    let scaleMultiplier = Math.random();
    this.position = {
      x: canvas.width,
      y: Math.random() * (canvas.height - 50),
    };
    this.velocity = {
      x: Math.max(Math.random() * 2 * dificulty, 1),
      y: 0,
    };
    this.scale = {
      x: 100 * scaleMultiplier + 50,
      y: 100 * scaleMultiplier + 50,
    };

    this.frameWidth = 200;
    this.frameHeight = 312;
    this.totalFrames = 10;
    this.currentFrame = 0;
    this.frameCount = 0;
    this.frameSpeed = 10;
  }

  draw() {
    const sourceX = this.currentFrame * this.frameWidth;
    ctx.drawImage(
      zombieSprite,
      sourceX,
      0,
      this.frameWidth,
      this.frameHeight,
      this.position.x,
      this.position.y,
      this.scale.x,
      this.scale.y
    );
  }

  update() {
    this.frameCount++;
    if (this.frameCount >= this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.frameCount = 0;
    }

    this.draw();
    this.position.x -= this.velocity.x;
  }
}

let isGameOver = false;
const zombies = [];
let interval = 1000;
let lastInterval = 0;
let spawnInterval = 2000;
let lastSpawnTime = 0;
//numer od 1 do 10
let dificulty = 5;
let lives = 3;
let score = 0;

function increaseZombieSpawnRate(timestamp) {
  if (timestamp - lastInterval >= interval) {
    if (spawnInterval > 500) {
      spawnInterval -= 10 * dificulty;
    }
    lastInterval = timestamp;
  }
}

function spawnZombies(timestamp, dificulty) {
  if (timestamp - lastSpawnTime >= spawnInterval) {
    const zombie = new Zombie(dificulty);
    zombies.push(zombie);
    lastSpawnTime = timestamp;
  }
  increaseZombieSpawnRate(timestamp);
}

function moveZombies(timestamp) {
  for (let i = zombies.length - 1; i >= 0; i--) {
    const zombie = zombies[i];
    zombie.update();

    if (zombie.position.x + zombie.scale.x < 0) {
      zombies.splice(i, 1);
      lives--;
      updateLivesDisplay();
      console.log(`Zombie opuścił mapę! Pozostałe życia: ${lives}`);
      if (lives <= 0) {
        console.log("Koniec gry!");
        isGameOver = true;
        showGameOver();
      }
    }
  }
}

function shootZombies(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  let hit = false;

  console.log(score);

  for (let i = zombies.length - 1; i >= 0; i--) {
    const zombie = zombies[i];
    if (
      mouseX >= zombie.position.x &&
      mouseX <= zombie.position.x + zombie.scale.x &&
      mouseY >= zombie.position.y &&
      mouseY <= zombie.position.y + zombie.scale.y
    ) {
      zombies.splice(i, 1);
      console.log("plus");
      updateScore(20);
      hit = true;
      break;
    }
    console.log("minus");
  }
  if (!hit) {
    updateScore(-5);
  }
}

function updateLivesDisplay() {
  livesBox.innerHTML = "";

  for (let i = 0; i < lives; i++) {
    const lifeImg = document.createElement("img");
    lifeImg.src = "Assets/full_heart.png";
    livesBox.appendChild(lifeImg);
  }
  for (let i = 0; i < Math.min(3 - lives, 3); i++) {
    const lifeImg = document.createElement("img");
    lifeImg.src = "Assets/empty_heart.png";
    livesBox.appendChild(lifeImg);
  }
}

function showGameOver() {
  const gameOverMusic = new Audio("Assets/sad-music.mp3");
  gameOverMusic.play();

  gameOver.style.display = "block";
  scoreBox.style.display = "none";
  gameOverScore.textContent = `Score: ${score}`;

  restartButton.onclick = function () {
    gameOver.style.display = "none";
    location.reload();
  };
}

function updateScore(scoreToAssign) {
  score += scoreToAssign;
  scoreBox.textContent = score;
}

function gameLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  spawnZombies(timestamp, dificulty);
  moveZombies(timestamp);
  if (isGameOver) {
    return;
  }
  requestAnimationFrame(gameLoop);
}

updateLivesDisplay();
gameLoop();
