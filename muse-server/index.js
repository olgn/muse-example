require('./src/text-polyfill')
const noble = require("noble")
const bluetooth = require("bleat").webbluetooth
const {
  MUSE_SERVICE,
  MuseClient,
  zipSamples,
  channelNames
} = require("muse-js");

async function connect() {
  let device = await bluetooth.requestDevice({
    filters: [{ services: [MUSE_SERVICE] }]
  })
  const gatt = await device.gatt.connect();
  const client = new MuseClient();
  
  await client.connect(gatt);
  client.controlResponses.subscribe(x => console.log("Response:", x));
  await client.start();
  
  console.log("Connected!");
  return client;
}

noble.on("stateChange", state => {
  if (state === "poweredOn") {
    connect()
      .then(client => {
          client.eegReadings.subscribe(reading => {
              console.log('eeg reading:', reading)
          })
          client.accelerometerData.subscribe(reading => {
              console.log('accelerometer data:', reading)
          })
      })
      .catch(err => {
          console.log("error:", err)
          process.exit()
      });
  }
});
