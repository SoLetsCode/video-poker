import React, { useState } from "react";
import { cardImages } from "../helper/cardImages";

function CardObject({ value, suits, index, hand, round }) {
  const [held = false, setHeld] = useState(false);

  let suit = { d: "♦️", c: "♣️", h: "♥️", s: "♠️" };

  const cardMobile = () => {
    return (
      <div className="card__mobile">
        <span className="card__value">{value}</span>
        <span className="card__suit">{suit[suits]}</span>
      </div>
    );
  };

  const heldClick = event => {
    if (round !== false) {
      //if used to stop player from being to hold cards at the end of the game
      hand[event.currentTarget.title].toggleHeld();
      setHeld(!held);
    }
  };

  return (
    <section className="card__wrapper">
      <div
        className="card__container"
        title={index}
        id={`card${index}`}
        onClick={heldClick}
      >
        <img
          src={cardImages[suits + value]} //swapped suit and value since variables cannot start with number
          alt={value + suit[suits]}
          className="card__image"
        />
        {cardMobile()}
      </div>
      <label className="card__label">{held ? "HOLD" : "\b"}</label>
    </section>
  );
}

export default CardObject;
