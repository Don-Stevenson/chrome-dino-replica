const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// variables
let score;
let highScore;
let player;
let gravity;
let gameSpeed;
let keys = [];

class Player {
  constructor(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.colour = colour;
    this.dy = 0;
    this.jumpForce = 15;
    this.originalHeight = height;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.fillRect = (this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";

  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highScore = 0;

  player = new Player(25, canvas.height - 150, 50, 50, "#FF5858");
  player.Draw();

  requestAnimationFrame(Update)
}

function Update() {
    requestAnimationFrame(Update)
    ctx.clearRect(0,0, canvas.width, canvas.height)

    player.Draw()
    player.x++
}

Start();
