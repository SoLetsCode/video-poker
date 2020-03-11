//libraries
import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Switch,
//   Link
// } from "react-router-dom";

//styles
import "./styles/app.css";

//helpers
import Deck from "./helper/Deck";
import checkWin from "./helper/checkWin";

//import components here
import Field from "./components/Field";

//testing function to restrict cards
const cardList = () => {
  let temp = [];
  for (let i = 0; i < 52; i++) {
    temp.push(i);
  }
  temp.splice(39, 1);
  temp.splice(26, 1);
  temp.splice(14, 2);
  temp.splice(13, 1);
  // temp.splice(3, 4);
  temp.splice(0, 1);

  return temp;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: [],
      deck: [],
      message: ""
    };
  }

  componentDidMount() {
    // let tempDeck = new Deck();
    // tempDeck.createCards();
    // let tempHand = tempDeck.draw(5);
    // tempHand = tempDeck.getHandByIndex(tempHand);
    // this.setState({ deck: tempDeck, hand: tempHand });
    this.newGame();
  }

  newGame = async () => {
    console.log("clicked");
    let tempDeck = new Deck(cardList());
    tempDeck.createCards();
    let tempHand = tempDeck.draw(5);
    tempHand = tempDeck.getHandByIndex(tempHand);
    await this.setState({ deck: tempDeck, hand: tempHand });

    //checking for win
    let handState = checkWin(this.state.hand);
    this.setState({
      message: handState
    });
  };

  render() {
    return (
      <div className="App">
        <Field hand={this.state.hand} />
        <button style={{ backgroundColor: "yellow" }} onClick={this.newGame}>
          New Game
        </button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;
