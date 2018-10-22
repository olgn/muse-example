import React, { Component } from "react";
import { MuseClient } from "muse-js";

class ConnectButton extends Component {
  async init() {
    let client = new MuseClient();
    await client.connect();
    await client.start();
    client.eegReadings.subscribe(reading => {
      console.log('reading:', reading)
    })
    client.telemetryData.subscribe(telemetry => {
      console.log('telemetry:', telemetry)
    })
    client.accelerometerData.subscribe(acceleration => {
      console.log('acceleration:', acceleration)
    })
  }

  render() {
    return <button onClick={this.init}>Read Mind</button>;
  }
}

export default ConnectButton;
