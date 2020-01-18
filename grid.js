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
          [true, true, true, true],
          0,
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
