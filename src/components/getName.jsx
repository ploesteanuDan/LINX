import React, { Component } from "react";

class GetName extends Component {
  state = { userName: "" };
  componentWillUnmount() {}

  updateName = (e) => {
    this.state.userName = e.target.value;
  };

  render() {
    return (
      <input className="credInput" onChange={this.updateName} required></input>
    );
  }
}

export default GetName;
