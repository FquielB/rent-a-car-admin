import React, {useState} from 'react';
import { AddCar, Home, EditCar, ListCar, Login} from './screens';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/addcar" component={AddCar} />
          <PrivateRoute exact path="/editcar" component={EditCar} />
          <PrivateRoute exact path="/listcar" component={ ListCar } />
        </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
