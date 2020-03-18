import React from "react";

export default function TrainerHold({ holdTip }) {
  return (
    <div className={holdTip ? "trainer__hold-active" : "trainer__hold"}>
      {holdTip.toString()}
    </div>
  );
}
