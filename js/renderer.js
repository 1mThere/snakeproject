window.Renderer = (function () {
  function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawGame(ctx, canvas, state) {
    const config = window.CONFIG;
    const cellSize = config.cellSize;
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, cols, rows, cellSize, config.gridColor);
    drawFood(ctx, state.food, cellSize, config.foodColor);
    drawSnake(ctx, state.snake, cellSize, config.snakeColor);

    if (state.isGameOver) {
      drawGameOver(ctx, canvas);
    }
  }

  function drawGrid(ctx, cols, rows, cellSize, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    for (let x = 0; x <= cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, rows * cellSize);
      ctx.stroke();
    }

    for (let y = 0; y <= rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(cols * cellSize, y * cellSize);
      ctx.stroke();
    }
  }

  function drawSnake(ctx, snake, cellSize, color) {
    ctx.fillStyle = color;

    for (let i = 0; i < snake.length; i++) {
      const segment = snake[i];
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    }
  }

  function drawFood(ctx, food, cellSize, color) {
    ctx.fillStyle = color;
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize,
      cellSize
    );
  }

  function drawGameOver(ctx, canvas) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  }

  return {
    resizeCanvas,
    drawGame
  };
})();