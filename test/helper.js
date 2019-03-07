'use strict'

const fs = require('fs')

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function readFileHelp (file) {
  const help = fs.readFileSync(`./man/${file}`, 'utf8')
  return `${help}\n` // added because shell add a new line at the end
}

module.exports = {
  wait,
  readFileHelp
}
