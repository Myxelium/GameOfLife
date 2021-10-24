function seed(a, b, c) {
  return Array.from(arguments);
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

function contains(cell) {
  return this.some(same.bind(null, cell));
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? "*" : " ";
};

const corners = (state = []) => {
  const livingCells = state.map(([x, y]) => {
    return [x, y];
  });
  const minX = Math.min(...livingCells.map(([x, y]) => x));
  const minY = Math.min(...livingCells.map(([x, y]) => y));
  const maxX = Math.max(...livingCells.map(([x, y]) => x));
  const maxY = Math.max(...livingCells.map(([x, y]) => y));

  if (livingCells.length === 0) {
    return {
      topRight: [0, 0],
      bottomLeft: [0, 0],
    };
  }

  return {
    topRight: [maxX, maxY],
    bottomLeft: [minX, minY],
  };
};

const printCells = (state) => {
  const { topRight, bottomLeft } = corners(state);
  const width = topRight[0] - bottomLeft[0] + 1;
  const height = topRight[1] - bottomLeft[1] + 1;
  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push(
      Array.from(Array(width), (_, x) => printCell([x + bottomLeft[0], y + bottomLeft[1]], state))
        .join("")
        .concat("\n")
    );
  }
  return rows.join("");
};

const getNeighborsOf = ([x, y]) => {
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
};

const getLivingNeighbors = (cell, state) => {
  return getNeighborsOf(cell).filter(contains.bind(state));
};

const willBeAlive = (cell, state) => {
  const livingNeighbors = getLivingNeighbors(cell, state).length;
  if (contains.call(state, cell)) {
    return livingNeighbors === 2 || livingNeighbors === 3;
  }
  return livingNeighbors === 3;
};

const calculateNext = (state) => {
  const { topRight, bottomLeft } = corners(state);
  const next = [];
  for (let x = bottomLeft[0] - 1; x <= topRight[0] + 1; x++) {
    for (let y = bottomLeft[1] - 1; y <= topRight[1] + 1; y++) {
      if (willBeAlive([x, y], state)) {
        next.push([x, y]);
      }
    }
  }
  return next;
};

const iterate = (state, iterations) => {
  if (iterations === 0) {
    return [state];
  }

  return [state, ...iterate(calculateNext(state), iterations - 1)];
};

const main = (pattern, iterations) => {
  var interval = 100;

  const startPattern = startPatterns[pattern];
  const states = iterate(startPattern, iterations);

  states.forEach((state, index) => {
    setTimeout(function () {
    console.log(printCells(state));
    }, index * interval);
  });
};

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4],
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3],
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2],
  ],
};

const [pattern, iterations] = process.argv.slice(2);

if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
  main(pattern, parseInt(iterations));
} else {
  console.log("Usage: node js/gameoflife.js rpentomino 50");
}

