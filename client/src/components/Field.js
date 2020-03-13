import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import CardObject from "./CardObject";

export default class Field extends Component {
  state = {
    //something should go into here
  };

  heldClick = event => {
    console.log(event.currentTarget);
    this.props.hand[event.currentTarget.title].toggleHeld();
  };

  displayHand = handArray => {
    return handArray.map((data, index) => {
      return (
        <div onClick={this.heldClick} title={index}>
          <CardObject value={data.value} suits={data.suit} key={uuidv4()} />
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <div className="field">{this.displayHand(this.props.hand)}</div>
      </>
    );
  }
}
