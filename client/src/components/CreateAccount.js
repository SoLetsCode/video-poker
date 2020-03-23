import React, { useState } from "react";
import crypto from "crypto";
import axios from "axios";

export default function CreateAccount({ setUser, setCredit, history }) {
  const [emailField, setEmailField] = useState(true);
  const [passwordField, setPasswordField] = useState(true);
  const [usernameField, setUsernameField] = useState(true);

  const loginClick = event => {
    event.preventDefault();
    event.target.email.value === ""
      ? setEmailField(false)
      : setEmailField(true);
    event.target.password.value === ""
      ? setPasswordField(false)
      : setPasswordField(true);
    event.target.username.value === ""
      ? setUsernameField(false)
      : setUsernameField(true);

    if (emailField && passwordField && usernameField) {
      const hash = crypto
        .createHmac("sha256", event.target.email.value)
        .update(event.target.password.value)
        .digest("hex");

      axios
        .post("/api/user", {
          hash: hash,
          name: event.target.username.value
        })
        .then(res => {
          setUser(res.data.user.name, res.data.user.id);
          setCredit(500);
          history.replace({ pathname: "/" });
        })
        .catch(error => console.log(error));
    }
  };
  return (
    <div className="login">
      <p className="login__description">
        Fields cannot be empty. Email and password will not be stored in
        database, rather this will create a unique key for your account. Please
        note, we cannot reset your email / password / username.
      </p>
      <form onSubmit={loginClick} name="loginform" className="login__form">
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
        <div className="login__wrapper">
          <label htmlFor="username" className="login__label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="login__field"
          />
          {!usernameField ? (
            <label className="login__error">cannot be empty</label>
          ) : (
            ""
          )}
        </div>
        <input type="submit" value="Submit" className="app__button" />
      </form>
    </div>
  );
}
