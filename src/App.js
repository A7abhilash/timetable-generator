import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./containers/Navbar";
import AppRoute from "./routes/AppRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoute />
    </Router>
  );
}

export default App;
