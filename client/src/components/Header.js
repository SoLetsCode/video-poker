import React from "react";

export default function Header({ name }) {
  return (
    <div className="header">
      <h1 className="header__title">Let's Play Video Poker {name}</h1>
    </div>
  );
}
