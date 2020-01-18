class Player {
  constructor(startXCoord, startYCoord, startDirection) {
    this.direction = startDirection;
    [this.xValue, this.yValue] = calculateXAndYPos(startXCoord, startYCoord);
    this.draw();
  }

  draw() {
    ctx.fillStyle = "#6a0dad";
    ctx.fillRect(this.xValue, this.yValue, 10, 10);
  }

  move() {}

  turn(e) {
    e = e || window.event;

    if (Object.values(directions).indexOf(e.keyCode) > -1) {
      this.direction = directions[e.keyCode];
    }
  }
}
