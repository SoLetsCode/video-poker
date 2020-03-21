import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <Link className="navbar__link" to="/">
        Home
      </Link>
      <Link className="navbar__link" to="/log">
        Log
      </Link>
      <Link className="navbar__link" to="/strategy">
        Strategy
      </Link>
      <Link className="navbar__link" to="/controls">
        Controls
      </Link>
    </nav>
  );
}
