const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const NUM_ROWS = 9;
const NUM_COLS = 16;

let scoreText = document.getElementById("score");

const directions = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

let cellSize, halfOfCellSize;

function setBackground() {
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
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  cellSize = canvas.width / NUM_COLS;
  halfOfCellSize = cellSize / 2;
}

function calculateXAndYPos(xCoord, yCoord) {
  return [xCoord * cellSize, yCoord * cellSize];
}

function drawImage(source, xValue, yValue, rotationDegree) {
  let drawing = new Image();
  drawing.src = source;
  drawing.onload = function() {
    ctx.save();
    ctx.translate(xValue + halfOfCellSize, yValue + halfOfCellSize);
    ctx.rotate(rotationDegree);
    ctx.translate(-(xValue + halfOfCellSize), -(yValue + halfOfCellSize));
    ctx.drawImage(drawing, xValue, yValue, cellSize, cellSize);
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
    setBackground();
    this.gameOver = false;
    this.score = 0;
    this.doorLocation = levelOneInfo.doorLocation;
    score.style.marginLeft = canvas.offsetLeft;
    this.grid = new Grid(NUM_ROWS, NUM_COLS, cellSize, this.doorLocation);
    this.player = new Player(0, 0, directions.RIGHT);
    document.onkeydown = this.player.turn.bind(this.player);
    this.grid.draw();
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
      const currentCell = this.grid.getCellAt(this.player.getPlayerLocation());
      currentCell.draw();
      if (!currentCell.checkIfWallInDirection(this.player.direction)) {
        this.player.move();
      }
      this.process();
      this.player.draw();
      setTimeout(() => {
        this.update();
      }, 250);
      scoreText.innerHTML = this.score;
    }
  }
}

const game = new Game();
