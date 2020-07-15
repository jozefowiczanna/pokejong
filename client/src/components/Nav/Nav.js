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
              <Link className={styles.navigationLink} to="/">
                Home
              </Link>
            </li>
            {userAuthenticated ? (
              <>
                <li className={styles.navigationItem} onClick={closeNav}>
                  <Link className={styles.navigationLink} to="/account">
                    Account
                  </Link>
                </li>
                <li
                  className={styles.navigationItem}
                  onClick={(e) => {
                    closeNav();
                    logoutUser();
                  }}
                >
                  <button className={styles.navigationLinkBtn}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navigationItem} onClick={closeNav}>
                  <Link className={styles.navigationLink} to="/login">
                    Login
                  </Link>
                </li>
                <li className={styles.navigationItem} onClick={closeNav}>
                  <Link className={styles.navigationLink} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            <li className={styles.navigationItem} onClick={closeNav}>
              <Link className={styles.navigationLink} to="/game">
                Play
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
