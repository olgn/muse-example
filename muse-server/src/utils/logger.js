const Jetty = require('jetty')
const colors = require('./colors')
const log = new Jetty(process.stdout)

module.exports = {
    log: (color, message) => {
        const rgb = colors[color]
        log.rgb(rgb).text(message).text('\n')
    }
}