import React from "react";

export default function GameStatus({
  time,
  tilesLeft,
  possibleMoves,
  pauseGame,
}) {
  return (
    <>
      <div className="clock">
        <div className="clock__inner">
          <button className="button--timer" onClick={pauseGame}>
            {time.clock}
          </button>
        </div>
      </div>
      <div className="game-info">
        <div>
          <div className="game-info__item">
            Tiles: <span className="game-info__number">{tilesLeft}</span>
          </div>
          <div className="game-info__item">
            Moves: <span className="game-info__number">{possibleMoves}</span>
          </div>
        </div>
      </div>
    </>
  );
}
