const squareRegistry = new Map();

const chessSquare = (x, y) => {
    const xPosition = x;
    const yPosition = y;
    let predecessor;

    const knight_offsets = [
        [1, 2], [1, -2],
        [2, 1], [2, -1],
        [-1, 2], [-1, -2],
        [-2, 1], [-2, -1]
    ];

    const getPredecessor = () => predecessor;
    const setPredecessor = (newPredecessor) => {
        if (!predecessor) {
            predecessor = newPredecessor;
        }
    }

    const name = () => `${x}, ${y}`

    const createKnightMoves = () => {
        return knight_offsets.map(newSquareFrom).filter(Boolean);
    }

    const newSquareFrom = ([xOffset, yOffset]) => {
        const [newX, newY] = [xPosition+xOffset, yPosition+yOffset];
        if (0<=newX && newX<8 && 0<=newY && newY<8) {
            return chessSquare(newX, newY);
        }
    }

    if (squareRegistry.has(name())) {
        return squareRegistry.get(name());
    }
    else {
        const newSquare = {name, getPredecessor, setPredecessor, createKnightMoves}
        squareRegistry.set(name(), newSquare);
        return newSquare;
    }
}

const knightsTravails = (start, finish) => {
  squareRegistry.clear();

  const origin = chessSquare(...start);
  const target = chessSquare(...finish);

  const queue = [origin]; // Start BFS from origin
  while (!queue.includes(target)) { // Search for target
    const currentSquare = queue.shift();

    const enqueueList = currentSquare.createKnightMoves();
    enqueueList.forEach((square) => square.setPredecessor(currentSquare));
    queue.push(...enqueueList);
  }

  // Reconstruct path from target back to origin
  const path = [target];
  while (!path.includes(origin)) {
    const nextSquare = path.at(-1).getPredecessor();
    path.push(nextSquare);
  }

  path.reverse(); // Reverse to show origin → target
  console.log(`The shortest path was ${path.length - 1} moves!`);
  console.log("The moves were:");
  path.forEach(square => console.log(square.name()));
};

export { knightsTravails }


