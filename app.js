const app = {
  name: "Conway's Game of Life",
  author: 'Elvira Ramírez Ponce',
  version: '1.0',
  license: undefined,

  canvasDom: document.getElementById('game-board'),
  ctx: undefined,

  tileSize: 10,

  gridSize: {
    // number of tiles in every axis
    rows: 60,
    cols: 80,
  },

  timeout: 100, //sic
  interval: undefined,

  appSize: {
    // size, in pixels, of the canvas
    height: undefined,
    width: undefined,
  },

  gameState: undefined,
  newGameState: undefined,

  framesCounter: 0,

  init() {
    this.ctx = this.canvasDom.getContext('2d')
    this.start()
  },

  start() {
    this.setDimensions()
    this.gameState = Array.from({ length: this.gridSize.rows }, () =>
      Array(this.gridSize.cols).fill(0)
    )
    this.setGlider()
    this.drawCells()
    this.drawGrid()
    this.interval = setInterval(() => this.gameLoop(), this.timeout)
  },

  setDimensions() {
    this.appSize.height = this.tileSize * this.gridSize.rows
    this.appSize.width = this.tileSize * this.gridSize.cols
    this.canvasDom.height = this.appSize.height
    this.canvasDom.width = this.appSize.width
  },

  drawCells() {
    this.ctx.fillRect(0, 0, this.tileSize, this.tileSize)
    for (let row = 0; row < this.gridSize.rows; row++) {
      for (let col = 0; col < this.gridSize.cols; col++) {
        this.checkAliveness(row, col) == 0
          ? (this.ctx.fillStyle = 'aquamarine')
          : (this.ctx.fillStyle = 'black')
        this.ctx.fillRect(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize)
      }
    }
  },

  drawGrid() {
    x = this.tileSize
    y = this.tileSize
    this.ctx.lineWidth = 0.2
    this.ctx.globalAlpha = 1
    while (x < this.appSize.width) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.appSize.height)
      this.ctx.stroke()
      this.ctx.closePath()
      x = x + this.tileSize
    }

    while (y < this.appSize.height) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.appSize.width, y)
      this.ctx.stroke()
      this.ctx.closePath()
      y = y + this.tileSize
    }
  },

  checkAliveness(row, col) {
    return this.gameState[row][col]
  },

  checkWrapAround(idx, len) {
    /* This function checks whether a point is beyond the borders of the canvas. If
    so, then it returns a value that points to the other side of the canvas, to emulate
    toroidal topology in 2d. 
    
    I am pretty sure there is a cleaner way to do this with modular arithmetics, but I 
    couldn't get it to work, so i'm taking the inefficient solution */
    if (idx <= -1) {
      return len - 1
    } else if (idx === len) {
      return 0
    } else {
      return idx
    }
  },

  checkNeighbors(row, col) {
    /* Checks how many of the neighbor cells are alive. This function works for toroidal topology */
    const left = this.checkWrapAround(col - 1, this.gridSize.cols)
    const right = this.checkWrapAround(col + 1, this.gridSize.cols)
    const up = this.checkWrapAround(row - 1, this.gridSize.rows)
    const down = this.checkWrapAround(row + 1, this.gridSize.rows)

    return (
      this.checkAliveness(up, left) +
      this.checkAliveness(up, col) +
      this.checkAliveness(up, right) +
      this.checkAliveness(row, left) +
      this.checkAliveness(row, right) +
      this.checkAliveness(down, left) +
      this.checkAliveness(down, col) +
      this.checkAliveness(down, right)
    )
  },

  changeCellState(row, col) {
    /* Determines if a cell lives or dies according to the Conway's Game of Life rules:
    1. A live cell with fewer than 2 live neighbors dies (underpopulation)
    2. A live cell with more than 3 live neighbors dies (overpopulation)
    3. A live cell with 2 or 3 live neighbors keeps on living
    4. A dead cell with exactly three neighbors will come to life (reproduction) */
    if (
      this.gameState[row][col] === 1 &&
      (this.checkNeighbors(row, col) < 2 || this.checkNeighbors(row, col) > 3)
    ) {
      this.newGameState[row][col] = 0
    } else if (this.gameState[row][col] === 0 && this.checkNeighbors(row, col) === 3) {
      this.newGameState[row][col] = 1
    }
  },

  gameLoop() {
    this.newGameState = _.cloneDeep(this.gameState)
    for (let row = 0; row < this.gridSize.rows; row++) {
      for (let col = 0; col < this.gridSize.cols; col++) {
        this.changeCellState(row, col)
      }
    }
    this.gameState = _.cloneDeep(this.newGameState)
    this.drawCells()
    this.drawGrid()
  },

  setGlider() {
    /*     this.gameState[0][1] = 1
    this.gameState[1][2] = 1
    this.gameState[2][0] = 1
    this.gameState[2][1] = 1
    this.gameState[2][2] = 1 */

    /* CENTER GLIDER */
    this.gameState[25][26] = 1
    this.gameState[26][27] = 1
    this.gameState[27][25] = 1
    this.gameState[27][26] = 1
    this.gameState[27][27] = 1
  },
}
