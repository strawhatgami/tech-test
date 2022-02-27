import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Players from "./scopes/Players/Players";

function App() {
  const { token } = useAppContext();
  const title = "API: " + (token ? " connected" : " not connected");

  return (
    <div className="App">
      <header className="App-header">
        <h5>{`VLSmart`}</h5>
        <img
          src="http://d-gfx.kognetwork.ch/VLC/cone_altglass.png"
          className="App-logo"
          alt="logo"
        />
      </header>
      <h1>{title}</h1>
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {!!token && (
            <Route path="/players" component={Players}></Route>
          )}
          <Route path="/" exact>
            <>
              {!!token || (
                <Link className="login" to="/login">
                  Login
                </Link>
              )}
            </>
          </Route>
        </Switch>
        <Route path="*" component={TokenHandler}></Route>
      </Router>
    </div>
  );
}
const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
