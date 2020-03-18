import React from "react";
import TrainerHold from "./TrainerHold";
import { v4 as uuidv4 } from "uuid";

export default function Trainer({ tip, hold }) {
  let holdList = hold.map(holdTip => (
    <TrainerHold holdTip={holdTip} key={uuidv4()} />
  ));

  return (
    <div className="trainer">
      <div className="trainer__tip">{tip}</div>
      <div className="trainer__container">{holdList}</div>
    </div>
  );
}
