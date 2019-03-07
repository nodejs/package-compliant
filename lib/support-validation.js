'use strict'

const Ajv = require('ajv')
const supportSchema = require('./support-schema')

const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(supportSchema)

module.exports = function (obj, cb) {
  const valid = validate(obj)
  if (cb) {
    cb(validate.errors, valid)
  } else {
    if (!valid) {
      const validationError = new Error()
      validationError.errors = validate.errors
      throw validationError
    }
    return valid
  }
}
