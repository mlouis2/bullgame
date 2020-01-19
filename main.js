const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const NUM_ROWS = 9;
const NUM_COLS = 16;

let totalScore = 0;

const scoreText = document.getElementById("score");
const score = document.getElementById("scoreText");

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomLocationWithinCanvas() {
  return [getRandomInt(NUM_COLS), getRandomInt(NUM_ROWS)];
}

class GameControl {
  constructor() {
    totalScore = 0;
    playAndLoopMusic(1.62);
    this.level = 1;
    this.game = new Game(
      this.gameOverCallback,
      this.level,
      getDoorLocationAtLevel(this.level),
      getPlayerStartLocationAtLevel(this.level),
      getPlayerStartDirectionAtLevel(this.level),
      80
    );
  }
  gameOverCallback(gameOverStatus) {
    //Means that player won
    if (gameOverStatus === 1) {
      if (this.level !== NUM_LEVELS) {
        this.level++;
        this.game = new Game(
          this.gameOverCallback,
          this.level,
          getDoorLocationAtLevel(this.level),
          getPlayerStartLocationAtLevel(this.level),
          getPlayerStartDirectionAtLevel(this.level),
          totalScore
        );
      } else {
        drawModel(this.gameOver, totalScore);
      }
    } else {
      drawModel(this.gameOver, totalScore);
    }
  }
}

class Game {
  constructor(
    gameOverCallback,
    level,
    doorLocation,
    playerStartLocation,
    playerStartDirection
  ) {
    setBackground();
    this.level = level;
    this.gameOverCallback = gameOverCallback;
    // 0 is game not over, 1 is game won, 2 is game lost
    this.gameOver = 0;
    this.numTicks = 0;
    this.doorLocation = doorLocation;
    score.style.marginLeft = canvas.offsetLeft;
    this.grid = new Grid(
      NUM_ROWS,
      NUM_COLS,
      cellSize,
      this.doorLocation,
      this.level
    );
    this.player = new Player(
      playerStartLocation[0],
      playerStartLocation[1],
      playerStartDirection
    );
    document.onkeydown = this.player.turn.bind(this.player);
    let randomLocation = getRandomLocationWithinCanvas();
    this.enemy = new Enemy(randomLocation[0], randomLocation[1], 1.0);
    this.grid.draw();
    this.update();
  }

  process() {
    const cell = this.grid.getCellAt(this.player.getPlayerLocation());
    if (cell.chinaId === 1) {
      cell.removeChina();
      totalScore++;
    }
    const doorFound =
      this.player.getPlayerLocation()[0] === this.doorLocation[0] &&
      this.player.getPlayerLocation()[1] === this.doorLocation[1];
    const caughtByEnemy =
      this.player.getPlayerLocation()[0] === this.enemy.getEnemyLocation()[0] &&
      this.player.getPlayerLocation()[1] === this.enemy.getEnemyLocation()[1];
    if (doorFound) {
      this.gameOver = 1;
    }
    if (caughtByEnemy) {
      this.gameOver = 2;
    }
  }

  getAvailableMoves() {
    let possibleMoves = [];
    let currentEnemyCell = this.grid.getCellAt(this.enemy.getEnemyLocation());
    if (!currentEnemyCell.checkIfWallInDirection(directions.UP)) {
      possibleMoves.push(directions.UP);
    }
    if (!currentEnemyCell.checkIfWallInDirection(directions.RIGHT)) {
      possibleMoves.push(directions.RIGHT);
    }
    if (!currentEnemyCell.checkIfWallInDirection(directions.DOWN)) {
      possibleMoves.push(directions.DOWN);
    }
    if (!currentEnemyCell.checkIfWallInDirection(directions.LEFT)) {
      possibleMoves.push(directions.LEFT);
    }
    return possibleMoves;
  }

  async update() {
    if (this.gameOver === 0) {
      const currentPlayerCell = this.grid.getCellAt(
        this.player.getPlayerLocation()
      );
      currentPlayerCell.draw();
      const currentEnemyCell = this.grid.getCellAt(
        this.enemy.getEnemyLocation()
      );
      currentEnemyCell.draw();
      if (!currentPlayerCell.checkIfWallInDirection(this.player.direction)) {
        this.player.move();
      }
      const availableMoves = this.getAvailableMoves();
      const bestMove = this.enemy.getBestMoveWithManhattan(
        availableMoves,
        this.player.getPlayerLocation()
      );
      this.enemy.direction = bestMove;
      if (this.numTicks % 10 === 0) {
        this.enemy.teleport(
          NUM_ROWS,
          NUM_COLS,
          this.player.getPlayerLocation()
        );
      } else {
        this.enemy.move();
      }
      this.enemy.draw();
      this.player.draw();
      this.process();
      setTimeout(() => {
        this.update();
      }, 250);
      scoreText.innerHTML = totalScore;
      this.numTicks++;
    } else {
      this.gameOverCallback(this.gameOver);
    }
  }
}

const gameControl = new GameControl();
