import React from "react";

export default function PauseModal({ startGame, resumeGame }) {
  return (
    <div className="modal is-active modal--on-top">
      <div className="modal-background" onClick={resumeGame}></div>
      <div className="modal-content modal-content--short">
        <article className="message">
          <div className="message-header">
            <p className="has-text-centered w100">The game is paused</p>
          </div>
          <div className="message-body has-text-centered">
            <button className="button is-success" onClick={resumeGame}>
              Continue
            </button>
            <button className="button is-warning" onClick={startGame}>
              Restart
            </button>
          </div>
        </article>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={resumeGame}
      ></button>
    </div>
  );
}
