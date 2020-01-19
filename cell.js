const chinaIds = {
  noChina: 0,
  classic: 1
};

class Cell {
  //Wall values is a boolean, china id is a string
  constructor(xCoord, yCoord, walls, chinaId, cellSize) {
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

  draw() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      this.xValue - 1,
      this.yValue - 1,
      this.cellSize + 1,
      this.cellSize + 1
    );
    ctx.strokeStyle = "#6a0dad";
    ctx.lineWidth = 5;
    this.drawWalls();
    this.drawChina();
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
        this.xValue,
        this.yValue,
        this.xValue + this.cellSize,
        this.yValue
      );
    }
    if (this.leftWall) {
      drawLine(
        this.xValue,
        this.yValue,
        this.xValue,
        this.yValue + this.cellSize
      );
    }
    if (this.rightWall) {
      drawLine(
        this.xValue + this.cellSize,
        this.yValue,
        this.xValue + this.cellSize,
        this.yValue + this.cellSize
      );
    }
    if (this.bottomWall) {
      drawLine(
        this.xValue,
        this.yValue + this.cellSize,
        this.xValue + this.cellSize,
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
