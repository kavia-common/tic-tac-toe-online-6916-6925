import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square is an interactive button representing a board cell.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: ()=>void
 * - disabled: boolean
 * - winning: boolean to apply highlight style
 * - index: position index for aria/keyboard support
 */
export default function Square({ value, onClick, disabled, winning, index }) {
  const ariaLabel = value ? `Square ${index + 1} with ${value}` : `Empty square ${index + 1}`;
  const classNames = [
    'square',
    value === 'X' ? 'x' : '',
    value === 'O' ? 'o' : '',
    winning ? 'winning' : '',
  ].join(' ').trim();

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      role="gridcell"
      aria-label={ariaLabel}
    >
      <div className="content" aria-hidden="true">
        {value || ''}
      </div>
    </button>
  );
}
