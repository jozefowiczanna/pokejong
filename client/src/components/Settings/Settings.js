import React from 'react';
import cx from 'classnames';

const difficulties = ["standard", "big"];
const themes = ["numbers", "pokemons", "dogs"];

export default function Settings({ startGame, setDifficulty, setTheme, difficulty, theme }) {
  return (
    <div className="container">
      <h2 className="title">Select options</h2>
      <div className="">
        <div>
          <div className="option-title">Choose level difficulty</div>
          {
            difficulties.map(item => (
              <button
                className={cx("button is-link", {"is-light": difficulty !== item})} 
                onClick={(e) => setDifficulty(e.target.value)}
                value={item}
              >{item}</button>
            ))
          }
        </div>
        <div>
          <div className="option-title">Choose tiles theme</div>
          {
            themes.map(item => (
              <button
                className={cx("button is-link", {"is-light": theme !== item})} 
                onClick={(e) => setTheme(e.target.value)}
                value={item}
              >{item}</button>
            ))
          }
        
          <div>
            <div className="button-center">
              <button
                className="button is-success button--big"
                onClick={startGame}
              >PLAY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
