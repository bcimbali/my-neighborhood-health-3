import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Communities from './components/Communities';
import News from './components/News';
import GoogleApiWrapper from './components/Map/map';
import Login from './components/Login';


class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Switch>
            <Route exact path='/login' component = {Login} />
              
          </Switch>
        </div>
    </Router>
      
    );
  }
}

export default App;
