import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import ListUser from "../components/ListUser";
class Routes extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div class="topbar">
          <div class="container">
            <div class="row">
              <div class="col-s-4">
                <Link to="/">
                  <h1 class="push-left">User Management </h1>
                </Link>
              </div>
              <div class="col-s-4">
                <Link to="/add">
                  <button className="push-right mt-4">Add User</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
          <Route component={ListUser} path="/list" />
          <Route component={AddUser} path="/add" />
          <Route component={EditUser} path="/edit" />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
