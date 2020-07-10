import React, { Component } from "react";
import Board from "./components/Board/Board";
import { shuffle, formatTime } from "./utilities/utilities";
import Settings from "./components/Settings/Settings";

const options = {
  standard: [6, 5],
  big: [10, 8],
};

export default class App extends Component {
  state = {
    board: [],
    cols: 0,
    sides: {
      left: [],
      right: [],
    },
    activeId: null,
    tilesLeft: 0,
    time: {
      seconds: 0,
      clock: "0:00",
    },
    settingsOn: true,
    gameStarted: false,
    gameFinished: false,
    possibleMoves: 0,
    difficulty: "standard",
    theme: "numbers",
    randomNumbers: [],
    tilesTotalNr: 0,
  };

  componentDidMount() {
    this.createBoard(options.standard[0], options.standard[1]);
    this.startTimer();
  }

  createBoard = (rowNr, colNr) => {
    const tilesNr = rowNr * colNr;
    const pairs = tilesNr / 2;

    // prepare list of numbers
    let init = Array.from(Array(pairs).keys()).map((x) => ++x);
    // duplicate list - each number must appear twice
    init = [...init, ...init];
    init = shuffle(init);

    const setInitialArrays = (row, col) => {
      // prepare list of unlocked elements which user can click
      // those are elements at the beginning and at the end each row
      let y = 0;
      const left = [0];
      const right = [];
      for (let i = 0; i < row; i++) {
        y = y + col;
        right.push(y - 1);
        if (y === row * col) {
          continue;
        }
        left.push(y);
      }
      const sides = {
        left,
        right,
      };
      return sides;
    };

    const sides = setInitialArrays(rowNr, colNr);
    let board = [];

    init.forEach((el, index) => {
      const obj = {
        value: el,
        empty: false,
      };

      if (sides.left.includes(index) || sides.right.includes(index)) {
        // unlock all left/right edge elements
        obj.locked = false;
      } else {
        obj.locked = true;
      }
      board.push(obj);
    });

    // generate list of random numbers between 1 and 300
    // it will be used to load random images
    let numbers = Array.from(Array(300).keys()).map((x) => ++x);
    numbers = shuffle(numbers).slice(0, tilesNr + 1);
    this.setState({
      randomNumbers: numbers,
    });

    this.setState({
      board: board,
      tilesTotalNr: tilesNr,
      cols: colNr,
      sides: sides,
      tilesLeft: tilesNr,
      settingsOn: false,
      gameStarted: true,
    });

    // state update delay, had to add setTimeout to prevent infinite loop
    setTimeout(() => {
      this.checkPossibleMoves(board);
    }, 50);
  };

  handleClick = (currentId) => {
    const { sides, board, activeId, tilesLeft } = this.state;
    if (board[currentId].locked) {
      return;
    }

    // set active element
    if (activeId === null) {
      this.setState({
        activeId: currentId,
      });
      return;
    }
    if (activeId !== null) {
      // first element is selected, compare second element value
      if (activeId === currentId) {
        // same button was pressed twice, deselect active button
        this.setState({
          activeId: null,
        });
        return;
      } else if (board[activeId].value !== board[currentId].value) {
        // numbers don't match, set activeId to last selected item
        this.setState({
          activeId: currentId,
        });
        return;
      }
      // console.log("same numbers, set both values to null, and empty to true, set activeId to null");
      // VALUES MUSZĄ ZOSTAĆ!!!
    }

    // Both selected items have matching value and should be removed from board.
    // Adjacent items should be unlocked for user action.
    const getAdjacentIdAndSide = (id) => {
      const Obj = {
        adjacentId: 0,
        whichSide: "",
      };
      if (sides.left.includes(id)) {
        Obj.adjacentId = id + 1;
        Obj.whichSide = "left";
      } else if (sides.right.includes(id)) {
        Obj.adjacentId = id - 1;
        Obj.whichSide = "right";
      }
      return Obj;
    };

    // make copy of state items for updates
    let sidesCopy = { ...sides };
    let boardCopy = board.slice();

    // both selected items have matching value and should be removed from board
    // Adjacent items should be unlocked for user action
    // currentId is the index of the last clicked element
    // activeId is the index of previously clicked element
    const ids = [currentId, activeId];
    ids.forEach((id) => {
      const additionalInfo = getAdjacentIdAndSide(id);
      sidesCopy[additionalInfo.whichSide].push(additionalInfo.adjacentId); // sides.left or sides.right
      boardCopy[id].empty = true;
      boardCopy[additionalInfo.adjacentId].locked = false;
    });

    const tilesLeftUpt = tilesLeft - 2;

    this.setState({
      board: boardCopy,
      sides: sidesCopy,
      activeId: null,
      tilesLeft: tilesLeftUpt,
    });

    // if all tiles were removed, game is finished
    if (tilesLeftUpt === 0) {
      this.setState({
        gameStarted: false,
        gameFinished: true,
      });
      // stop timer
      clearInterval(this.timer);
    } else {
      // check if there are possible moves, otherwise shuffle elements
      this.checkPossibleMoves(boardCopy);
    }
  };

