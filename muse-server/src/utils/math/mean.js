module.exports = a => {
    let sum = 0
    a.forEach(v => {sum += v})
    return a.length > 0 ? sum / a.length : 0
}