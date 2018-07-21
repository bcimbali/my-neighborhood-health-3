import React, {Component} from 'react';
import './Nav.css';
import { Link } from "react-router-dom";
import axios from 'axios'

class Nav extends Component {
      state = {
        isAuthenticated: false
    };

    componentDidMount(){
        axios.get('/api/authentication/profile')
    .then(function (response) {
    console.log("authenticated user!", response.body);

    })
    }
    render() {
      return (
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
          <li className="nav-item">
            <Link
              to="/authentication"
              className={
                window.location.pathname === "/authentication" ? "nav-link active" : "nav-link"
              }
            >
              Login/Register
            </Link>
          </li>
        </ul>
      );
  }
}
export default Nav;
