import React from "react";
import Countup from "react-countup"; //need to figure out how this works

export default function Credit({ credit, change }) {
  let start = credit;
  let end = credit + change;

  return (
    <div className="credit__wrapper">
      <div className="credit__container">
        {"Credits:"}
        <Countup start={start} end={end} useEasing={false} />
      </div>
    </div>
  );
}
