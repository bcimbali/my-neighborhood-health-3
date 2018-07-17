import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Communities from './components/Communities';
import News from './components/News';
import GoogleApiWrapper from './components/Map/map';
import Authentication from './Pages/Authentication';


<<<<<<< HEAD
const App = () => (
  <Router>
    <div>
      <Nav />
      <Route exact path="/communities" component={Communities} />
      <Route exact path="/news" component={News} />
    </div>
  </Router>
);
=======
class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Switch>
            <Route exact path='/authentication' component = {Authentication} />
            <Route exact path='/' component = {GoogleApiWrapper} /> 
          </Switch>
        </div>
    </Router>
      
    );
  }
}
>>>>>>> 2a93e180d40901d733406ce095d9ce21c4f3e824

export default App;
