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

//helpers
import Deck from "./helper/Deck";

//import components here
import Field from "./components/Field";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: [],
      deck: []
    };
  }

  componentDidMount() {
    let tempDeck = new Deck();
    tempDeck.createCards();
    let tempHand = tempDeck.draw(5);
    tempHand = tempDeck.getHandByIndex(tempHand);
    this.setState({ deck: tempDeck, hand: tempHand });
  }

  render() {
    return (
      <div className="App">
        <Field hand={this.state.hand} />
      </div>
    );
  }
}

export default App;
