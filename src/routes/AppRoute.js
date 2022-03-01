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
import TimeTable from "../components/timetable/TimeTable";

function AppRoute() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <Switch>
        {/* TT */}
        <AuthRoute exact path="/" component={Dashboard} />
        <AuthRoute exact path="/tt/:tid" component={TimeTable} />

        {/* Profile */}
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
