const normalize = require('./math/normalize')

module.exports = {
  eeg: reading => {
    const address = '/eeg/' + reading.electrode
    const type = 's'
    const value = JSON.stringify(reading)
    const args = [{ type, value }]
    return { address, args }
  },

  acc: reading => {
    const address = '/acc'
    const sequenceId = reading.sequenceId
    const samples = reading.samples[2]
    const type = 's'
    const x = normalize(samples.x)
    const y = normalize(samples.y)
    const z = normalize(samples.z)
    const data = { sequenceId, x, y, z }
    const value = JSON.stringify(data)
    const args = [{ type, value }]
    return { address, args }
  },

  tel: reading => {
    const address = '/tel'
    const type = 's'
    const value = JSON.stringify(reading)
    const args = [{ type, value }]
    return { address, args }
  },
}
