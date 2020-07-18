export const getPossibleMovesNr = (board) => {
  const unlockedTiles = {};
  let possibleMoves = 0;
  // map through list of active (not removed) and unlocked elements and check how many times each number appears
  board.forEach((item) => {
    if (!item.empty && !item.locked) {
      if (!unlockedTiles.hasOwnProperty(item.value)) {
        unlockedTiles[item.value] = 0;
      }
      unlockedTiles[item.value] = unlockedTiles[item.value] + 1;
    }
  });
  // same element must appear at least twice to be removed
  Object.keys(unlockedTiles).map((key) => {
    if (unlockedTiles[key] > 1) possibleMoves++;
  });
  return possibleMoves;
};

export const setInitialArrays = (row, col) => {
  // prepare list of unlocked elements which user can click
  // those are elements at the beginning and at the end each row
  let y = 0;
  const left = [0];
  const right = [];
  for (let i = 0; i < row; i++) {
    y = y + col;
    right.push(y - 1);
    if (y === row * col) {
      continue;
    }
    left.push(y);
  }
  const sides = {
    left,
    right,
  };
  return sides;
};

// Function used when both selected items have matching value and should be removed from board.
// Adjacent items should be unlocked for user action.
export const getAdjacentIdAndSide = (id, sides) => {
  const Obj = {
    adjacentId: 0,
    whichSide: "",
  };
  if (sides.left.includes(id)) {
    Obj.adjacentId = id + 1;
    Obj.whichSide = "left";
  } else if (sides.right.includes(id)) {
    Obj.adjacentId = id - 1;
    Obj.whichSide = "right";
  }
  return Obj;
};
