const chinaIds = {
  noChina: 0,
  classic: 1
};

//TODO: Move this to game.js and have it calculate the top left x and y pixel values
//based off of size of canvas.
calculateXAndYPos(xCoord, yCoord) {}

class Cell {
  //Wall values is a boolean, china id is a string
  constructor(
    xCoord,
    yCoord,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
    chinaId
  ) {
    this.topWall = topWall;
    this.rightWall = rightWall;
    this.bottomWall = bottomWall;
    this.leftWall = leftWall;
    this.chinaId = chinaId;
    const [this.xValue, this.yValue] = calculateXAndYPos(xCoord, yCoord);
  }

  removeChina() {
    this.chinaId = chinaIds.noChina;
    this.draw();
  }

  draw() {}
}
