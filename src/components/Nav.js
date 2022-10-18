import React from "react";
import { Link } from "react-router-dom";
import { List } from "phosphor-react";

export default function Nav({ user, logMeOut }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          SoundOff
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <List size={32} color="white" />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Explore
              </Link>
            </li>

            {user.username ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/myfeed">
                    myfeed
                  </Link>
                </li>
                <div className="nav-item">
                  <div className="dropdown ">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hello, {user.username}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="/posts/create">
                        Create Post
                      </Link>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link
                        onClick={logMeOut}
                        className="dropdown-item"
                        to="/login"
                      >
                        Log Out
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hello, Guest
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                      <Link className="dropdown-item" to="/signup">
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
