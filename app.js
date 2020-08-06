const app = {
  name: "Conway's Game of Life",
  author: "Elvira Ramírez Ponce",
  version: "1.0",
  license: undefined,

  canvasDom: document.getElementById("game-board"),
  ctx: undefined,

  tileSize: 10,

  appSize: {
    // tile size * number of tiles on axis
    height: 10 * 60,
    width: 10 * 80
  },

  fps: 1, //sic
  framesCounter: 0,
  

}
