'use strict'

const { readFileSync } = require('fs')
const chalk = require('chalk')
const parseArgs = require('../args')
const { needToShowHelp } = require('../man')
const pkg = require('../../package.json')

module.exports = function (args) {
  try {
    const opts = parseArgs(args)
    needToShowHelp('apply', opts)

    const fileContent = readFile(opts.file, 'utf8')
    const supportProp = parseJson(fileContent)

    supportProp.support = {
      hello: 'universe'
    }

    // TODO persist to fs.
  } catch (error) {
    if ((error.code || '').startsWith('PS-')) {
      console.log(error.message)
    } else {
      console.error(`Fatal error please report it to ${pkg.bugs.url}\n`, error)
    }
    process.exit(1)
  }
}

// TODO remove copy-paste
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

// TODO remove copy-paste
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
