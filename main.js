const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// variables
let score;
let scoreText;
let highScoreText;
let highScore;
let player;
let gravity;
let obsticles = [];
let gameSpeed;
let keys = {};

//event listeners
document.addEventListener("keydown", function(evt) {
  keys[evt.code] = true;
});

document.addEventListener("keyup", function(evt) {
  keys[evt.code] = false;
});

class Player {
  constructor(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.colour = colour;
    this.dy = 0;
    this.jumpForce = 15;
    this.originalHeight = height;
    this.grounded = false;
    this.jumpTimer = 0;
  }

  Animate() {
    // Jump animation
    if (keys["Space"] || keys["KeyW"]) {
      this.jumpForce();
    } else {
      this.jumpTimer = 0;
    }

    // shrink
    if (keys["ShiftLeft"] || keys["KeyS"]) {
      this.height = this.originalHeight / 2;
    } else {
      this.height = this.originalHeight;
    }

    this.y += this.dy;

    //Gravity
    if (this.y + this.height < canvas.height) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.height;
    }
    this.Draw();
  }

  Jump() {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.fillRect = (this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

class Obstacle {
  constructor(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.colour = colour;

    this.dx = -gameSpeed;
  }

  Update() {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.fillRect = (this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

class Text {
  constructor(text, x, y, alignment, colour, size) {
    this.t = text;
    this.x = x;
    this.y = y;
    this.alignment = alignment;
    this.colour = colour;
    this.size = size;
  }

  Draw() {
      ctx.beginPath()
      ctx.fillStyle = this.colour
      ctx.font = this.size + "px sans-serif"
      ctx.textAlign = this.alignment;
      ctx.fillText(this.text, this.x, this.y)
      ctx.closePath()

  }
}

// game functions
function SpawnObstacle() {
  let size = RandomIntInRange(20, 70);
  let type = RandomIntInRange(0, 1);
  let obstacle = new Obstacle(
    canvas.width + size,
    canvas.height - size,
    size,
    size,
    "#2484E4"
  );

  if (type == 1) {
    obstacle.y -= player.originalHeight - 10;
  }
  obstacles.push(obstacle);
}

SpawnObstacle();

function RandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";

  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highScore = 0;

  player = new Player(25, 0, 50, 50, "#FF5858");
  player.Draw();

  scoreText = new Text("Score: " score, 25, 25, "left", "#212121", "20")


  requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnObstacle();
    console.log(obstacle());
    spawnTimer = initialSpawnTimer - gameSpeed * 8;

    if (spawnTimer < 60) {
      spawnTimer = 60;
    }
  }

  //spawn enimies

  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    o.Update();
  }
  player.Animate();

  score++;
  scoreText.Draw()

  gameSpeed += 0.003;
}

Start();
