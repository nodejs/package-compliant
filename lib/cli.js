#!/usr/bin/env node
'use strict'

const commist = require('commist')()

const commands = ['apply', 'validate', 'help']
commands.forEach(command => { commist.register(command, require(`./commands/${command}`)) })

const res = commist.parse(process.argv.splice(2))
if (res) {
  require('./commands/help')()
}
