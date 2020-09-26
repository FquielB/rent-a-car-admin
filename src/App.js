import React from 'react';
import { AddCar, Home } from './screens';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addcar" component={AddCar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
