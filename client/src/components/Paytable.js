import React from "react";
import { v4 as uuidv4 } from "uuid";

function Paytable({ wager, paytable }) {
  //the table received should have the following keys to be translated
  let paytableTranslate = {
    rf: "Royal Flush",
    sf: "Straight Flush",
    fk: "Four of a Kind",
    fh: "Full House",
    f: "Flush",
    s: "Straight",
    tk: "Three of A Kind",
    tp: "Two Pair",
    jp: "Jack High"
  };

  let createPayTable = () => {
    let payTableOutput = [];

    for (let each in paytable) {
      payTableOutput.push(
        <div className="paytable__outer-container" key={uuidv4()}>
          <div className="paytable__hand-title">{paytableTranslate[each]}</div>
          <div className="paytable__payout">{paytable[each][wager - 1]}</div>
        </div>
      );
    }

    return payTableOutput;
  };

  return <div className="paytable">{createPayTable()}</div>;
}

export default Paytable;
