const noble = require('noble')
const osc = require('./osc')
const muse = require('./muse')
const utils = require('./utils')

osc
  .connect()
  .then(oscClient =>
    osc
      .test(oscClient)
      .then(() => {
        noble.on('stateChange', state => {
          if (state === 'poweredOn') {
            muse
              .connect()
              .then(museClient => {
                museClient.eegReadings.subscribe(reading => {
                  osc.broadcast(oscClient, utils.oscMessage.eeg(reading))
                })
                museClient.accelerometerData.subscribe(reading => {
                  osc.broadcast(oscClient, utils.oscMessage.acc(reading))
                })
                museClient.telemetryData.subscribe(reading => {
                  osc.broadcast(oscClient, utils.oscMessage.tel(reading))
                })
              })
              .catch(err => {
                console.log(
                  'MUSE: ERROR | There was an error connecting to the Muse headband.',
                )
                console.log('MUSE: ERROR | ', err)
                process.exit()
              })
          }
        })
      })
      .catch(err => {
        console.log(
          'OSC: ERROR | There was an error with the test packet broadcast on the OSC Port.',
        )
        console.log(err)
        process.exit()
      }),
  )
  .catch(err => {
    console.log('OSC: ERROR | There was an error connecting to the OSC Port.')
    console.log(err)
    process.exit()
  })
