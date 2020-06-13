import React, { Component } from "react";
import firebase from "../config/firebase";
import CreateLink from "./createlink";
import LinkList from "./linklist";
import "../styles/folder.css";
import { Spring } from "react-spring/renderprops";

class Folder extends Component {
  state = { toggle: false, toggleAdd: false, docId: "" };

  toggle = () => this.setState((state) => ({ toggle: !state.toggle }));
  toggleAdd = () => this.setState((state) => ({ toggleAdd: !state.toggleAdd }));
  handleDelete = (e) => {
    firebase
      .firestore()
      .collection(this.props.userId)
      .where("name", "==", this.props.folderName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.state.docId = doc.id;
        });
        firebase
          .firestore()
          .collection(this.props.userId)
          .doc(this.state.docId)
          .delete();
      });
  };

  render() {
    return (
      <div className="folderContainer">
        <Spring
          from={{ marginBottom: "-380px" }}
          to={{ marginBottom: this.state.toggle ? "0px" : "-380px" }}
        >
          {(props) => (
            <div style={props}>
              {" "}
              <div className="folderCardContainer">
                {this.props.folderName}
                <button
                  onClick={this.toggle}
                  className="toggleFolderButton"
                ></button>
              </div>
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0 }}
          to={{
            opacity: this.state.toggle ? 1 : 0,

            transform: this.state.toggle
              ? "translatex(0%)"
              : "translatex(-100%)",
          }}
          leave={{
            opacity: 0,

            transform: this.state.toggle
              ? "translatex(-100%)"
              : "translatex(-0%)",
          }}
        >
          {(props) => (
            <div style={props}>
              <div className="linkListContainer">
                <LinkList
                  userId={this.props.userId}
                  folderName={this.props.folderName}
                />
                <button className="addLinkButton" onClick={this.toggleAdd}>
                  Add link
                </button>
              </div>
              <button
                className="deleteFolderButton"
                onClick={this.handleDelete}
              >
                Delete folder
              </button>
              <Spring
                from={{ opacity: 0, display: "none" }}
                to={{
                  opacity: this.state.toggleAdd ? 1 : 0,
                  display: this.state.toggleAdd ? "block" : "none",
                  transform: this.state.toggleAdd
                    ? "translatey(0%)"
                    : "translatey(-100%)",
                }}
              >
                {(props) => (
                  <div style={props}>
                    <CreateLink
                      userId={this.props.userId}
                      folderName={this.props.folderName}
                    />
                  </div>
                )}
              </Spring>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}

export default Folder;
