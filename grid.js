function getWallBooleanArray(str) {
  return [
    str.includes("T"),
    str.includes("R"),
    str.includes("B"),
    str.includes("L")
  ];
}

class Grid {
  constructor(numRows, numCols, cellSize, doorLocation) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.cells = [];
    this.cellSize = cellSize;
    this.generateCells(doorLocation);
  }

  generateCells(doorLocation) {
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
