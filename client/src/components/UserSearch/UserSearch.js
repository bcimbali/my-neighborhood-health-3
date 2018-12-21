import React, { Component } from "react";

export default class UserSearch extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: null,
      tester: "something"
    };
  }
  //capture the value from the event (user's input) everytime there is a change the handleInput will run and is detected by the user's input
  handleInput = e => {
    //console.log(e.target.value)
    //save the user's input
    let usersZip = e.target.value;
    this.setState({
      zipCode: usersZip
    });
    //calling the function
    //   this.props.zipCodeSearch(usersZip);
  };

  submitSearch = event => {
    event.preventDefault();
    console.log("submitSearch", this.state.zipCode);
    this.props.zipCodeSearch(this.state.zipCode);
  };

  render() {
    // console.log(this.state.zipCode)
    //The consolelog above shows that we are properly setting the state and capturing the input. Below, we want an input field
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
        <button className="border border-white btn m-1 text-white transparent-bg">
          Go Go Go!
        </button>
      </form>
    );
  }
}
