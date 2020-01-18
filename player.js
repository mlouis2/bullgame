const directions = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

class Player {
  constructor(startXCoord, startYCoord, startDirection) {
    this.startXCoord = startXCoord;
    this.startYCoord = startYCoord;
    this.direction = startDirection;
    [this.xValue, this.yValue] = calculateXAndYPos(xCoord, yCoord);
  }

  draw() {}

  move() {}

  //TODO: Need to listen to key presses in game.js, then call player.turn(event)
  turn(e) {
    e = e || window.event;

    if (Object.values(directions).indexOf(e.keyCode) > -1) {
      this.direction = directions[e.keyCode];
    }
  }
}
