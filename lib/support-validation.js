'use strict'

const Ajv = require('ajv')
const supportSchema = require('./support-schema')

const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(supportSchema)

/**
 * Validate the package.json agains a JSON schema.
 * If a callback isn't provided, an error will be thrown if the json isn't valid.
 * @param {object} packageJson a package.json object
 * @param {function} cb an optional callback <Error[], boolean>
 */
function validatePackageJson (packageJson, cb) {
  const valid = validate(packageJson)
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

module.exports = validatePackageJson
