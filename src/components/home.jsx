import React, { Component } from "react";
import firebase from "../config/firebase";
import FolderList from "./folderlist";
import "../styles/home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = { userName: "" };
  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="homeContainer">
        <div className="whitespace"></div>
        <div className="home">
          <h1>Hello.</h1>
          <FolderList />
          <button
            className="signOutButton"
            onClick={() => firebase.auth().signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
