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
    columns: 80,
  },

  fps: 1, //sic

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
    this.gameState = Array(this.gridSize.rows).fill(Array(this.gridSize.columns).fill(0))
    this.drawCells()
    this.drawGrid()
  },

  setDimensions() {
    this.appSize.height = this.tileSize * this.gridSize.rows
    this.appSize.width = this.tileSize * this.gridSize.columns
    this.canvasDom.height = this.appSize.height
    this.canvasDom.width = this.appSize.width
  },

  drawCells() {
    this.ctx.fillRect(0, 0, this.tileSize, this.tileSize)
    for (let y = 0; y < this.gridSize.rows; y++) {
      for (let x = 0; x < this.gridSize.columns; x++) {
        console.log([x,y])
        this.checkAliveness([x,y]) == 0 ? this.ctx.fillStyle = 'white' : this.ctx.fillStyle = 'black'
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
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


  checkAliveness(coordinates){
    /* Coordinates are an array like [x, y] where x denotes
    the column and y denotes the row */
    return this.gameState[coordinates[1]][coordinates[0]]
  },
}
