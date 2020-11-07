import React from 'react';
import { AddCar, EditCar, ListCar, Login, Report} from './screens';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CarReducer from './reducers/CarReducer'

import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {
  const store = createStore(CarReducer)

  return (
      <Provider store={store}>
        <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/addcar" component={AddCar} />
              <PrivateRoute exact path="/editcar" component={EditCar} />
              <PrivateRoute exact path="/" component={ ListCar } />
              <PrivateRoute exact path="/report" component={ Report } />
              <Route render={() => <Redirect to="/login" />} />
            </Switch>
        </Router>
      </Provider>
  );
}

export default App;
