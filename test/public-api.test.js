'use strict'

const t = require('tap')
const publicApi = require('../lib/index')
const test = t.test

test('validatePackageJson function', t => {
  t.plan(1)
  const func = publicApi.validatePackageJson
  t.type(func, 'function')
})
