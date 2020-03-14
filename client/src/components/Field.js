import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import CardObject from "./CardObject";

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
          />
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
