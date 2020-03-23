import React from "react";

export default function Strategy() {
  return (
    <div className="strategy">
      <h1 className="strategy__title">Basic Strategy Guide</h1>
      <h2 className="strategy__description">
        Hands to hold in order of importance. Estimated 99.46% return.
      </h2>
      <ol className="strategy__list">
        <li className="strategy__list-item">
          Four of a kind, straight flush, royal flush
        </li>
        <li className="strategy__list-item">4 to a royal flush</li>
        <li className="strategy__list-item">
          Three of a kind, straight, flush, full house
        </li>
        <li className="strategy__list-item">4 to a straight flush</li>
        <li className="strategy__list-item">Two pair, High pair</li>
        <li className="strategy__list-item">3 to a royal flush</li>
        <li className="strategy__list-item">4 to a flush</li>
        <li className="strategy__list-item">Low pair</li>
        <li className="strategy__list-item">4 to an outside straight</li>
        <li className="strategy__list-item">2 suited high cards</li>
        <li className="strategy__list-item">3 to a straight flush</li>
        <li className="strategy__list-item">
          2 unsuited high cards (if more than 2 then pick the lowest 2)
        </li>
        <li className="strategy__list-item">Suited 10/J, 10/Q, or 10/K</li>
        <li className="strategy__list-item">One high card</li>
        <li className="strategy__list-item">Discard everything</li>
      </ol>
      <label className="strategy__source">
        Source{" "}
        <a
          href="https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/"
          className="strategy-link"
        >
          Wizard Of Odds
        </a>
      </label>
    </div>
  );
}
