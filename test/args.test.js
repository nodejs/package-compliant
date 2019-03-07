'use strict'

const t = require('tap')
const test = t.test
const parseArgs = require('../lib/args')

test('parse all args', t => {
  t.plan(1)

  const argv = [
    '--help', 'true',
    '--file', 'hello.json'
  ]
  const parsedArgs = parseArgs(argv)

  t.strictDeepEqual(parsedArgs, {
    _: [],
    help: true,
    file: 'hello.json'
  })
})

test('check default values', t => {
  t.plan(1)
  const parsedArgs = parseArgs([])

  t.strictDeepEqual(parsedArgs, {
    _: [],
    help: false,
    file: 'package.json'
  })
})

test('parse args with = assignment', t => {
  t.plan(1)

  const argv = [
    '--help',
    '--file=hello.json'
  ]
  const parsedArgs = parseArgs(argv)

  t.strictDeepEqual(parsedArgs, {
    _: [],
    help: true,
    file: 'hello.json'
  })
})

test('parse args aliases', t => {
  t.plan(1)

  const argv = [
    '-h',
    '-f=hello.json'
  ]
  const parsedArgs = parseArgs(argv)

  t.strictDeepEqual(parsedArgs, {
    _: [],
    help: true,
    file: 'hello.json'
  })
})
