import React from 'react';
import { Link } from 'react-router-dom';
import NavStyle from './navbar.module.css';

export default function Navbar({ jwtToken, logOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 sticky-top">
      <Link className="navbar-brand" to="/">
        Camp Track by
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {jwtToken ? (
            <>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/">
                  {/* Change this link to the correct route */}
                  Attendance
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/">
                  {/* Change this link to the correct route */}
                  Inventory
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/">
                  {/* Change this link to the correct route */}
                  Campers
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/">
                  {/* Change this link to the correct route */}
                  Home
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/camper-form">
                  {/* Change this link to the correct route */}
                  Register A Child
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {jwtToken ? (
            <li
              className="nav-item nav-link"
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={logOut}
            >
              Log out
            </li>
          ) : (
            <>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/log-in">
                  Log in
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/sign-up">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
