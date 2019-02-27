'use strict'

const argv = require('yargs-parser')

module.exports = function parseArgs (args) {
  const parsedArgs = argv(args, {
    boolean: ['help'],
    string: ['file'],
    alias: {
      file: ['f']
    },
    default: {
      file: 'package.json'
    }
  })

  // remove the aliases this way
  return Object.assign({}, {
    _: parsedArgs._,
    file: parsedArgs.file
  })
}
