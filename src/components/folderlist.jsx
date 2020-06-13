import React, { Component, useState } from "react";
import firebase from "../config/firebase";
import CreateFolder from "./createfolder";
import Folder from "./folder";
import "../styles/folderlist.css";
import { Spring } from "react-spring/renderprops";

class FolderList extends Component {
  state = { folders: null, userId: "", toggle: false, user: "" };
  toggle = () => this.setState((state) => ({ toggle: !state.toggle }));

  componentDidMount() {
    let folders = [];
    firebase
      .firestore()
      .collection(this.state.userId)
      .onSnapshot((querySnapshot) => {
        let changes = querySnapshot.docChanges();

        for (let change of changes) {
          if (change.type === "added") {
            folders.push(change.doc.data());
          }
          if (change.type === "removed") {
            folders.pop(change.doc.data());
          }
        }
        this.setState({ folders: folders });
        console.log(folders);
        console.log(folders.length, this.state.folders.length);
      });
  }

  render() {
    if (firebase.auth().currentUser) {
      this.state.userId = firebase.auth().currentUser.uid;
    }
    return (
      <div>
        <p>Create and manage your folders as you wish.</p>
        <div>
          {this.state.folders &&
            this.state.folders.map((folders) => (
              <li className="FolderList" key={folders.name}>
                {
                  <div className="folderContainer">
                    <Folder
                      userId={this.state.userId}
                      folderName={folders.name}
                    />
                  </div>
                }
              </li>
            ))}
        </div>
        <button className="newFolderButton" onClick={this.toggle}>
          Create folder
        </button>
        <Spring
          from={{ opacity: 0, display: "none" }}
          to={{
            opacity: this.state.toggle ? 1 : 0,
            display: this.state.toggle ? "block" : "none",
          }}
        >
          {(props) => (
            <div style={props}>
              <CreateFolder
                folders={this.state.folders}
                userId={this.state.userId}
              />
            </div>
          )}
        </Spring>
      </div>
    );
  }
}

export default FolderList;
