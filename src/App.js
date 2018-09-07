import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Albums from './components/Albums'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Albums/>
      </div>
    );
  }
}

export default App;
