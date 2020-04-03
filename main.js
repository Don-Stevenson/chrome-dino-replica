const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// variables
let score;
let highScore;
let player;
let gravity;
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
    if(keys['ShiftLeft'] || keys['KeyS'] ){
        this.height = this.originalHeight / 2
    } else {
        this.height = this.originalHeight
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
      this.dy = -this.jumpForce - (this.jumpTimer / 50);
    }
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

  player = new Player(25, 0, 50, 50, "#FF5858");
  player.Draw();

  requestAnimationFrame(Update);
}

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.Animate();
  player.x++;
}

Start();
