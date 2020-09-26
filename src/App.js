import React from 'react';
import { AddCar, Home, EditCar} from './screens';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addcar" component={AddCar} />
          <Route exact path="/editcar" component={EditCar} />
        </Switch>
    </Router>
  );
}

export default App;
