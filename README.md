# jsonPathFinder

jsonPathFinder is a Visual Studio Code extension that allows you to quickly retrieve the JSON path at your current cursor position in any JSON or JSONC file. This is especially useful for debugging, documentation, or when working with tools that require JSON path expressions.

## Features

- Get the JSON path at the cursor position with a single command
- Supports both standard JSON and JSON with comments (JSONC)
- Copy the resulting path to your clipboard instantly
- Works with nested objects and arrays, providing accurate paths

## Usage

1. Open a JSON or JSONC file in VS Code.
2. Place your cursor anywhere inside the JSON structure.
3. Run the command **Get JSON Path at Cursor** (search for `jsonPathFinder: Get JSON Path at Cursor` in the Command Palette, or bind it to a shortcut).
4. The JSON path will be shown in an information message, with an option to copy it to your clipboard.

## Example

Given the following JSON:

```json
{
  "dependencies": {
    "test": [
      {},
      {},
      {},
      {
        "deep": {
          "oneMore": {
            "type": "example"
          }
        }
      }
    ]
  }
}
```

If your cursor is on the word `example`, the extension will show:

```
dependencies.test[3].deep.oneMore["type"]
```

## Extension Settings

This extension does not add any custom settings. It works out of the box.

## Requirements

- Visual Studio Code v1.100.0 or higher

## Known Issues

- Only works with files that are valid JSON or JSONC (with comments).
- The path format is designed for code usage and may not match all third-party JSONPath libraries.

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, improvements, or new features.

## Release Notes

### 0.0.1

- Initial release: get JSON path at cursor and copy to clipboard.

---

## Best Practices Followed

- Clear and descriptive command names and messages
- Well-documented code with JSDoc and inline comments
- Minimal, dependency-light implementation
- Follows VS Code extension guidelines for activation and command registration
- Includes linting and testing setup

## License

MIT
