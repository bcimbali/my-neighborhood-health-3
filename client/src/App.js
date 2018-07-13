import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Communities from './components/Communities';
import News from './components/News';
import GoogleApiWrapper from './components/Map/map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleApiWrapper></GoogleApiWrapper>
      </div>
    );
  }
}

export default App;
