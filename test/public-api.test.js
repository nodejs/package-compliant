'use strict'

const t = require('tap')
const publicApi = require('../lib/index')
const test = t.test

test('validateSupportField function', t => {
  t.plan(1)
  const func = publicApi.validateSupportField
  t.type(func, 'function')
})
