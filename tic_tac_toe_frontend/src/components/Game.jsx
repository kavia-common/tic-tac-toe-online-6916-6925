import React, { useEffect, useMemo, useState } from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import ModeToggle from './ModeToggle';
import { calculateWinner, getWinningLine, isDraw, nextPlayer, emptyBoard } from '../utils/game';
import { chooseComputerMove } from '../utils/ai';

/**
 * PUBLIC_INTERFACE
 * Game component manages the full game state for Tic Tac Toe.
 * - Supports PvP and PvC modes with simple AI
 * - Tracks scores for X, O, and Draws across rounds, persisted in localStorage
 * - Provides controls to reset board and clear scores
 * - Accessible controls and keyboard-friendly
 */
export default function Game() {
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem('ttt-board');
    return saved ? JSON.parse(saved) : emptyBoard();
  });
  const [xIsNext, setXIsNext] = useState(() => {
    const saved = localStorage.getItem('ttt-xIsNext');
    return saved ? JSON.parse(saved) : true;
  });
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('ttt-mode');
    return saved || 'pvp'; // 'pvp' or 'pvc'
  });
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ttt-scores');
    return saved ? JSON.parse(saved) : { X: 0, O: 0, Draws: 0 };
  });
  const [gameOver, setGameOver] = useState(false);

  const winner = useMemo(() => calculateWinner(board), [board]);
  const winningLine = useMemo(() => getWinningLine(board), [board]);
  const currentPlayer = xIsNext ? 'X' : 'O';

  // Persist basic states
  useEffect(() => {
    localStorage.setItem('ttt-board', JSON.stringify(board));
  }, [board]);
  useEffect(() => {
    localStorage.setItem('ttt-xIsNext', JSON.stringify(xIsNext));
  }, [xIsNext]);
  useEffect(() => {
    localStorage.setItem('ttt-mode', mode);
  }, [mode]);
  useEffect(() => {
    localStorage.setItem('ttt-scores', JSON.stringify(scores));
  }, [scores]);

  // Determine game over and update scores once
  useEffect(() => {
    if (winner && !gameOver) {
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    } else if (!winner && isDraw(board) && !gameOver) {
      setGameOver(true);
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  }, [winner, board, gameOver]);

  // Computer move effect for PvC when it's O's turn
  useEffect(() => {
    if (mode !== 'pvc') return;
    if (gameOver) return;
    if (currentPlayer !== 'O') return;

    // small delay for UX
    const timer = setTimeout(() => {
      const move = chooseComputerMove(board, 'O', 'X');
      if (move !== -1) {
        handleMove(move);
      }
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, currentPlayer, board, gameOver]);

  // PUBLIC_INTERFACE
  const handleMove = (index) => {
    if (board[index] || winner || gameOver) return;
    setBoard(prev => {
      const copy = prev.slice();
      copy[index] = currentPlayer;
      return copy;
    });
    setXIsNext(prev => !prev);
  };

  // PUBLIC_INTERFACE
  const handleResetBoard = () => {
    setBoard(emptyBoard());
    setXIsNext(true);
    setGameOver(false);
  };

  // PUBLIC_INTERFACE
  const handleResetScores = () => {
    setScores({ X: 0, O: 0, Draws: 0 });
    handleResetBoard();
  };

  // PUBLIC_INTERFACE
  const handleModeChange = (newMode) => {
    setMode(newMode);
    handleResetBoard();
  };

  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw(board)
      ? 'Draw'
      : `Turn: ${currentPlayer}`;

  return (
    <section className="game-card" aria-label="Tic Tac Toe Game">
      <div className="status-row" aria-live="polite">
        <div className="status-pill" role="status">
          <span className="dot" aria-hidden="true"></span>
          <span>{statusText}</span>
        </div>
        <div className="controls">
          <button className="btn btn-primary" onClick={handleResetBoard} aria-label="Reset current round">
            New Round
          </button>
          <button className="btn btn-danger" onClick={handleResetScores} aria-label="Reset all scores">
            Reset Scores
          </button>
        </div>
      </div>

      <Board
        board={board}
        onMove={handleMove}
        disabled={!!winner || gameOver || (mode === 'pvc' && currentPlayer === 'O')}
        winningLine={winningLine}
      />

      <ScoreBoard scores={scores} />

      <div className="helper-row">
        <div className="hint">
          {mode === 'pvp'
            ? 'Two players alternate turns.'
            : 'Play against computer. You are X and go first.'}
        </div>
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </div>
    </section>
  );
}
