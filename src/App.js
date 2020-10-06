import React, {useState} from 'react';
import { AddCar, Home, EditCar, ListCar, Login} from './screens';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CarReducer from './reducers/CarReducer'

import './App.css';
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const store = createStore(CarReducer)
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Provider store={store}>
        <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/addcar" component={AddCar} />
              <PrivateRoute exact path="/editcar" component={EditCar} />
              <PrivateRoute exact path="/listcar" component={ ListCar } />
            </Switch>
        </Router>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
