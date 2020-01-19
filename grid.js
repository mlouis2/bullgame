function getWallBooleanArray(str) {
  return [
    str.includes("T"),
    str.includes("R"),
    str.includes("B"),
    str.includes("L")
  ];
}

class Grid {
  constructor(numRows, numCols, cellSize) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.cells = [];
    this.cellSize = cellSize;
    this.generateCells();
  }

  generateCells() {
    for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
      this.cells[rowNum] = [];
      for (let colNum = 0; colNum < this.numCols; colNum++) {
        this.cells[rowNum][colNum] = new Cell(
          colNum,
          rowNum,
          getWallBooleanArray(levelOneInfo.columns[colNum][rowNum][0]),
          levelOneInfo.columns[colNum][rowNum][1],
          this.cellSize
        );
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
}
