'use strict'

const { test } = require('tap')
const { spawn } = require('child_process')
const packageCompliant = require('../lib/index')

const node = process.execPath

test('validate command', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/cli', 'validate'])
  cli.stdout.setEncoding('utf8')
  cli.stdout.on('data', (output) => {
    console.log(output)
    t.like(output, 'is valid')
    t.pass()
  })
})

test('validate utility', t => {
  t.plan(2)
  const success = packageCompliant.validateSupportField(require('../package-support.json'))
  t.equal(success, true)

  t.throws(() => {
    packageCompliant.validateSupportField({ varsions: [{ missing: 'required-fields' }] })
  })
})
