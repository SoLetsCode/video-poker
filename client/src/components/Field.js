import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import CardObject from "./CardObject";
import cardBack from "../assets/cards/2B.svg";

export default class Field extends Component {
  state = {
    //something should go into here
  };

  displayHand = handArray => {
    return handArray.map((data, index) => {
      return (
        <div key={uuidv4()}>
          <CardObject
            value={data.value}
            suits={data.suit}
            index={index}
            hand={this.props.hand}
            round={this.props.round}
            hold={this.props.playerHold[index]}
            setPlayerHold={this.props.setPlayerHold}
          />
        </div>
      );
    });
  };

  displayCardBack = () => {
    //used to show 5 card backs before the game starts
    let cardBackArray = [];
    for (let i = 0; i < 5; i++) {
      cardBackArray.push(
        <div className="card__container">
          <img
            src={cardBack} //swapped suit and value since variables cannot start with number
            alt={"Card Back"}
            className="card__image"
            style={{ display: "inline" }}
          />
        </div>
      );
    }
    return cardBackArray;
  };

  render() {
    return (
      <>
        <div className="field">
          {this.props.hand.length === 0
            ? this.displayCardBack()
            : this.displayHand(this.props.hand)}
          <div className="field__message">{this.props.message}</div>
        </div>
      </>
    );
  }
}
