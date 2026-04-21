(function () {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  let game = null;
  let lastTick = 0;

  function createGame() {
    window.Renderer.resizeCanvas(canvas);

    const cols = Math.floor(canvas.width / window.CONFIG.cellSize);
    const rows = Math.floor(canvas.height / window.CONFIG.cellSize);

    game = new window.Game(cols, rows);
    lastTick = 0;
  }

  function loop(timestamp) {
    if (!lastTick) {
      lastTick = timestamp;
    }

    if (timestamp - lastTick >= window.CONFIG.tickRate) {
      game.update();
      lastTick = timestamp;
    }

    window.Renderer.drawGame(ctx, canvas, game.getState());
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", function () {
    createGame();
  });

  window.Input.setup(
    function (direction) {
      game.setDirection(direction);
    },
    function () {
      return game.getDirection();
    }
  );

  createGame();
  requestAnimationFrame(loop);
})();