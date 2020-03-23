import React, { useState } from "react";
import { Link } from "react-router-dom";
import crypto from "crypto";
import axios from "axios";

export default function Login({ setUser, history }) {
  const [emailField, setEmailField] = useState(true);
  const [passwordField, setPasswordField] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const loginClick = event => {
    event.preventDefault();
    event.target.email.value === ""
      ? setEmailField(false)
      : setEmailField(true);
    event.target.password.value === ""
      ? setPasswordField(false)
      : setPasswordField(true);

    if (emailField && passwordField) {
      const hash = crypto
        .createHmac("sha256", event.target.email.value)
        .update(event.target.password.value)
        .digest("hex");

      axios
        .get(`/api/user/${hash}`)
        .then(res => {
          setUser(res.data.user.name, res.data.user.id);
          history.replace({ pathname: "/" });
          setErrorMessage(false);
        })
        .catch(error => {
          console.log(error);
          setErrorMessage(true);
        });
    }
  };
  return (
    <div className="login">
      <form onSubmit={loginClick} name="loginform" className="login__form">
        <p className="login__description">Please login</p>
        <label className="login__error">
          {errorMessage ? "Incorrect email/password combination" : ""}
        </label>
        <div className="login__wrapper">
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="login__field"
          />
          {!emailField ? (
            <label className="login__error">cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <div className="login__wrapper">
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="login__field"
          />
          {!passwordField ? (
            <label className="login__error">cannot be empty</label>
          ) : (
            ""
          )}
        </div>

        <input type="submit" value="Submit" className="app__button" />
        <Link to="/createaccount" className="login__link">
          Create New Account
        </Link>
      </form>
    </div>
  );
}
