import React, { Component } from "react";

export default class Field extends Component {
  state = {
    //probably need something here
  };

  displayHand = handArray => {
    return handArray.map(data => <div>{data.cardString()}</div>);
  };

  render() {
    return <div>{this.displayHand(this.props.hand)}</div>;
  }
}
