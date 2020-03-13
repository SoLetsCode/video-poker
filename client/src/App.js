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
import paytable from "./helper/paytable";

//import components here
import Paytable from "./components/Paytable";
import Field from "./components/Field";

//testing function to restrict cards call cardList() in new Deck()
const cardList = () => {
  let temp = [];
  for (let i = 0; i < 52; i++) {
    temp.push(i);
  }

  // //test for full house
  // temp.splice(39, 2);
  // temp.splice(26, 3);
  // temp.splice(13, 3);

  // //test for straights
  // temp.splice(51, 1);
  // temp.splice(37, 1);
  // temp.splice(23, 1);
  // temp.splice(7, 3);
  // temp.splice(0, 1);

  ////four of a kind test
  // temp.splice(39, 1);
  // temp.splice(26, 1);
  // temp.splice(14, 2);
  // temp.splice(13, 1);
  // temp.splice(3, 4);
  // temp.splice(0, 1);

  //royal flush
  temp.splice(46, 7);
  //fix testing for royal flush, stop loop and draw cards when exceeded

  return temp;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: [],
      deck: [],
      message: "",
      round: false,
      paytable: paytable,
      wager: 5
    };
  }

  componentDidMount() {
    console.log(this.state.paytable);
  }

  componentDidUpdate(prevProps, prevState) {
    //do I need to use this?
  }

  newGame = () => {
    let tempDeck = new Deck();
    tempDeck.createCards();
    let tempHand = tempDeck.draw(5);
    tempHand = tempDeck.getHandByIndex(tempHand);
    this.setState({ deck: tempDeck, hand: tempHand });
  };

  drawCards = () => {
    //go through hand array, see which ones are held and which ones are not put this result into tempHand
    let tempHand = this.state.hand.map(card => {
      if (!card.getHeldStatus()) {
        return this.state.deck.getCardByIndex(this.state.deck.draw(1)[0]);
      }
      return card;
    });
    let roundState = !this.state.round;

    //set temp hand and then use a callback function to check if the hand won.
    this.setState({ hand: tempHand }, () => {
      console.log("did you win?");
      let handState = checkWin(this.state.hand);
      this.setState({
        message: handState,
        round: roundState
      });
    });
  };

  round = () => {
    if (this.state.round === false) {
      let roundState = !this.state.round;
      console.log("starting new game time to hold cards");
      this.setState({
        message: "",
        round: roundState
      });
      this.newGame();
    } else if (this.state.round === true) {
      this.drawCards();
      //replace cards and calculate the win
    }
  };

  render() {
    return (
      <div className="App">
        <Paytable wager={this.state.wager} paytable={this.state.paytable} />
        <Field hand={this.state.hand} />
        <button style={{ backgroundColor: "yellow" }} onClick={this.round}>
          {!this.state.round ? "New Game" : "Draw"}
        </button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;
