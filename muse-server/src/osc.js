const osc = require('osc')
const Jetty = require('jetty')
const logger = require('./utils/logger')

const connect = () => {
  return new Promise((resolve, reject) => {
    try {
      const client = new osc.UDPPort({
        localAddress: '0.0.0.0',
        localPort: 5000,
        remotePort: 5000,
      })

      client.on('ready', () => {
        logger.log('g',
            'OSC: SUCCESS | OSC port is connected and ready for broadcasting.',
          )
      })
      client.on('error', err => {
        logger.log('r', 'OSC: ERROR | Error in the OSC port:')
        logger.log('w', err)
      })
      client.open()
      resolve(client)
    } catch (err) {
      reject(err)
    }
  })
}

const broadcast = (client, message) => {
  client.send(message)
}

const test = client => {
  return new Promise((resolve, reject) => {
    try {
      client.send({
        address: '/test',
        args: [{ type: 's', value: 'wow' }],
      })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { connect, broadcast, test }
