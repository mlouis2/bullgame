const ENEMY_SPRINT = "./images/man.png";

class Enemy {
  constructor(xCoord, yCoord, speed, direction) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.speed = speed;
    this.direction = direction;
    [this.xValue, this.yValue] = calculateXAndYPos(xCoord, yCoord);
  }

  draw() {
    [this.xValue, this.yValue] = calculateXAndYPos(this.xCoord, this.yCoord);
    switch (this.direction) {
      case directions.UP:
        drawImage(ENEMY_SPRINT, this.xValue, this.yValue, 0);
        break;
      case directions.DOWN:
        drawImage(ENEMY_SPRINT, this.xValue, this.yValue, Math.PI);
        break;
      case directions.RIGHT:
        drawImage(ENEMY_SPRINT, this.xValue, this.yValue, Math.PI / 2);
        break;
      case directions.LEFT:
        drawImage(ENEMY_SPRINT, this.xValue, this.yValue, -Math.PI / 2);
        break;
    }
  }

  findBestDirectionToGoalWithManhattan(goalCoord) {
    let distancesFromNextMove = {
      "UP": Number.POSITIVE_INFINITY,
      "RIGHT": Number.POSITIVE_INFINITY,
      "DOWN": Number.POSITIVE_INFINITY,
      "LEFT": Number.POSITIVE_INFINITY
    };
    if (this.yCoord > 0) {
      distancesFromNextMove["UP"] = calculateManhattanDistance([this.xCoord, this.yCoord - 1], goalCoord);
    }
    if (this.xCoord < NUM_COLS - 1) {
      distancesFromNextMove["RIGHT"] = calculateManhattanDistance([this.xCoord + 1, this.yCoord], goalCoord);
    }
    if (this.yCoord < NUM_ROWS - 1) {
      distancesFromNextMove["DOWN"] = calculateManhattanDistance([this.xCoord, this.yCoord + 1], goalCoord);
    }
    if (this.xCoord > 0) {
      distancesFromNextMove["LEFT"] = calculateManhattanDistance([this.xCoord - 1, this.yCoord], goalCoord);
    }
    return Object.keys(distancesFromNextMove).reduce((key, v) => distancesFromNextMove[v] < distancesFromNextMove[key] ? v : key);
  }

  getRandomDirection(possibleDirections) {
    let randomDirection = Math.floor(Math.random() * Object.keys(possibleDirections).length);
    return possibleDirections[Object.keys(possibleDirections)[randomDirection]];
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

  getEnemyLocation() {
    return [this.yCoord, this.xCoord];
  }
}
