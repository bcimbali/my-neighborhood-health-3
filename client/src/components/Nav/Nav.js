import React, { Component } from 'react';
import './Nav.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap4-modal';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      details: false,
      isAuthenticated: false,
    }
  }

  toggle() {
    const currentState = this.state.details;
    this.setState({ details: !currentState });
  }

  componentDidMount() {
    axios.get('/api/authentication/profile')
      .then(res => this.setState({ isAuthenticated: res.data.authentication }))


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
      <div className="w-100">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" ? "nav-link text-white transparent-bg" : "nav-link text-white transparent-bg"
              }
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/communities"
              className={
                window.location.pathname === "/communities" ? "nav-link text-white transparent-bg" : "nav-link text-white transparent-bg"
              }
            >
              Communities
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/news"
              className={
                window.location.pathname === "/news" ? "nav-link text-white transparent-bg" : "nav-link text-white transparent-bg"
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
                  window.location.pathname === "/authentication" ? "nav-link text-white transparent-bg" : "nav-link text-white transparent-bg"
                }
              >
                Login/Register
              </Link>
            </li>

          ) : (
              <li className="nav-item">
                <button className="about-btn border border-white btn p-2 text-white" onClick={this.handleClick}> Logout </button>
              </li>
            )
          }
          
          <li className="">
            <button className="about-btn text-white p-2"
              onClick={() => this.toggle()}>
              About
          </button>
            <Modal visible={this.state.details} onClickBackdrop={() => this.toggle()}>
              <div className="modal-header mx-auto">
                <h4 className="font-weight-bold modal-title">What's this app?</h4>
              </div>
              <div className="modal-body">
                <p>Are there toxic chemicals stored near where you live or work? If there are, are those chemicals being released to the air or water nearby? Would you like to find out?</p>
                <p>We were curious (concerned). We understand, locating that information is very tricky.</p>
                <p>This is an easy-to-use resource for people to search our map and find facilities working with toxic chemicals nearby their work or home. Once a facility is clicked, a pop-up window appears and gives a quick run-down of the facilities details. If the user wants to learn more about, say, particular chemicals or if the facility is in compliance with the EPA, they are linked directly to an EPA page for that particular resource.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary filter-btn" onClick={() => this.toggle()}>
                  Close
              </button>
              </div>
            </Modal>
          </li>

        </ul>
      </div>
    );
  }
}
export default Nav;
