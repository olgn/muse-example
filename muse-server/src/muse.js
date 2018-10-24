const bluetooth = require('bleat').webbluetooth
const {
  MUSE_SERVICE,
  MuseClient,
  zipSamples,
  channelNames,
} = require('muse-js')
const log = new (require('jetty'))(process.stdout)
const colors = require('./utils/colors')

async function connect() {
  let device = await bluetooth.requestDevice({
    filters: [{ services: [MUSE_SERVICE] }],
  })
  const gatt = await device.gatt.connect()
  const client = new MuseClient()
  await client.connect(gatt)
  await client.start()

  log.rgb(colors.g).text('MUSE: SUCCESS | Muse headband is connected and broadcasting.\n')
  return client
}

module.exports = { connect }
