import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Communities from './components/Communities';
import News from './components/News';

const App = () => (
  <Router>
    <div>
      <Nav />
      <Route exact path="/communities" component={Communities} />
      <Route exact path="/news" component={News} />
    </div>
  </Router>
);

export default App;
