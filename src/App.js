import React from 'react';
import { AddCar, Home, EditCar, ListCar} from './screens';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CarReducer from './reducers/CarReducer'

import './App.css';

function App() {

  const store = createStore(CarReducer)

  return (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addcar" component={AddCar} />
            <Route exact path="/editcar" component={EditCar} />
            <Route exact path="/listcar" component={ ListCar } />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
