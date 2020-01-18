class Grid {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.cells = [];
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
          0
        );
      }
    }
  }

  draw() {
    console.log("drawing grid");
    for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
      for (let colNum = 0; colNum < this.numCols; colNum++) {
        this.cells[rowNum][colNum].draw();
      }
    }
  }
}
