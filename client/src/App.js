import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Communities from './components/Communities';
import News from './components/News';
import GoogleApiWrapper from './components/Map';
import Authentication from './Pages/Authentication';


class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Nav />
          <Route exact path="/communities" component={Communities} />
          <Route exact path="/news" component={News} />
          <Switch>
            <Route exact path='/authentication' component={Authentication} />
            <Route exact path='/' component={GoogleApiWrapper} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
