import "./App.css";

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Authentication from "./Pages/Authentication";
import Communities from "./Pages/Communities";
import GoogleApiWrapper from "./components/MapContainer";
import Nav from "./components/Nav";
import News from "./Pages/News";

require("dotenv").config();

class App extends Component {
  render() {
    console.log("App.js API KEY: ", process.env);
    return (
      <Router>
        <div className="main-page">
          <Nav />
          <Route exact path="/communities" component={Communities} />
          <Route exact path="/news" component={News} />
          <Route exact path="/authentication" component={Authentication} />
          <Switch>
            <Route exact path="/" component={GoogleApiWrapper} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
