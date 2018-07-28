import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Communities from './Pages/Communities';
import News from './Pages/News';
import GoogleApiWrapper from './components/MapContainer';
import Authentication from './Pages/Authentication';
import Header from './components/Header';


class App extends Component {
  render() {
    return (

      <Router>
        <div className="main-page">
          
          <Nav />
          <Route exact path="/communities" component={Communities} />
          <Route exact path="/news" component={News} />
          <Route exact path='/authentication' component={Authentication} />
          <Switch>
            <Route exact path='/' component={GoogleApiWrapper} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