  shuffleAll = () => {
    const { board } = this.state;
    let arr = [];
    board.forEach((el) => {
      if (!el.empty) {
        arr.push(el.value);
      }
    });

    arr = shuffle(arr);

    const boardCopy = board.map((el) => {
      if (el.empty) {
        return el;
      } else {
        el.value = arr.shift();
        return el;
      }
    });

    this.setState({
      board: boardCopy,
      activeId: null,
    });

    this.checkPossibleMoves(boardCopy);
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      const seconds = this.state.time.seconds + 1;
      const clock = formatTime(seconds);

      this.setState({
        time: {
          seconds,
          clock,
        },
      });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  checkPossibleMoves = (board) => {
    const unlockedTiles = {};
    let possibleMoves = 0;
    // map through list of active and unlocked elements and check how many times each number appears
    board.forEach((item) => {
      if (!item.empty && !item.locked) {
        if (!unlockedTiles.hasOwnProperty(item.value)) {
          unlockedTiles[item.value] = 0;
        }
        unlockedTiles[item.value] = unlockedTiles[item.value] + 1;
      }
    });
    // same number must appear at least twice to be removed
    Object.keys(unlockedTiles).map((key) => {
      if (unlockedTiles[key] > 1) possibleMoves++;
    });
    this.setState({
      possibleMoves: possibleMoves,
    });
    if (!possibleMoves) this.shuffleAll();
  };

  setDifficulty = (difficulty) => {
    console.log(difficulty);
    this.setState({
      difficulty: difficulty,
    });
  };

  setTheme = (theme) => {
    console.log(theme);
    this.setState({
      theme: theme,
    });
  };

  startGame = () => {
    const { difficulty } = this.state;

    this.createBoard(options[difficulty][0], options[difficulty][1]);
    this.startTimer();
  };

  render() {
    const {
      board,
      cols,
      activeId,
      time,
      tilesLeft,
      possibleMoves,
      gameFinished,
      difficulty,
      theme,
      tilesTotalNr,
      randomNumbers,
    } = this.state;

    return (
      <div>
        <div>
          <button className="hamburger">
            <span className="hamburger__box">
              <span className="hamburger__inner"></span>
            </span>
          </button>
        </div>
        <div>
          {false && (
            <Settings
              startGame={this.startGame}
              setDifficulty={this.setDifficulty}
              setTheme={this.setTheme}
              difficulty={difficulty}
              theme={theme}
            />
          )}
          {true && ( // gamestarted &&
            <>
              <div className="clock">
                <div className="clock__inner">{time.clock}</div>
              </div>
              <div className="game-info">
                <div>
                  <div className="game-info__item">
                    Tiles:{" "}
                    <span className="game-info__number">{tilesLeft}</span>
                  </div>
                  <div className="game-info__item">
                    Moves:{" "}
                    <span className="game-info__number">{possibleMoves}</span>
                  </div>
                </div>
              </div>
              <div>
                <Board
                  board={board}
                  handleClick={this.handleClick}
                  cols={cols}
                  activeId={activeId}
                  tilesTotalNr={tilesTotalNr}
                  randomNumbers={randomNumbers}
                />
              </div>
            </>
          )}
          {gameFinished && (
            <>
              <div>You won the game!</div>
              <div>
                You finished the game in <b>{time.clock}</b>!
              </div>
              <div>Play again (pokazuja sie opcje)</div>
            </>
          )}
        </div>
      </div>
    );
  }
}
