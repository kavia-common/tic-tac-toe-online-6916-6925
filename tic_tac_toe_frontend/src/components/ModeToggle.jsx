import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ModeToggle allows switching between PvP and PvC.
 * Props:
 * - mode: 'pvp' | 'pvc'
 * - onChange: (mode)=>void
 */
export default function ModeToggle({ mode, onChange }) {
  const isPvp = mode === 'pvp';
  const isPvc = mode === 'pvc';

  return (
    <div className="segmented" role="group" aria-label="Game mode toggle">
      <button
        className="segmented-btn"
        aria-pressed={isPvp}
        onClick={() => onChange('pvp')}
      >
        PvP
      </button>
      <button
        className="segmented-btn"
        aria-pressed={isPvc}
        onClick={() => onChange('pvc')}
      >
        PvC
      </button>
    </div>
  );
}
