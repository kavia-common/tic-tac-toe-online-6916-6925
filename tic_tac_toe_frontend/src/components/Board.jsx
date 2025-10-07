import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board renders a 3x3 grid of Square components.
 * Props:
 * - board: string[] length 9 with 'X' | 'O' | null
 * - onMove: (index:number)=>void
 * - disabled: boolean to prevent clicks
 * - winningLine: number[] | null indices to highlight
 */
export default function Board({ board, onMove, disabled, winningLine }) {
  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-disabled={disabled}
    >
      {board.map((value, idx) => {
        const isWinning = Array.isArray(winningLine) && winningLine.includes(idx);
        return (
          <Square
            key={idx}
            value={value}
            onClick={() => onMove(idx)}
            disabled={disabled || !!value}
            winning={isWinning}
            index={idx}
          />
        );
      })}
    </div>
  );
}
