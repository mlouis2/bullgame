const NUM_ROWS = 9;
const NUM_COLS = 16;

const directions = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

const CELL_SIZE = canvas.width / NUM_COLS;
const HALF_OF_CELL_SIZE = CELL_SIZE / 2;

function calculateXAndYPos(xCoord, yCoord) {
  return [xCoord * CELL_SIZE, yCoord * CELL_SIZE];
}

function drawImage(source, xValue, yValue, rotationDegree) {
  let drawing = new Image();
  drawing.src = source;
  drawing.onload = function() {
    ctx.save();
    ctx.translate(xValue + HALF_OF_CELL_SIZE, yValue + HALF_OF_CELL_SIZE);
    ctx.rotate(rotationDegree);
    ctx.translate(-(xValue + HALF_OF_CELL_SIZE), -(yValue + HALF_OF_CELL_SIZE));
    ctx.drawImage(drawing, xValue, yValue, CELL_SIZE, CELL_SIZE);
    ctx.restore();
  };
}

function drawLine(startXPos, startYPos, endXPos, endYPos) {
  ctx.beginPath();
  ctx.moveTo(startXPos, startYPos);
  ctx.lineTo(endXPos, endYPos);
  ctx.stroke();
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
    const currentCell = this.grid.getCellAt(this.player.getPlayerLocation());
    if (!currentCell.checkIfWallInDirection(this.player.direction)) {
      this.player.move();
    }
    this.player.draw();
    setTimeout(() => {
      this.update();
    }, 1000);
  }
}

const game = new Game();
