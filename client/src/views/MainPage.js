import React from "react";
import { Link } from "react-router-dom";

export default function MainPage({ userAuthenticated, user }) {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title is-1">Hello!</h1>
        <p>Welcome to my pokemahjong game!</p>
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
          I'm a Front-end Developer currently looking for a job and I made this
          project to practice my React skills.
        </p>
      </div>
    </div>
  );
}
