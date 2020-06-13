import React, { Component } from "react";
import firebase from "../config/firebase";
import "../styles/createfolder.css";

class CreateFolder extends Component {
  state = { name: "" };

  onSubmitFolder = (e) => {
    firebase.firestore().collection(this.props.userId).add({
      name: this.state.name,
    });
  };

  onInputFolder = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div className="createFolderContainer ">
        <div className="create">
          <div className="form">
            <input
              className="formInput"
              onChange={this.onInputFolder}
              required
            ></input>
            <label className="formLabel">
              <span className="formContent">Name</span>
            </label>
          </div>
          <button className="addButton" onClick={this.onSubmitFolder}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default CreateFolder;
