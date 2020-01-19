const NUM_ROWS = 9;
const NUM_COLS = 16;

const directions = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

const CELL_SIZE = canvas.width / NUM_COLS;

function calculateXAndYPos(xCoord, yCoord) {
  return [xCoord * CELL_SIZE, yCoord * CELL_SIZE];
}

function drawImage(source, xValue, yValue) {
  let drawing = new Image();
  drawing.src = source;
  drawing.onload = function() {
    ctx.drawImage(drawing, xValue, yValue, CELL_SIZE, CELL_SIZE);
  };
}

function drawLine(startXPos, startYPos, endXPos, endYPos) {
  ctx.beginPath();
  ctx.moveTo(startXPos, startYPos);
  ctx.lineTo(endXPos, endYPos);
  ctx.stroke();
}

function drawImage(source, xValue, yValue) {
  let drawing = new Image();
  drawing.src = source;
  drawing.onload = function() {
    ctx.drawImage(drawing, xValue, yValue, CELL_SIZE, CELL_SIZE);
  };
}

class Game {
  constructor() {
    setBackground();
    this.grid = new Grid(NUM_ROWS, NUM_COLS, CELL_SIZE);
    this.player = new Player(0, 0, directions.RIGHT);
    document.onkeydown = this.player.turn.bind(this.player);
    this.update();
  }

  async update() {
    setBackground();
    this.grid.draw();
    this.player.move();
    this.player.draw();
    setTimeout(() => {
      this.update();
    }, 1000);
  }
}

const game = new Game();
