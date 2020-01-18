class Player {
  constructor(xCoord, yCoord, startDirection) {
    this.direction = startDirection;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
  }

  draw() {
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
    let sprite = new Image();
    sprite.src = "./images/bull.png";
    this.sprite.onload = this.drawImage(this.sprite, this.xValue, this.yValue);
  }

  drawImage(sprite, xValue, yValue) {
    console.log(sprite);
    ctx.drawImage(sprite, xValue, yValue);
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

    console.log(e.keyCode);
    if (e.keyCode in directions) {
      this.direction = directions[e.keyCode];
    }
    console.log("new direction is " + this.direction);
  }
}
