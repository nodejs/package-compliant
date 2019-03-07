'use strict'

const { needToShowHelp } = require('../man')

module.exports = function (args) {
  needToShowHelp('help', { help: true })
}
