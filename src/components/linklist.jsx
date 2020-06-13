import React, { Component } from "react";
import firebase from "../config/firebase";
import Link from "./link";
import "../styles/linklist.css";

class LinkList extends Component {
  state = { links: null };

  componentDidMount() {
    let links = [];
    firebase
      .firestore()
      .collection(this.props.userId)
      .doc(this.props.folderName)
      .collection("Links")
      .onSnapshot((querySnapshot) => {
        let changes = querySnapshot.docChanges();

        for (let change of changes) {
          if (change.type === "added") {
            links.push(change.doc.data());
          }
          if (change.type === "removed") {
            links.pop(change.doc.data());
          }
        }
        this.setState({ links: links });
      });
  }

  render() {
    return (
      <div>
        {this.state.links &&
          this.state.links.map((links) => (
            <div className="LinkList" key={links.linkName + links.linkURL}>
              {
                <div className="linkAndDeleteContainer">
                  <Link
                    className="deleteLink"
                    link={links}
                    userId={this.props.userId}
                    folderName={this.props.folderName}
                  />
                  <p className="linkName">{links.linkName}</p>
                  <a className="linkURL" href={links.linkURL} target="_blank">
                    Go
                  </a>
                </div>
              }
            </div>
          ))}
      </div>
    );
  }
}

export default LinkList;
