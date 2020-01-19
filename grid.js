function getWallBooleanArray(str) {
  return [
    str.includes("T"),
    str.includes("R"),
    str.includes("B"),
    str.includes("L")
  ];
}

class Grid {
  constructor(numRows, numCols, cellSize, doorLocation, level) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.cells = [];
    this.cellSize = cellSize;
    this.levelInfo = levelInfo[level - 1];
    this.generateCells(doorLocation);
  }

  generateCells(doorLocation) {
    for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
      this.cells[rowNum] = [];
      for (let colNum = 0; colNum < this.numCols; colNum++) {
        this.cells[rowNum][colNum] = new Cell(
          colNum,
          rowNum,
          getWallBooleanArray(this.levelInfo.columns[colNum][rowNum][0]),
          this.levelInfo.columns[colNum][rowNum][1],
          this.cellSize
        );
        if (rowNum === doorLocation[0] && colNum === doorLocation[1]) {
          this.cells[rowNum][colNum].isDoor = true;
        }
      }
    }
  }

  draw() {
    for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
      for (let colNum = 0; colNum < this.numCols; colNum++) {
        this.cells[rowNum][colNum].draw();
      }
    }
  }

  getCellAt(location) {
    return this.cells[location[0]][location[1]];
  }
}
