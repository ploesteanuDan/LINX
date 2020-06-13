import React, { useCallback } from "react";
import firebase from "../config/firebase";
import GetName from "./getName";
import logo from "../res/LINX.png";
const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="loginContainer">
      <div className="LoginFieldContainer">
        <h1 className="loginText">Sign up.</h1>
        <form className="credForm" onSubmit={handleSignUp}>
          <div className="cred">
            <input
              className="credInput"
              name="email"
              type="name"
              required
            ></input>
            <label className="credLabel">
              <span className="credContent">Email</span>
            </label>
          </div>
          <div className="cred">
            <GetName />
            <label className="credLabel">
              <span className="credContent">Name</span>{" "}
            </label>
          </div>
          <div className="cred">
            <input
              className="credInput"
              name="password"
              type="password"
              required
            ></input>
            <label className="credLabel">
              <span className="credContent">Password</span>
            </label>
          </div>

          <button className="loginButton" type="submit">
            Sign Up
          </button>

          <a className="credLink" href="/login">
            I already have an account.
          </a>
        </form>
      </div>
      <div className="LoginBackgroundContainer">
        <h1 className="homeText">Organize your e-world.</h1>
        <img className="logo" src={logo} alt="logo"></img>
      </div>
    </div>
  );
};

export default SignUp;
