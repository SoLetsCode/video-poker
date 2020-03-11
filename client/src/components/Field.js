import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export default class Field extends Component {
  state = {
    //probably need something here
  };

  displayHand = handArray => {
    let suits = { d: "♦️", c: "♣️", h: "♥️", s: "♠️" };
    return handArray.map(data => {
      return (
        <div className="field__card-container" key={uuidv4()}>
          <div className="field__card-value">{data.value}</div>
          <div className="field__card-suit">{suits[data.suit]}</div>
        </div>
      );
    });
  };

  render() {
    return <div className="field">{this.displayHand(this.props.hand)}</div>;
  }
}
