import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart';
import {HashRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>
        <Switch>
          <Route path = '/' component = {Home} exact/>
          <Route path = '/cart' component = {Cart}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
