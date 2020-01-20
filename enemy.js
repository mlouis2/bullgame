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

  getRandomDirection(possibleDirections) {
    let randomDirection = Math.floor(
      Math.random() * Object.keys(possibleDirections).length
    );
    return possibleDirections[Object.keys(possibleDirections)[randomDirection]];
  }

  getTranslation(move) {
    switch (move) {
      case directions.UP:
        return [this.xCoord, this.yCoord - 1];
      case directions.DOWN:
        return [this.xCoord, this.yCoord + 1];
      case directions.LEFT:
        return [this.xCoord - 1, this.yCoord];
      case directions.RIGHT:
        return [this.xCoord + 1, this.yCoord];
    }
  }

  getBestMoveWithManhattan(availableMoves, playerLocation) {
    const playerY = playerLocation[0];
    const playerX = playerLocation[1];
    let bestCombo = ["", 1000];
    availableMoves.forEach(move => {
      const [x2, y2] = this.getTranslation(move);
      const manhattan = this.calculateManhattan(playerX, playerY, x2, y2);
      if (manhattan < bestCombo[1]) {
        bestCombo = [move, manhattan];
      }
    });
    return bestCombo[0];
  }

  calculateManhattan(x, y, x2, y2) {
    return Math.abs(x - x2) + Math.abs(y - y2);
  }

  teleport(numRows, numCols, playerLocation) {
    let position = [0, 0];
    do {
      position[0] = Math.floor(Math.random() * numRows);
      position[1] = Math.floor(Math.random() * numCols);
    } while (
      this.calculateManhattan(position[0], position[1], playerLocation[0], playerLocation[1]) < 3
    );
    this.xCoord = position[1];
    this.yCoord = position[0];
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
