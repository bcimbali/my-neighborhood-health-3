import React, { Component } from 'react';
const axios = require('axios');

class Logout extends Component {
  handleClick = event => {
    console.log("I'm in the logout button");
    event.preventDefault();
    axios.get('/api/authentication/logout').then(function(response) {
      window.location = response.data.redirect;
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-header"> Logout of our site </div>
        <div className="card-body">
          <button className="mt-2" onClick={this.handleClick}>
            {' '}
            Logout{' '}
          </button>
        </div>
      </div>
    );
  }
}

export default Logout;
