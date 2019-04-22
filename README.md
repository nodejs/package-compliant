# package-compliant

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/Eomm/package-compliant.svg?branch=master)](https://travis-ci.com/Eomm/package-compliant)

Validate the `support` property in the `package.json` following the [package-maintenance guidelines][validation]!


## Install and Usage

```
npm i package-compliant -g
package-compliant validate --file ./package-custom.json
// or simply
package-compliant validate

// You can use also from your project folder:
npx package-compliant validate
```


## Commands

### Validate

```sh
package-compliant validate [--file|-f <file path>]
```

Validation applied:

+ ✔ Validate `support` property of the JSON `--file` if it exists. The default `--file` is the `package.json` in the directory where the command is executed.


[validation]: https://raw.githubusercontent.com/nodejs/package-maintenance/781a6bb752f4928e9e5e916b10ba38eb5289f316/docs/drafts/Baseline%20practive%20-%20Document%20support%20levels.md


## Contributions

### Add new commands

+ Add to `commands` array in `lib\index.js` the command name (Ex: `awesome`)
+ Create a `lib/commands/<command name>.js` file that expose this API `module.exports = function (args) { /* YOUR CODE */ }`
+ Create a `man/<command name>` file with all the information to run the command
+ Create a `test/<command name>.test.js` where you test your command


## License

Copyright [Manuel Spigolon](https://github.com/Eomm), Licensed under [MIT](./LICENSE).
