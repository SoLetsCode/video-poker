//libraries
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";

//styles
import "./styles/app.css";

//import components here
import Sample from "./components/Sample";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="App">
        testing
        <Sample />
      </div>
    );
  }
}

export default App;
