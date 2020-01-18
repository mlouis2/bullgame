const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const NUM_ROWS = 9;
const NUM_COLS = 16;
let cellSize;

const ASPECT_RATIO = [16, 9];
const X_PERCENTAGE_OF_WINDOW = 0.8;
const Y_PERCENTAGE_OF_WINDOW = 0.9;

const directions = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

function calculateXAndYPos(xCoord, yCoord) {
  return [xCoord * cellSize, yCoord * cellSize];
}

class Game {
  constructor() {
    this.setBackground();
    this.grid = new Grid(NUM_ROWS, NUM_COLS, cellSize);
    this.player = new Player(0, 0, directions.RIGHT);
    document.onkeydown = this.player.turn;
    this.update();
  }

  update() {
    this.setBackground();
    this.grid.draw();
    this.player.draw();
  }

  setBackground() {
    ctx.fillStyle = "#123456";
    const defaultCanvasWidth = window.innerWidth * X_PERCENTAGE_OF_WINDOW;
    canvas.width = defaultCanvasWidth;
    const adjustedCanvasHeight =
      (defaultCanvasWidth / ASPECT_RATIO[0]) * ASPECT_RATIO[1]; // 16:9 aspect ratio
    if (window.innerHeight < adjustedCanvasHeight) {
      const defaultCanvasHeight = window.innerHeight * Y_PERCENTAGE_OF_WINDOW;
      canvas.height = defaultCanvasHeight;
      canvas.width = (defaultCanvasHeight * ASPECT_RATIO[0]) / ASPECT_RATIO[1];
    } else {
      canvas.height = adjustedCanvasHeight;
    }
    cellSize = canvas.width / NUM_COLS;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

const game = new Game();

function drawImage(source, xValue, yValue) {
  let drawing = new Image();
  drawing.src = source;
  drawing.onload = function() {
    ctx.drawImage(drawing, xValue, yValue);
  };
}
