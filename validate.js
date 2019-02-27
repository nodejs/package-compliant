'use strict'

const { readFileSync } = require('fs')
const parseArgs = require('./args')
const validate = require('./lib/support-validation')

module.exports = function (args) {
  let opts = parseArgs(args)
  try {
    const fileContent = readFileSync(opts.file, 'utf8')
    const supportProp = JSON.parse(fileContent)

    validate(supportProp.support, (err, res) => {
      if (err) {
        // TODO show errors
      }
      console.log(`Your ${opts.file} is VALID`)
    })
  } catch (error) {
    // TODO
  }
}
