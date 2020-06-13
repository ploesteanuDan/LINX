import React, { Component } from "react";
import firebase from "../config/firebase";
import "../styles/createlink.css";

class CreateLink extends Component {
  state = { linkName: "", linkURL: "" };

  onSumbitLink = (e) => {
    firebase
      .firestore()
      .collection(this.props.userId)
      .doc(this.props.folderName)
      .collection("Links")
      .add({
        linkName: this.state.linkName,
        linkURL: this.state.linkURL,
      });
  };

  OnInputLinkName = (e) => {
    this.setState({ linkName: e.target.value });
  };

  OnInputLinkURL = (e) => {
    this.setState({ linkURL: e.target.value });
  };

  render() {
    return (
      <div className="createLinkContainer">
        <div className="create">
          <div className="form">
            <input
              className="formInput"
              onChange={this.OnInputLinkName}
              required
            ></input>
            <label className="formLabel">
              <span className="formContent">Name</span>
            </label>
          </div>
          <div className="form">
            <input
              className="formInput"
              onChange={this.OnInputLinkURL}
              required
            ></input>
            <label className="formLabel">
              <span className="formContent">URL</span>
            </label>
          </div>
          <button className="addButton" onClick={this.onSumbitLink}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default CreateLink;
