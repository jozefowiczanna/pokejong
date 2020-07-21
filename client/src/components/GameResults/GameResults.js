import React from "react";
import { Link } from "react-router-dom";

export default function GameResults({ time, startGame, userAuthenticated }) {
  return (
    <div className="container">
      <div className="content">
        <div className="flex-centered">
          <h2 className="title is-3 has-text-centered mt-5">
            You won the game!
          </h2>
          <p className="has-text-centered">You finished the game in</p>
          <p className="has-text-centered">
            <b>{time.clock}</b>
          </p>
          {userAuthenticated ? (
            <>
              <p className="has-text-centered">
                Your score has been added to database.
              </p>
              <p className="has-text-centered">
                View <Link to="/account">all your result</Link> or check users{" "}
                <Link to="/top">top scores</Link>.
              </p>
            </>
          ) : (
            <>
              <p className="has-text-centered">
                <Link to="/login">Log in</Link> in to save your scores or check
                users <Link to="/top">top scores</Link>.
              </p>
            </>
          )}
          <button
            className="button is-link self-centered button--timer"
            onClick={startGame}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}
