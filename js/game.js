window.Game = (function () {
  function Game(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.reset();
  }

  Game.prototype.reset = function () {
    const startX = Math.floor(this.cols / 2);
    const startY = Math.floor(this.rows / 2);

    this.snake = [{ x: startX, y: startY }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.isGameOver = false;
    this.food = this.createFood();
  };

  Game.prototype.setDirection = function (direction) {
    this.nextDirection = direction;
  };

  Game.prototype.getDirection = function () {
    return this.direction;
  };

  Game.prototype.update = function () {
    if (this.isGameOver) return;

    this.direction = this.nextDirection;

    const head = this.snake[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };

    if (this.isOutOfBounds(newHead) || this.isOnSnake(newHead)) {
      this.isGameOver = true;
      return;
    }

    this.snake.unshift(newHead);

    if (window.Utils.positionsEqual(newHead, this.food)) {
      this.food = this.createFood();
    } else {
      this.snake.pop();
    }
  };

  Game.prototype.isOutOfBounds = function (position) {
    return (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= this.cols ||
      position.y >= this.rows
    );
  };

  Game.prototype.isOnSnake = function (position) {
    for (let i = 0; i < this.snake.length; i++) {
      if (window.Utils.positionsEqual(this.snake[i], position)) {
        return true;
      }
    }
    return false;
  };

  Game.prototype.createFood = function () {
    let food;

    do {
      food = {
        x: window.Utils.randomInt(this.cols),
        y: window.Utils.randomInt(this.rows)
      };
    } while (this.isOnSnake(food));

    return food;
  };

  Game.prototype.getState = function () {
    return {
      snake: this.snake,
      food: this.food,
      isGameOver: this.isGameOver
    };
  };

  return Game;
})();