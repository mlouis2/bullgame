class Player {
  constructor(xCoord, yCoord, startDirection) {
    console.log("start directoin is " + startDirection);
    this.direction = startDirection;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
    this.draw();
  }

  draw() {
    console.log("this x coord is " + this.xCoord);
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
    ctx.fillStyle = "#6a0dad";
    ctx.fillRect(this.xValue, this.yValue, 10, 10);
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
        console.log("incrementing this.xcoord");
        this.xCoord = this.xCoord + 1;
        break;
      case directions.LEFT:
        this.xCoord = this.xCoord - 1;
        break;
    }
  }

  turn(e) {
    e = e || window.event;

    console.log(e.keyCode);
    if (e.keyCode in directions) {
      this.direction = directions[e.keyCode];
    }
    console.log("new direction is " + this.direction);
  }
}
