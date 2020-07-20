import React from "react";

export default function GameResults({ time }) {
  return (
    <>
      <div>You won the game!</div>
      <div>
        You finished the game in <b>{time.clock}</b>!
      </div>
      <div>Play again (pokazuja sie opcje)</div>
    </>
  );
}
