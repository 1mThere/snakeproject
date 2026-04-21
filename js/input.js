window.Input = (function () {
  const KEY_DIRECTIONS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }
  };

  function isOppositeDirection(a, b) {
    return a.x === -b.x && a.y === -b.y;
  }

  function setup(onDirectionChange, getCurrentDirection) {
    window.addEventListener("keydown", function (event) {
      const nextDirection = KEY_DIRECTIONS[event.key];
      if (!nextDirection) return;

      const currentDirection = getCurrentDirection();
      if (isOppositeDirection(currentDirection, nextDirection)) return;

      onDirectionChange(nextDirection);
    });
  }

  return {
    setup
  };
})();