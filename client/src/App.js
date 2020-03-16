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
import { payTable, paytableTranslate } from "./helper/paytable";

//import components here
import Paytable from "./components/Paytable";
import Field from "./components/Field";
import Credit from "./components/Credit";

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
  temp.splice(47, 5);
  temp.splice(39, 1);
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
      paytable: payTable,
      wager: 5,
      credit: 500,
      change: 0
    };
  }

  componentDidMount() {
    //does this need to be here?
  }

  componentDidUpdate(prevProps, prevState) {
    //do I need to use this?
  }

  newGame = () => {
    let tempDeck = new Deck();
    tempDeck.createCards();
    let tempHand = tempDeck.draw(5);
    tempHand = tempDeck.getHandByIndex(tempHand);
    let tempCredit = this.state.credit - this.state.wager;
    let changeAmount = -5;
    this.setState({
      deck: tempDeck,
      hand: tempHand,
      credit: tempCredit,
      change: changeAmount
    });
  };

  drawCards = () => {
    //go through hand array, see which ones are held and which ones are not put this result into tempHand
    let tempHand = this.state.hand.map(card => {
      if (!card.getHeldStatus()) {
        let returnedCard = this.state.deck.getCardByIndex(
          this.state.deck.draw(1)[0]
        );
        if (returnedCard) {
          return returnedCard; //this fix is just in case the deck runs out of cards useful when forcing hands
        }
      }
      return card;
    });
    let roundState = !this.state.round;

    //set temp hand and then use a callback function to check if the hand won.
    this.setState({ hand: tempHand }, () => {
      console.log("did you win?");
      let handState = checkWin(this.state.hand);
      let handTranslated =
        handState === "LOSER"
          ? "LOSER"
          : `${paytableTranslate[handState]} you win ${
              payTable[handState][this.state.wager - 1]
            }`;
      this.calculateHand(handState);
      this.setState({
        message: handTranslated,
        round: roundState
      });
    });
  };

  calculateHand = handState => {
    let tempCredits = this.state.credit;
    let changeAmount = 0;
    if (handState === "LOSER") {
      return;
    } else {
      tempCredits += payTable[handState][this.state.wager - 1];
      changeAmount = payTable[handState][this.state.wager - 1];
      this.setState({
        credit: tempCredits,
        change: changeAmount
      });
    }

    //takes a string, if it's loser do nothing, if it's a winner add it to credits
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

  setCredit = credit => {
    this.setState({
      credit: credit
    });
  };

  spacebarClick = event => {
    console.log("me");
    console.log(event.keyCode);
  };

  render() {
    return (
      <div className="App" onKeyUp={this.spacebarClick}>
        <Paytable wager={this.state.wager} paytable={this.state.paytable} />
        <Field hand={this.state.hand} />
        <button style={{ backgroundColor: "yellow" }} onClick={this.round}>
          {!this.state.round ? "New Game" : "Draw"}
        </button>
        <Credit
          credit={this.state.credit - this.state.change}
          change={this.state.change}
        />

        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;
