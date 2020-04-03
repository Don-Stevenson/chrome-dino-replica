const canvas = document.getElementById("canvas");
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
    this.dy= 0
    this.jumpForce = 15;
    this.originalHeight = h
  }
}
