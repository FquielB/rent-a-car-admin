import React from 'react';
import { AddCar, Home, EditCar, ListCar} from './screens';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addcar" component={AddCar} />
          <Route exact path="/editcar" component={EditCar} />
          <Route exact path="/listcar" component={ ListCar } />
        </Switch>
    </Router>
  );
}

export default App;
