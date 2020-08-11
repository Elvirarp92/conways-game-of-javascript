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

  fps: 1, //sic
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
    this.gameState = Array(this.gridSize.rows).fill(Array(this.gridSize.cols).fill(0))
    this.newGameState = this.gameState
    this.drawCells()
    this.drawGrid()
    this.interval = setInterval(() => this.gameLoop, this.fps)
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

  checkNeighbors(row, col) {
    /* Checks how many of the neighbor cells are alive. This function works for toroidal topology */
    return (
      this.checkAliveness((row - 1) % this.gridSize.rows, (col - 1) % this.gridSize.cols) +
      this.checkAliveness((row - 1) % this.gridSize.rows, col) +
      this.checkAliveness(row - (1 % this.gridSize.rows), (col + 1) % this.gridSize.cols) +
      this.checkAliveness(row, (col - 1) % this.gridSize.cols) +
      this.checkAliveness(row, (col + 1) % this.gridSize.cols) +
      this.checkAliveness((row + 1) % this.gridSize.rows, (col - 1) % this.gridSize.cols) +
      this.checkAliveness((row + 1) % this.gridSize.rows, col) +
      this.checkAliveness((row + 1) % this.gridSize.rows, (col + 1) % this.gridSize.cols)
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
  },
}
