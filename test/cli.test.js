'use strict'

const { test } = require('tap')
const { spawn } = require('child_process')

const h = require('./helper')

const node = process.execPath

test('show help when no command found', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/cli'])
  cli.stdout.setEncoding('utf8')
  cli.stdout.on('data', (output) => {
    const contentHelp = h.readFileHelp('help')
    t.equals(output, contentHelp)
    t.pass()
  })
})
