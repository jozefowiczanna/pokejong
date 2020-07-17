import React from "react";
import { Link } from "react-router-dom";
import lockedTilesImg from "./../assets/images/lockedtiles.png";

export default function MainPage({ userAuthenticated, user }) {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title is-2">PokeJong</h1>
        <p>Welcome to my pokemahjong game!</p>
        <p>
          I'm a Front-end Developer currently looking for a job and I made this
          project to practice my React skills.{" "}
          <Link to="/about">Learn more</Link>.
        </p>
        {userAuthenticated ? (
          <p>
            You are logged in as <b>{user.username}</b>. Your scores will be
            saved to the database. You can view them{" "}
            <Link to="/account">here</Link>.
          </p>
        ) : (
          <p>
            You are currently not logged in. You can play as a guest, but if you
            want to save your scores, <Link to="/register">register</Link> new
            account or <Link to="/login">log in</Link> if you already have one.
          </p>
        )}
        <p>
          <Link to="/game">PLAY</Link> or scroll down to learn more.
        </p>
        <h2 className="title is-3">How to play?</h2>
        <p>
          The original mahjong consist of tiles based on Chinese characters and
          symbols. I wanted to try something different and i decided to use free
          pokemon pictures from PokeAPI. Each time the game starts, a random set
          of 30 images will be loaded.
        </p>
        <p>
          The goal is to match pairs of identical tiles and remove them from the
          board. Translucent cards are currently locked. To unlock them you have
          remove tile next to them.
        </p>
        <div className="centeredImage">
          <img src={lockedTilesImg} />
        </div>
        <p>
          After starting the game, the timer will start counting. Information
          about the remaining number of tiles and the number of possible moves
          will be displayed in the upper left corner. If no move can be made,
          the tiles will be shuffled automatically.
        </p>
        <p>
          When all the tiles are removed, the game will end and the result will
          be added to the database. If you are logged in, you can view a list of
          the best results on your account page.
        </p>
      </div>
    </div>
  );
}
