
const t = require('tap')
const validate = require('../lib/support-validation')
const test = t.test

test('basic validation', t => {
  t.plan(3)

  const toValidate = {
    target: 'NONE',
    response: 'BEST-EFFORT',
    backing: 'HOBBY'
  }

  t.ok(validate(toValidate))

  validate(toValidate, (err, res) => {
    t.error(err)
    t.ok(res)
  })
})

test('required fields', t => {
  t.plan(3)

  t.notOk(validate({}))

  validate({}, (err, res) => {
    t.equals(err.length, 3)
    t.notOk(res)
  })
})

test('complete valid support property', t => {
  t.plan(3)

  const toValidate = {
    target: 'LTS',
    response: 'REGULAR-7',
    'response-paid': 'REGULAR-1',
    backing: 'COMPANY',
    url: 'http://mygreatmodule.org/supportinfo.html'
  }

  t.ok(validate(toValidate))

  validate(toValidate, (err, res) => {
    t.error(err)
    t.ok(res)
  })
})

test('bad values on required fields', t => {
  t.plan(6)

  const toValidate = {
    target: 'foo',
    response: 'bar',
    backing: 'foobar'
  }

  t.notOk(validate(toValidate))

  validate(toValidate, (err, res) => {
    t.equals(err.length, 3)
    t.equals(err[0].dataPath, '.target')
    t.equals(err[1].dataPath, '.response')
    t.equals(err[2].dataPath, '.backing')
    t.notOk(res)
  })
})

test('bad url', t => {
  t.plan(4)

  const toValidate = {
    target: 'LTS',
    response: 'REGULAR-7',
    'response-paid': 'REGULAR-1',
    backing: 'COMPANY',
    url: 'invalid-url'
  }

  t.notOk(validate(toValidate))

  validate(toValidate, (err, res) => {
    t.equals(err.length, 1)
    t.equals(err[0].dataPath, '.url')
    t.notOk(res)
  })
})
