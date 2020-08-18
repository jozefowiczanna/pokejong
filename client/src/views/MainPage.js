import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import logo from "../assets/images/pokejong.png";
import styles from "./styles/MainPage.module.scss";

export default function MainPage({ userAuthenticated, user }) {
  return (
    <div>
      <div className={styles["bg-cover"]}></div>
      <section className={`${styles["section"]} ${styles["section--main"]}`}>
        <div className={styles["table"]}>
          <div className={styles["table__cell"]}>
            <div className={styles["container-custom"]}>
              <FadeIn transitionDuration="700">
                <div className={styles["content"]}>
                  <h1 className={styles["title"]}>Pokejong</h1>
                  {userAuthenticated && (
                    <h2 className={styles["subtitle"]}>
                      Hello {user.username}!
                    </h2>
                  )}
                  <p className={styles["desc"]}>
                    What will come out of a combination of mahjong and pokemons?
                    Pokejong! Your goal is to unlock and remove all Pokemon
                    tiles from the board.
                  </p>
                  <div className={styles["buttons"]}>
                    <Link to="/game" className={styles["btn-link"]}>
                      <button className={styles["btn"]}>Play</button>
                    </Link>

                    {userAuthenticated ? (
                      <Link to="/account" className={styles["btn-link"]}>
                        <button
                          className={`${styles["btn"]} ${styles["btn--light"]}`}
                        >
                          Account
                        </button>
                      </Link>
                    ) : (
                      <Link to="/login" className={styles["btn-link"]}>
                        <button
                          className={`${styles["btn"]} ${styles["btn--light"]}`}
                        >
                          Log in
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </FadeIn>
              <FadeIn transitionDuration="700" delay="500">
                <div className={styles["logo"]}>
                  <div className={styles["logo__inner"]}>
                    <img
                      src={logo}
                      className={styles["logo__img"]}
                      alt="Pokejong logo"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
