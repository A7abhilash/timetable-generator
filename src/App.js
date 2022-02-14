import React from "react";
import Signup from "./components/Signup";
import { useAuth } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center pt-5">
      <Router>
        <Switch>
          {!currentUser ? (
            <Redirect exact from="/" to="/login" />
          ) : (
            <Redirect exact from="/login" to="/" /> || (
              <Redirect exact from="/signup" to="/" />
            )
          )}
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          {
            currentUser && <Route exact path="/updateProfile" component={UpdateProfile}/>
          }
          <Route exact path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
