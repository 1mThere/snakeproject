window.Utils = {
  randomInt(max) {
    return Math.floor(Math.random() * max);
  },

  positionsEqual(a, b) {
    return a.x === b.x && a.y === b.y;
  }
};