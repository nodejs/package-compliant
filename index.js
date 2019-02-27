#!/usr/bin/env node
'use strict'
const commist = require('commist')()

const commands = ['validate', 'help']
commands.forEach(command => { commist.register(command, require(`./${command}`)) })

const res = commist.parse(process.argv.splice(2))
if (res) {
  console.log('TODO show help')
}
