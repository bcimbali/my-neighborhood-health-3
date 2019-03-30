import React, { Component } from 'react';

export default class UserSearch extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: null,
      tester: 'something'
    };
  }
  //capture the value from the event (user's input) everytime there is a change the handleInput will run and is detected by the user's input
  handleInput = e => {
    //save the user's input
    let usersZip = e.target.value;
    this.setState({
      zipCode: usersZip
    });
  };

  submitSearch = event => {
    event.preventDefault();
    console.log('submitSearch', this.state.zipCode);
    this.props.zipCodeSearch(this.state.zipCode);
  };

  render() {
    return (
      <form onSubmit={this.submitSearch}>
        <input
          className="border border-white form zipinput transparent-bg"
          placeholder="zip code"
          type="text"
          pattern="[0-9]{5}"
          name="zipCode"
          onChange={this.handleInput}
          defaultValue={this.state.zipCode}
        />
        <button className="border border-white btn m-1 text-white transparent-bg">Go Go Go!</button>
      </form>
    );
  }
}
