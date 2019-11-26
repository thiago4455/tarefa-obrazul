import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Finish from './pages/Finish';
import Header from './components/Header';
import Success from './pages/Success';

class App extends Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/success" component={Success}/>
            <Route path="/finish" component={Finish}/>
            <Route path="/cart" component={Cart}/>
            <Route component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
