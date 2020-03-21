import React from "react";

export default function Controls() {
  return (
    <div className="controls">
      <h3 className="controls__title">
        Press the number keys or mouse click to hold cards
      </h3>
      <div className="controls__wrapper">
        <label className="controls__container">1</label>
        <label className="controls__container">2</label>
        <label className="controls__container">3</label>
        <label className="controls__container">4</label>
        <label className="controls__container">5</label>
      </div>
      <h3 className="controls__title">
        Press T to turn the trainer on and off
      </h3>
      <div className="controls__wrapper">
        <label className="controls__container">T</label>
      </div>
      <h3 className="controls__title">
        Press Spacebar to draw or start new game
      </h3>
      <div className="controls__wrapper">
        <label className="controls__container">Spacebar</label>
      </div>
    </div>
  );
}
