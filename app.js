const app = {
  name: "Conway's Game of Life",
  author: 'Elvira Ramírez Ponce',
  version: '1.0',
  license: undefined,

  canvasDom: document.getElementById('game-board'),
  ctx: undefined,

  tileSize: 10,

  appSize: {
    // size, in pixels, of the canvas
    height: undefined,
    width: undefined,
  },

  gridSize: {
    // number of tiles in every axis
    rows: 60,
    columns: 80,
  },

  fps: 1, //sic
  framesCounter: 0,

  init(){
    this.ctx = this.canvasDom.getContext('2d')
    this.start()
  },

  start(){
    this.setDimensions()
  },

  setDimensions() {
    this.appSize.height = this.tileSize * this.gridSize.rows
    this.appSize.width = this.tileSize * this.gridSize.columns
    this.canvasDom.height = this.appSize.height
    this.canvasDom.width = this.appSize.width
  },
}
