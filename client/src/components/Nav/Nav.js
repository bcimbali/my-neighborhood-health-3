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
        .then(res => this.setState({isAuthenticated: res.data.authentication}))
          
       
    }

    handleClick = (event) => {
      console.log("I'm in the logout button");
          event.preventDefault();
          axios.get('/api/authentication/logout')
      .then(function (response) {
        window.location = response.data.redirect
      })
      }	

    render() {
      return (
        <div>
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
          
            {this.state.isAuthenticated === false ? (
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
              
            ): (
              <li className="nav-item">
                <button className="m-2 btn btn-primary" onClick = {this.handleClick}> Logout </button>
			        </li>
            )
          }
            
          
        </ul>
        <h5 className="header-font text-center">My Neighborhood Health</h5>
        <p>MNH app assist users to visualize where toxic chemicals are stored. Each orange marker represents a company storing toxic chemicals.  Users can adjust the map with different kinds of searches. When users see an orange diamond, s/he can click on it and learn the company’s name, address, and compliance with EPA regulations.</p>
        </div>
      );
  }
}
export default Nav;
