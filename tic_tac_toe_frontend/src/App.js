import React from 'react';
import './App.css';
import Game from './components/Game';

/**
 * PUBLIC_INTERFACE
 * App is the main shell that renders the header and the Game component.
 * It sets the Ocean Professional theme at the root and provides the centered layout.
 */
function App() {
  return (
    <div className="app-root">
      <header className="app-header" role="banner" aria-label="Tic Tac Toe Header">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">⭕</div>
          <div className="brand-text">
            <h1 className="title">Tic Tac Toe</h1>
            <p className="subtitle">Ocean Professional</p>
          </div>
        </div>
      </header>
      <main className="app-main" role="main">
        <Game />
      </main>
      <footer className="app-footer" role="contentinfo">
        <small>Built with React • Smooth transitions • Accessible</small>
      </footer>
    </div>
  );
}

export default App;
