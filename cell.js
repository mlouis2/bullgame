const chinaIds = {
  noChina: 0,
  classic: 1
};

const WALL_OFFSET = 1;

class Cell {
  constructor(xCoord, yCoord, walls, chinaId, cellSize) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.topWall = walls[0];
    this.rightWall = walls[1];
    this.bottomWall = walls[2];
    this.leftWall = walls[3];
    this.chinaId = chinaId;
    this.cellSize = cellSize;
    [this.xValue, this.yValue] = calculateXAndYPos(xCoord, yCoord);
  }

  removeChina() {
    this.chinaId = chinaIds.noChina;
  }

  getChina() {
    return this.chinaId;
  }

  draw() {
    ctx.fillStyle = "#ffe5b4";
    ctx.fillRect(
      this.xValue - 1,
      this.yValue - 1,
      this.cellSize + 1,
      this.cellSize + 1
    );
    ctx.strokeStyle = "#505050";
    this.drawWalls();
    this.drawChina();
    if (this.isDoor) {
      this.drawDoor();
    }
  }

  drawDoor() {
    drawImage("./images/door.png", this.xValue, this.yValue, 0);
  }

  drawChina() {
    switch (this.chinaId) {
      case 1:
        drawImage("./images/plate.png", this.xValue, this.yValue, 0);
        break;
      default:
        break;
    }
  }

  drawWalls() {
    if (this.topWall) {
      drawLine(
        this.xValue - WALL_OFFSET,
        this.yValue,
        this.xValue + this.cellSize + WALL_OFFSET,
        this.yValue
      );
    }
    if (this.leftWall) {
      drawLine(
        this.xValue,
        this.yValue - WALL_OFFSET,
        this.xValue,
        this.yValue + this.cellSize + WALL_OFFSET
      );
    }
    if (this.rightWall) {
      drawLine(
        this.xValue + this.cellSize,
        this.yValue - WALL_OFFSET,
        this.xValue + this.cellSize,
        this.yValue + this.cellSize + WALL_OFFSET
      );
    }
    if (this.bottomWall) {
      drawLine(
        this.xValue - WALL_OFFSET,
        this.yValue + this.cellSize,
        this.xValue + this.cellSize + WALL_OFFSET,
        this.yValue + this.cellSize
      );
    }
  }

  checkIfWallInDirection(direction) {
    switch (direction) {
      case directions.UP:
        return this.topWall;
        break;
      case directions.RIGHT:
        return this.rightWall;
        break;
      case directions.DOWN:
        return this.bottomWall;
        break;
      case directions.LEFT:
        return this.leftWall;
        break;
    }
  }
}
