import React, { useState } from "react";

function CardObject({ value, suits, index }) {
  const [held = false, setHeld] = useState(false);

  let suit = { d: "♦️", c: "♣️", h: "♥️", s: "♠️" };

  const heldClick = event => {
    setHeld(!held);
  };

  return (
    <section className="card__wrapper">
      <div className="card__container" title={index} onClick={heldClick}>
        <span className="card__value">{value}</span>
        <span className="card__suit">{suit[suits]}</span>
      </div>
      <label className="card__label">{held ? "HOLD" : "\b"}</label>
    </section>
  );
}

export default CardObject;
