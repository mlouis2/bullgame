const NUM_ROWS = 9;
const NUM_COLS = 16;

let scoreText = document.getElementById("score");

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
  ctx.lineWidth = 2;
  ctx.stroke();
}

class Game {
  constructor() {
    this.gameOver = false;
    this.score = 0;
    this.doorLocation = levelOneInfo.doorLocation;
    setBackground();
    score.style.marginLeft = canvas.offsetLeft;
    this.grid = new Grid(NUM_ROWS, NUM_COLS, CELL_SIZE, this.doorLocation);
    this.player = new Player(0, 0, directions.RIGHT);
    document.onkeydown = this.player.turn.bind(this.player);
    this.update();
  }

  process() {
    const cell = this.grid.getCellAt(this.player.getPlayerLocation());
    if (cell.chinaId === 1) {
      cell.removeChina();
      this.score++;
    }
    if (
      this.player.getPlayerLocation()[0] === this.doorLocation[0] &&
      this.player.getPlayerLocation()[1] === this.doorLocation[1]
    ) {
      this.gameOver = true;
    }
  }

  async update() {
    if (!this.gameOver) {
      setBackground();
      this.grid.draw();
      const currentCell = this.grid.getCellAt(this.player.getPlayerLocation());
      if (!currentCell.checkIfWallInDirection(this.player.direction)) {
        this.player.move();
      }
      this.process();
      this.player.draw();
      setTimeout(() => {
        this.update();
      }, 1000);
      scoreText.innerHTML = this.score;
    }
  }
}

const game = new Game();
