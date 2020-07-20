import React, { Component } from "react";
import Board from "../components/Board/Board";
import { shuffle, formatTime } from "../utils/utils";
import {
  getPossibleMovesNr,
  setInitialArrays,
  getAdjacentIdAndSide,
} from "../utils/gameUtils";
import GameStatus from "../components/GameStatus/GameStatus";
import GameResults from "../components/GameResults/GameResults";

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
    gameStarted: false,
    gameFinished: false,
    possibleMoves: 0,
    tilesTotalNr: 0,
    randomNumbers: [],
  };

  createBoard = (rowNr, colNr) => {
    const tilesNr = rowNr * colNr;
    const pairs = tilesNr / 2;

    // prepare list of numbers
    let init = Array.from(Array(pairs).keys()).map((x) => ++x);
    // duplicate list - each number must appear twice
    init = [...init, ...init];
    init = shuffle(init);

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
      gameStarted: true,
    });

    // state update delay, had to add setTimeout to prevent infinite loop
    setTimeout(() => {
      this.setPossibleMovesOrShuffle(board);
    }, 50);
  };

  handleClick = (currentId) => {
    const { sides, board, activeId, tilesLeft, gameStarted } = this.state;
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
    }

    // make copy of state items for updates
    let sidesCopy = { ...sides };
    let boardCopy = board.slice();

    // both selected items have matching value and should be removed from board
    // Adjacent items should be unlocked for user action
    // currentId is the index of the last clicked element
    // activeId is the index of previously clicked element
    const ids = [currentId, activeId];
    ids.forEach((id) => {
      const additionalInfo = getAdjacentIdAndSide(id, sides);
      sidesCopy[additionalInfo.whichSide].push(additionalInfo.adjacentId); // sides.left or sides.right
      boardCopy[id].empty = true;
      if (boardCopy[additionalInfo.adjacentId]) {
        boardCopy[additionalInfo.adjacentId].locked = false;
      }
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
      this.setPossibleMovesOrShuffle(boardCopy);
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

    this.setPossibleMovesOrShuffle(boardCopy);
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

  setPossibleMovesOrShuffle = (board) => {
    const possibleMoves = getPossibleMovesNr(board);
    this.setState({
      possibleMoves: possibleMoves,
    });
    if (!possibleMoves) this.shuffleAll();
  };

  startGame = () => {
    this.createBoard(6, 5);
    this.startTimer();
    this.setState({
      gameIsLoading: true,
    });
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
      tilesTotalNr,
      randomNumbers,
      gameStarted,
    } = this.state;

    return (
      <>
        <div className="bodybg"></div>
        <div>
          {!gameStarted && (
            <button className="button" onClick={this.startGame}>
              START
            </button>
          )}
          {gameStarted && (
            <>
              <GameStatus
                time={time}
                tilesLeft={tilesLeft}
                possibleMoves={possibleMoves}
              />
              <Board
                board={board}
                handleClick={this.handleClick}
                cols={cols}
                activeId={activeId}
                tilesTotalNr={tilesTotalNr}
                randomNumbers={randomNumbers}
              />
            </>
          )}
          {gameFinished && <GameResults time={time} />}
        </div>
      </>
    );
  }
}
