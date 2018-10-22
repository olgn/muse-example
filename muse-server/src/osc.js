const osc = require('osc')

const connect = () => {
  return new Promise((resolve, reject) => {
    try {
      const client = new osc.UDPPort({
        localAddress: '0.0.0.0',
        localPort: 5000,
        remotePort: 5000,
      })

      client.on('ready', () => {
        console.log(
          'OSC: SUCCESS | OSC port is connected and ready for broadcasting.',
        )
      })
      client.on('message', message => {
        console.log(
          'OSC: BROADCAST | OSC port received the following message:',
          message,
        )
      })
      client.on('error', err => {
        console.log('OSC: ERROR | Error in the OSC port:', err)
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
