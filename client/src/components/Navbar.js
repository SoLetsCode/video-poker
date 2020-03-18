import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/log">Log</Link>
      <Link to="/strategy">Strategy</Link>
      <Link to="/board">Leader Board</Link>
    </nav>
  );
}
