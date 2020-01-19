const BULL_SPRINT = "./images/bull.png";

class Player {
  constructor(xCoord, yCoord, startDirection) {
    this.direction = startDirection;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
  }

  draw() {
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
    switch (this.direction) {
      case directions.UP:
        drawImage(BULL_SPRINT, this.xValue, this.yValue, 0);
        break;
      case directions.DOWN:
        drawImage(BULL_SPRINT, this.xValue, this.yValue, Math.PI);
        break;
      case directions.RIGHT:
        drawImage(BULL_SPRINT, this.xValue, this.yValue, Math.PI / 2);
        break;
      case directions.LEFT:
        drawImage(BULL_SPRINT, this.xValue, this.yValue, -Math.PI / 2);
        break;
    }
  }

  move() {
    switch (this.direction) {
      case directions.UP:
        this.yCoord = this.yCoord - 1;
        break;
      case directions.DOWN:
        this.yCoord = this.yCoord + 1;
        break;
      case directions.RIGHT:
        this.xCoord = this.xCoord + 1;
        break;
      case directions.LEFT:
        this.xCoord = this.xCoord - 1;
        break;
    }
  }

  turn(e) {
    e = e || window.event;

    if (Object.values(directions).indexOf(e.keyCode) > -1) {
      this.direction = e.keyCode;
    }
  }

  getPlayerLocation() {
    return [this.yCoord, this.xCoord];
  }
}
