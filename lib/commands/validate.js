'use strict'

const { readFileSync } = require('fs')
const chalk = require('chalk')
const parseArgs = require('../args')
const { needToShowHelp } = require('../man')
const validate = require('../support-validation')
const pkg = require('../../package.json')

module.exports = function (args) {
  try {
    const opts = parseArgs(args)
    needToShowHelp('validate', opts)

    const fileContent = readFile(opts.file, 'utf8')
    const supportProp = parseJson(fileContent)

    if (supportProp.support == null) {
      const pkgError = new Error(chalk`{red Error} missing {blue support} field in your {blue ${opts.file}} file`)
      pkgError.code = 'PS-MISSING'
      throw pkgError
    }

    if (validateSupportField(supportProp.support)) {
      console.log(chalk`Your {blue ${opts.file}} is {green valid}`)
    }
  } catch (error) {
    if ((error.code || '').startsWith('PS-')) {
      console.log(error.message)
    } else {
      console.error(`Fatal error please report it to ${pkg.bugs.url}\n`, error)
    }
    process.exit(1)
  }
}

function readFile (file, enc) {
  try {
    return readFileSync(file, enc)
  } catch (error) {
    const pkgError = new Error(chalk`{red Error} reading file {blue ${file}}: ${error.message}`)
    pkgError.code = 'PS-READ'
    pkgError.stack = error.stack
    throw pkgError
  }
}

function parseJson (jsonString) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    const pkgError = new Error(chalk`{red Error} parsing JSON: ${error.message}`)
    pkgError.code = 'PS-PARSE'
    pkgError.stack = error.stack
    throw pkgError
  }
}

function validateSupportField (supportJson) {
  try {
    return validate(supportJson)
  } catch (error) {
    const errorsMessages = error.errors.map(e => {
      let domain = ''
      if (e.params && e.params.allowedValues) {
        domain = e.params.allowedValues.join(', ')
      }
      return chalk`{blue ${e.dataPath || 'support JSON'}} {red ${e.message}} ${domain}`
    }).join('\n')

    const pkgError = new Error(errorsMessages)
    pkgError.code = 'PS-VALIDATION'
    throw pkgError
  }
}
