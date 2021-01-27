import React from 'react';
import DeviceInfo from "./Features/DeviceInfo"
import Web3Account from "./Features/Web3Account"
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DeviceInfo />
        <Web3Account />
      </header>
    </div>
  );
}

export default App;
