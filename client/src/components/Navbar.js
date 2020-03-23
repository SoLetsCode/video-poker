import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header({ name, setUser }) {
  const logOffClick = () => {
    axios
      .get(`/api/user/guest`)
      .then(res => {
        setUser(res.data.user.name, res.data.user.id);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
      {name === "guest" ? (
        <Link className="navbar__link" to="/login">
          Login
        </Link>
      ) : (
        <div className="navbar__link" onClick={logOffClick}>
          Log Off
        </div>
      )}
    </nav>
  );
}
