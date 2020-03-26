import React from "react";

export default function Strategy() {
  return (
    <div className="strategy">
      <h1 className="strategy__title">How to Play</h1>
      <p className="strategy__about">
        In Jacks or Better Video Poker you get one chance to hold and replace
        cards. If you get a pair of jacks or better you win. Bets are based on 5
        credit wagers which give you the highest chance to win on a 6/9 payout
        table.
      </p>
      <p className="strategy__about">
        This application comes with a trainer that tells you what move to make
        based on the basic strategy guide below. If played correctly, there is
        an approximate <span className="strategy__highlight">99.46%</span>{" "}
        return with 19% variance.
      </p>
      <h1 className="strategy__title">Hands to hold in order of importance.</h1>
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
