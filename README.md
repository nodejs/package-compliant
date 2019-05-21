# package-compliant

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/Eomm/package-compliant.svg?branch=master)](https://travis-ci.com/Eomm/package-compliant)

Validate the `support` property in the `package.json` following the [package-maintenance guidelines][validation]!


## Install

You can use this package as a CLI or as a Module if you need to use the core function of this module.

```
// As a CLI
npm i package-compliant -g

// As a module
npm i package-compliant
```

## Commands

To run the commands you can execute:

```sh
package-compliant validate --file ./package-custom.json
// or simply in a project folder
package-compliant validate

// npx is supported of course
npx package-compliant validate
```

### Validate

```sh
package-compliant validate [--file|-f <file path>]
```

Validation applied:

+ ✔ Validate `support` property of the JSON `--file` if it exists. The default `--file` is the `package.json` in the directory where the command is executed.


## Module

To use this package as a module you need to:

```js
const packageCompliant = require('package-compliant')
const aPackageJson = require('./package.json')

try {
  packageCompliant.validatePackageJson(aPackageJson)
  // the package is valid
} catch (err) {
  // the package has some errors
}

// or you can use callback:
packageCompliant.validatePackageJson(aPackageJson, (err, valid) => {
  if (err) {
    // there are some errors!!
  }
})
```


## Contributions

Read the [CONTRIBUTING](./CONTRIBUTING.md) guidelines to start help us!

### Add new commands

+ Add to `commands` array in `lib\index.js` the command name (Ex: `awesome`)
+ Create a `lib/commands/<command name>.js` file that expose this API `module.exports = function (args) { /* YOUR CODE */ }`
+ Create a `man/<command name>` file with all the information to run the command
+ Create a `test/<command name>.test.js` where you test your command


## License

Copyright [Manuel Spigolon](https://github.com/Eomm), Licensed under [MIT](./LICENSE).


[validation]: https://raw.githubusercontent.com/nodejs/package-maintenance/781a6bb752f4928e9e5e916b10ba38eb5289f316/docs/drafts/Baseline%20practive%20-%20Document%20support%20levels.md