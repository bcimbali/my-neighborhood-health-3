import React, { Component } from 'react';



export default class UserSearch extends Component {
    constructor() {
        super();
        this.state = {
          zipCode: null
          
          }
          
 }
 //capture the value from the event (user's input) everytime there is a change the handleInput will run and is detected by the user's input
 handleInput =(e)=> {
     //console.log(e.target.value)
     //save the user's input
     let usersZip=e.target.value;
     this.setState({
        zipCode:usersZip
      });
      //calling the function
      this.props.zipCodeSearch(usersZip);
      
 }


render() {
    console.log(this.state.zipCode)
    //The consolelog above shows that we are properly setting the state and capturing the input. Below, we want an input field
    return(<div><input type="text" pattern="[0-9]{5}" name="zipCode" onChange= {this.handleInput} defaultValue={ this.state.zipCode }/></div>)
}

};