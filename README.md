# package-support

Validate the `support` property in the `package.json`

## Commands

### Validate

```sh
package-support validate [--file|-f <file path>]
```

Validate `support` properties of the JSON `--file` if exists. The validation apply the [package-maintenance guidelines][validation]

## Usage

Run it with command

```
node index.js validate --file ./package.json
```

[validation]: https://raw.githubusercontent.com/nodejs/package-maintenance/781a6bb752f4928e9e5e916b10ba38eb5289f316/docs/drafts/Baseline%20practive%20-%20Document%20support%20levels.md
