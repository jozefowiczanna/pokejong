import React from "react";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import cx from "classnames";

export default function Nav({
  isNavOpen,
  toggleNav,
  closeNav,
  userAuthenticated,
  logoutUser,
}) {
  const authLinks = userAuthenticated ? (
    <li className={styles.navigationItem} onClick={closeNav}>
      <Link className={styles.navigationLink} to="/account">
        Account
      </Link>
    </li>
  ) : (
    <>
      <li className={styles.navigationItem} onClick={closeNav}>
        <Link className={styles.navigationLink} to="/login">
          Log in
        </Link>
      </li>
      <li className={styles.navigationItem} onClick={closeNav}>
        <Link className={styles.navigationLink} to="/register">
          Register
        </Link>
      </li>
    </>
  );

  const logoutLink = userAuthenticated ? (
    <li
      className={styles.navigationItem}
      onClick={(e) => {
        closeNav();
        logoutUser();
      }}
    >
      <button className={styles.navigationLinkBtn}>Log out</button>
    </li>
  ) : null;

  return (
    <div>
      <button
        className={cx(styles.hamburger, {
          [styles.hamburgerActive]: isNavOpen,
        })}
        onClick={toggleNav}
      >
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner}></span>
        </span>
      </button>
      <div className={cx(styles.navigationHolder)}>
        <div
          className={cx(styles.navigation, {
            [styles.navigationActive]: isNavOpen,
          })}
        >
          <ul className={styles.navigationList}>
            <li className={styles.navigationItem} onClick={closeNav}>
              <Link
                className={cx(styles.navigationLink, styles.navigationLinkBold)}
                to="/game"
              >
                Play
              </Link>
            </li>
            <li className={styles.navigationItem} onClick={closeNav}>
              <Link className={styles.navigationLink} to="/">
                Home
              </Link>
            </li>
            {authLinks}
            <li className={styles.navigationItem} onClick={closeNav}>
              <Link className={styles.navigationLink} to="/scores">
                Top Scores
              </Link>
            </li>
            {logoutLink}
          </ul>
        </div>
      </div>
    </div>
  );
}
