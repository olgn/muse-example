const noble = require('noble')
const osc = require('./osc')
const muse = require('./muse')
const utils = require('./utils')
const logger = require('./utils/logger')

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
                logger.log('b', 'MUSE: INFO: Broadcasting messages over OSC to port 5000.')
                museClient.eegReadings.subscribe(reading => {
                  // send osc message
                  osc.broadcast(oscClient, utils.oscMessage.eeg(reading))
                })
                museClient.accelerometerData.subscribe(reading => {
                  // send osc message
                  osc.broadcast(oscClient, utils.oscMessage.acc(reading))
                })
                museClient.telemetryData.subscribe(reading => {
                  // send osc message
                  osc.broadcast(oscClient, utils.oscMessage.tel(reading))
                })
              })
              .catch(err => {
                logger.log(
                  'r',
                  'MUSE: ERROR | There was an error connecting to the Muse headband:',
                )
                logger.log('w', err)
                process.exit()
              })
          }
        })
      })
      .catch(err => {
        logger.log(
          'r',
          'OSC: ERROR | There was an error with the test packet broadcast on the OSC Port.',
        )
        logger.log('w', err)
        process.exit()
      }),
  )
  .catch(err => {
    logger.log('r', 'OSC: ERROR | There was an error connecting to the OSC Port.')
    logger.log('w', err)
    process.exit()
  })
