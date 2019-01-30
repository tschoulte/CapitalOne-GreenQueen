import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './css/App.css';

import Login from './components/Login'
import Main from './Main'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '' }
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(value) {
    this.setState({ email: value })
  }

  render() {
    // const { email } = this.props;
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => <Login {...props} handleEmail={this.handleEmail} />} />
          <Route exact path="/home" render={(props) => <Main {...props} email={this.state.email} />} />
          <Route exact path="/test" component={Test} />
        </div>
      </Router>
    );
  }
}

function Test() {
  return (
    <div>
      <h2>Hello World</h2>
    </div>
  );
}

export default App;
