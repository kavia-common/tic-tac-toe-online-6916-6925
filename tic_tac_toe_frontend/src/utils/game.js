const LINES = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

/**
 * PUBLIC_INTERFACE
 * emptyBoard returns a fresh 3x3 board as an array of 9 nulls.
 */
export function emptyBoard() {
  return Array(9).fill(null);
}

/**
 * PUBLIC_INTERFACE
 * calculateWinner returns 'X', 'O', or null based on the current board.
 */
export function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * getWinningLine returns the winning triple indices or null.
 */
export function getWinningLine(squares) {
  for (const triplet of LINES) {
    const [a, b, c] = triplet;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return triplet;
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * isDraw returns true if all squares are filled and there is no winner.
 */
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

/**
 * PUBLIC_INTERFACE
 * nextPlayer computes next player symbol from current board; X starts.
 */
export function nextPlayer(squares) {
  const xCount = squares.filter(v => v === 'X').length;
  const oCount = squares.filter(v => v === 'O').length;
  return xCount === oCount ? 'X' : 'O';
}
