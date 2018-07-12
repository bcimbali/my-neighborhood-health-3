import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

const Nav = () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        to="/"
        className={
          window.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/communities"
        className={
          window.location.pathname === "/communities" ? "nav-link active" : "nav-link"
        }
      >
        Communities
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/news"
        className={
          window.location.pathname === "/news" ? "nav-link active" : "nav-link"
        }
      >
        News
      </Link>
    </li>
  </ul>
);

export default Nav;