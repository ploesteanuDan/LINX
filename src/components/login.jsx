import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../config/firebase";
import { AuthContext } from "../Auth";
import "../styles/login.css";
import logo from "../res/LINX.png";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginContainer">
      <div className="LoginFieldContainer">
        <h1 className="loginText">Log in.</h1>
        <form className="credForm" onSubmit={handleLogin}>
          <div className="cred">
            <input className="credInput" name="email" type="name" required />
            <label className="credLabel">
              <span className="credContent">Email</span>{" "}
            </label>
          </div>
          <div className="cred">
            <input
              className="credInput"
              name="password"
              type="password"
              required
            />
            <label className="credLabel">
              <span className="credContent">Password</span>
            </label>
          </div>
          <button className="loginButton" type="submit">
            Log in
          </button>
          <br />
          <a className="credLink" href="/signup">
            Don't have an account?
          </a>
        </form>
      </div>
      <div className="LoginBackgroundContainer">
        <img className="logo" src={logo} alt="logo"></img>
      </div>
    </div>
  );
};

export default withRouter(Login);
