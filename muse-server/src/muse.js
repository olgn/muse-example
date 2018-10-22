const bluetooth = require('bleat').webbluetooth
const {
  MUSE_SERVICE,
  MuseClient,
  zipSamples,
  channelNames,
} = require('muse-js')

async function connect() {
  let device = await bluetooth.requestDevice({
    filters: [{ services: [MUSE_SERVICE] }],
  })
  const gatt = await device.gatt.connect()
  const client = new MuseClient()

  await client.connect(gatt)
  client.controlResponses.subscribe(x => console.log('Response:', x))
  await client.start()

  console.log('MUSE: SUCCESS | Muse headband is connected and broadcasting.')
  return client
}

module.exports = { connect }
