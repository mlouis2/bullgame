const chinaIds = {
  noChina: 0,
  classic: 1
};

class Cell {
  //Wall values is a boolean, china id is a string
  constructor(xCoord, yCoord, walls, chinaId) {
    this.topWall = walls[0];
    this.rightWall = walls[1];
    this.bottomWall = walls[2];
    this.leftWall = walls[3];
    this.chinaId = chinaId;
    [this.xValue, this.yValue] = calculateXAndYPos(xCoord, yCoord);
  }

  removeChina() {
    this.chinaId = chinaIds.noChina;
  }

  draw() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.xValue, this.yValue, 10, 10);
  }
}
