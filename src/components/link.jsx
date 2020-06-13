import React, { Component } from "react";
import firebase from "../config/firebase";
import "../styles/link.css";

class Link extends Component {
  state = { docId: "" };

  handleDelete = (e) => {
    firebase
      .firestore()
      .collection(this.props.userId)
      .doc(this.props.folderName)
      .collection("Links")
      .where("linkName", "==", this.props.link.linkName)
      .where("linkURL", "==", this.props.link.linkURL)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.state.docId = doc.id;
        });
        firebase
          .firestore()
          .collection(this.props.userId)
          .doc(this.props.folderName)
          .collection("Links")
          .doc(this.state.docId)
          .delete();
      });
  };

  render() {
    return (
      <div>
        <button
          className="deleteLinkButton"
          onClick={this.handleDelete}
        ></button>
      </div>
    );
  }
}

export default Link;
