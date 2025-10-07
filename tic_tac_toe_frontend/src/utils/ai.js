import { calculateWinner } from './game';

/**
 * Try to find a move that makes 'player' win on this turn.
 */
function findWinningMove(board, player) {
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    const copy = board.slice();
    copy[i] = player;
    if (calculateWinner(copy) === player) return i;
  }
  return -1;
}

/**
 * Return list of indices matching a predicate.
 */
function indices(board, predicate) {
  const out = [];
  for (let i = 0; i < board.length; i++) {
    if (predicate(i)) out.push(i);
  }
  return out;
}

/**
 * PUBLIC_INTERFACE
 * chooseComputerMove selects an index based on priority:
 * 1) Win if possible
 * 2) Block opponent from winning
 * 3) Take center
 * 4) Take a corner
 * 5) Take any available
 */
export function chooseComputerMove(board, ai = 'O', human = 'X') {
  // 1. Try to win
  const winMove = findWinningMove(board, ai);
  if (winMove !== -1) return winMove;

  // 2. Try to block
  const blockMove = findWinningMove(board, human);
  if (blockMove !== -1) return blockMove;

  // 3. Center
  if (!board[4]) return 4;

  // 4. Corners
  const corners = [0, 2, 6, 8];
  const freeCorners = corners.filter(i => !board[i]);
  if (freeCorners.length > 0) {
    return freeCorners[Math.floor(Math.random() * freeCorners.length)];
  }

  // 5. Any available
  const free = indices(board, (i) => !board[i]);
  if (free.length === 0) return -1;
  return free[Math.floor(Math.random() * free.length)];
}
