import React from "react";
import TrainerHold from "./TrainerHold";

export default function Trainer({ tip, hold }) {
  let holdList = hold.map(holdTip => <TrainerHold holdTip={holdTip} />);

  return (
    <div className="trainer">
      <div className="trainer__tip">{tip}</div>
      <div className="trainer__container">{holdList}</div>
    </div>
  );
}
