import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import CardObject from "./CardObject";

export default class Field extends Component {
  state = {
    //something should go into here
  };

  heldClick = event => {
    console.log(event.currentTarget.title);
    this.props.hand[event.currentTarget.title].toggleHeld();
  };

  displayHand = handArray => {
    let suits = { d: "♦️", c: "♣️", h: "♥️", s: "♠️" };
    return handArray.map((data, index) => {
      return (
        <div
          className="field__card-container"
          title={index}
          onClick={this.heldClick}
          key={uuidv4()}
        >
          <span className="field__card-value">{data.value}</span>
          <span className="field__card-suit">{suits[data.suit]}</span>
        </div>
      );
    });
  };

  displayHand2 = handArray => {
    return handArray.map((data, index) => {
      console.log("am I running?", data, index);
      return (
        <CardObject
          value={data.value}
          suits={data.suit}
          index={index}
          key={uuidv4()}
        />
      );
    });
  };

  render() {
    return (
      <>
        <div className="field">{this.displayHand(this.props.hand)}</div>
        <div className="field">{this.displayHand2(this.props.hand)}</div>
      </>
    );
  }
}
