import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import firebase from "./config/firebase";
import Home from "./components/home";
import SignUp from "./components/signup";
import Login from "./components/login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="appContainer">
        <AuthProvider>
          <Router>
            <div className="pagesContainer">
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
