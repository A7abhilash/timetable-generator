import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ForgotPassword from "../components/auth/ForgotPassword";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import UpdateProfile from "../components/auth/UpdateProfile";
import Profile from "../components/auth/Profile";
import { useAuth } from "../contexts/AuthContext";
import AuthRoute from "./AuthRoute";
import GuestRoute from "./GuestRoute";
import Dashboard from "../components/timetable/Dashboard";

function AppRoute() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <Switch>
        <AuthRoute exact path="/" component={Dashboard} />
        <AuthRoute exact path="/profile" component={Profile} />
        <GuestRoute exact path="/signup" component={Signup} />
        <GuestRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/updateProfile" component={UpdateProfile} />
        <GuestRoute exact path="/forgotPassword" component={ForgotPassword} />
        {/* Redirect */}
        {!currentUser ? (
          <Redirect from="*" to="/login" />
        ) : (
          <Redirect from="*" to="/" />
        )}
      </Switch>
    </div>
  );
}

export default AppRoute;
