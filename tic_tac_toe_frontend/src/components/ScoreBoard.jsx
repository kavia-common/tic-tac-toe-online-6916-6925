import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ScoreBoard displays the scores for X, O, and Draws.
 * Props:
 * - scores: { X: number, O: number, Draws: number }
 */
export default function ScoreBoard({ scores }) {
  return (
    <div className="scoreboard" aria-label="Score board">
      <div className="score x" aria-live="polite">
        <div className="label">X</div>
        <div className="value">{scores.X}</div>
      </div>
      <div className="score draw" aria-live="polite">
        <div className="label">Draws</div>
        <div className="value">{scores.Draws}</div>
      </div>
      <div className="score o" aria-live="polite">
        <div className="label">O</div>
        <div className="value">{scores.O}</div>
      </div>
    </div>
  );
}
