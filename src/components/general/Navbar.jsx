import React from 'react';
import { Link } from 'react-router-dom';
import NavStyle from './navbar.module.css';

export default function Navbar({ jwtToken, logOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 sticky-top">
      <Link className="navbar-brand" to="/">
        Camp Track
      </Link>

      <div className="navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {jwtToken ? (
            <>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/attendance-list">
                  Attendance
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/inventory-list">
                  Inventory
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/campers">
                  Campers
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item nav-link">
                <Link className={NavStyle.link} to="/camper-form">
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
