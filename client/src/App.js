//libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

//styles
import "./styles/app.css";

//helpers
import Deck from "./helper/Deck";
import checkWin from "./helper/checkWin";
import { payTable, paytableTranslate } from "./helper/paytable";
import strategyGuide from "./helper/strategyGuide";
import { cardFonts } from "./helper/cardFont";

//import components here
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Paytable from "./components/Paytable";
import Field from "./components/Field";
import Credit from "./components/Credit";
import Trainer from "./components/Trainer";
import Log from "./components/Log";
import Strategy from "./components/Strategy";
import Controls from "./components/Controls";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";

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

  // //royal flush
  // temp.splice(48, 4);
  // temp.splice(39, 1);

  // //straight flush
  // temp.splice(19, 2);
  // temp.splice(15, 3);
  // temp.splice(1, 2);

  // //three of a kind
  // temp.splice(40, 2);
  // temp.splice(26, 1);
  // temp.splice(13, 1);
  // temp.splice(0, 1);

  return temp;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.keyBoardControl = React.createRef();

    this.state = {
      hand: [],
      deck: [],
      message: "",
      round: false,
      paytable: payTable,
      wager: 5,
      credit: 500,
      change: 0,
      tip: "", //tip from helper
      hold: [false, false, false, false, false],
      trainer: true,
      user_id: 2,
      name: "guest",
      playerLog: []
    };
  }

  componentDidMount() {
    this.keyBoardControl.current.focus();

    //grab log information for user
    axios.get(`/api/log/${this.state.user_id}`).then(res =>
      this.setState({
        playerLog: res.data.logs
      })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("I'm running");
    if (this.state.playerLog.length !== 0) {
      //don't want to check in case a new user is created
      if (
        prevState.credit !==
        this.state.playerLog[this.state.playerLog.length - 1].credit
      ) {
        this.setCredit(
          this.state.playerLog[this.state.playerLog.length - 1].credit
        );
      }
    }
  }

  calculateHand = handState => {
    let tempCredits = this.state.credit;
    let changeAmount = 0;
    if (handState === "LOSER") {
      return -this.state.wager;
    } else {
      tempCredits += payTable[handState][this.state.wager - 1];
      changeAmount = payTable[handState][this.state.wager - 1];
      this.setState({
        credit: tempCredits,
        change: changeAmount
      });
      return changeAmount - this.state.wager;
    }
    //takes a string, if it's loser return -5, if it's a winner return winnings -5 and add it to credits
  };

  newGame = () => {
    let tempDeck = new Deck(); //for testing put cardList() in here.
    tempDeck.createCards();
    let tempHand = tempDeck.draw(5);
    tempHand = tempDeck.getHandByIndex(tempHand);
    let tempCredit = this.state.credit - this.state.wager;
    let changeAmount = -5;
    let { tip, hold } = strategyGuide(tempHand);
    this.setState({
      credit: tempCredit,
      change: changeAmount,
      deck: tempDeck,
      hand: tempHand,
      hold: hold,
      tip: tip
    });
  };

  drawCards = () => {
    //go through hand array, see which ones are held and which ones are not put this result into tempHand

    //***********section used to store intitial variables to log for function logHand()***********
    const dealtHand = this.state.hand.map(card => card.cardString());
    const playerHold = this.state.hand.map(card =>
      card.getHeldStatus() ? card.cardString() : "--"
    );
    const trainerHold = this.state.hold.map((hold, index) =>
      hold ? this.state.hand[index].cardString() : "--"
    );
    //***********section end***********

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
      let outcome = this.calculateHand(handState); //store the last remaining variable required for logHand()
      this.logHand(
        dealtHand,
        playerHold,
        trainerHold,
        this.state.user_id,
        outcome,
        this.state.trainer
      );
      this.setState({
        message: handTranslated,
        round: roundState
      });
    });
  };

  logHand = (dealtHand, playerHold, trainerHold, user_id, outcome, trainer) => {
    axios
      .post("/api/log", {
        hand: dealtHand,
        playerhold: playerHold,
        trainerhold: trainerHold,
        user_id: user_id,
        outcome: outcome,
        trainerused: trainer,
        credit: this.state.credit + outcome + 5
      })
      .then(res => {
        console.log(`log successful ${res.data}`);
        this.grabLog();
      })
      .catch(error => console.log(error));
  };

  grabLog = () => {
    axios.get(`/api/log/${this.state.user_id}`).then(res =>
      this.setState({
        playerLog: res.data.logs
      })
    );
  };

  round = () => {
    this.keyBoardControl.current.focus();
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

  setUser = (name, id) => {
    this.setState({
      user_id: id,
      name: name
    });

    this.grabLog();
  };

  keyboardPress = event => {
    //used to control the game
    //spacebar 32, 49-50-51-52-53 (1-5) 13, enter 84 t
    if (event.keyCode === 32) {
      this.round();
    } else if (event.keyCode >= 49 && event.keyCode <= 53) {
      if (this.state.round !== false) {
        //very dirty solution, looking for an alternative
        let targetCard = document.querySelector(`#card${event.keyCode - 49}`);
        targetCard.click();
      }
    } else if (event.keyCode === 84) {
      this.trainerClick();
    }
  };

  trainerClick = () => {
    this.keyBoardControl.current.focus();
    this.setState({
      trainer: !this.state.trainer
    });
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Navbar name={this.state.name} setUser={this.setUser} />
          <Switch>
            <Route exact path="/">
              <div
                ref={this.keyBoardControl}
                tabIndex="0"
                onKeyDown={this.keyboardPress}
                className="app__keyboard-listener"
              >
                <Header name={this.state.name} />
                <Paytable
                  wager={this.state.wager}
                  paytable={this.state.paytable}
                />
                <button className="app__button" onClick={this.trainerClick}>
                  {this.state.trainer ? "Turn Trainer Off" : "Turn Trainer On"}
                </button>
                {this.state.trainer ? (
                  <Trainer hold={this.state.hold} tip={this.state.tip} />
                ) : (
                  ""
                )}
                <Field
                  hand={this.state.hand}
                  round={this.state.round}
                  message={this.state.message}
                />
                <button className="app__button" onClick={this.round}>
                  {!this.state.round ? "New Game" : "Draw"}
                </button>
                <Credit
                  credit={this.state.credit - this.state.change}
                  change={this.state.change}
                />
              </div>
            </Route>
            <Route path="/log">
              <Log playerLog={this.state.playerLog} />
            </Route>
            <Route path="/strategy">
              <Strategy />
            </Route>
            <Route path="/controls">
              <Controls />
            </Route>
            <Route
              path="/login"
              render={props => <Login setUser={this.setUser} {...props} />}
            />
            <Route
              path="/createaccount"
              render={props => (
                <CreateAccount setUser={this.setUser} {...props} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
