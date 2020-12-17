import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "../src/Assets/Styles/normalize.css";
import "../src/Assets/Styles/responsive.css";
import "../src/Assets/Styles/style.css";
import "../src/Assets/Styles/pagination.css";
import Routes from "./Routes/Routes";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
