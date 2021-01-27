import React from 'react';
import DeviceInfo from "./Features/DeviceInfo";
import Wallet from "./Features/Wallet";
import * as Icon from 'react-cryptocoins';
import 'semantic-ui-css/semantic.min.css'
import "./App.css";

function App() {
  return (
    <div className="App">
        <div className="Container Align-Center">
          <Icon.Eth size={82} color="white" style={{padding: 16}}/>
          <DeviceInfo />
        </div>
        <Wallet />
    </div>
  );
}

export default App;
