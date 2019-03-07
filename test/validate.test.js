'use strict'

const { test } = require('tap')
const { spawn } = require('child_process')
const h = require('./helper')

const node = process.execPath

test('show help', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/index', 'validate', '--help'])
  cli.stdout.setEncoding('utf8')
  cli.stdout.on('data', (output) => {
    const contentHelp = h.readFileHelp('validate')
    t.equals(output, contentHelp)
    t.pass()
  })
})

test('validate a valid package.json', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/index', 'validate'])
  cli.stdout.setEncoding('utf8')
  let stdout = ''
  cli.stdout.on('data', (data) => { stdout += data })
  cli.on('close', (code) => {
    t.match(stdout, /.*is valid.*/i)
    t.equals(code, 0)
  })
})

test('validate an invalid package.json', t => {
  t.plan(5)
  const cli = spawn(node, ['lib/index', 'validate', '-f=./test/invalid-package.json'])
  cli.stdout.setEncoding('utf8')
  let stdout = ''
  cli.stdout.on('data', (data) => { stdout += data })
  cli.on('close', (code) => {
    t.equals(code, 1)

    function * outErrors () {
      yield /.target should be equal to one of the allowed values ABANDONED, NONE, LATEST, LTS, SUPERSET/
      yield /support JSON should have required property 'response'/
      yield /support JSON should have required property 'backing'/
    }

    const gen = outErrors()

    const errors = stdout.split('\n')
    t.equals(errors.length, 3 + 1)

    errors.filter(_ => _ !== '')
      .forEach(error => {
        t.match(error, gen.next().value)
      })
  })
})

test('validate an invalid package.json - missing support', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/index', 'validate', '-f=./test/missing-package.json'])
  cli.stdout.setEncoding('utf8')
  let stdout = ''
  cli.stdout.on('data', (data) => { stdout += data })
  cli.on('close', (code) => {
    t.match(stdout, /^Error missing support field:*/i)
    t.equals(code, 1)
  })
})

test('read an unexisting file', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/index', 'validate', '-f=this-file-does-not-exist'])
  cli.stdout.setEncoding('utf8')
  let stdout = ''
  cli.stdout.on('data', (data) => { stdout += data })
  cli.on('close', (code) => {
    t.match(stdout, /^Error .*file this-file-does-not-exist.*/i)
    t.equals(code, 1)
  })
})

test('read a not JSON file', t => {
  t.plan(2)
  const cli = spawn(node, ['lib/index', 'validate', '-f=README.md'])
  cli.stdout.setEncoding('utf8')
  let stdout = ''
  cli.stdout.on('data', (data) => { stdout += data })
  cli.on('close', (code) => {
    t.match(stdout, /^Error parsing JSON.*/i)
    t.equals(code, 1)
  })
})
