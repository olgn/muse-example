import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ConnectButton from './connect/connect-button.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ConnectButton />
        </header>
      </div>
    );
  }
}

export default App;
