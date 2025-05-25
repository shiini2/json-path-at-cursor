# JSON Path at Cursor

JSON Path at Cursor is a Visual Studio Code extension that allows you to quickly retrieve the JSON path at your current cursor position in any JSON or JSONC file. This is especially useful for debugging, documentation, or when working with tools that require JSON path expressions.

## Features

- Get the JSON path at the cursor position with a single command
- Supports both standard JSON and JSON with comments (JSONC)
- Copy the resulting path to your clipboard instantly
- Works with nested objects and arrays, providing accurate paths
- Works with unsaved files: The extension can retrieve JSON paths even in files that have not been saved, ensuring seamless functionality during quick edits or temporary changes.

## Usage

1. Open a JSON or JSONC file in VS Code.
2. Place your cursor anywhere inside the JSON structure.
3. Run the command **Get JSON Path at Cursor** (search for `JSON Path at Cursor: Get JSON Path at Cursor` in the Command Palette, or use the shortcut).
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
dependencies.test[3].deep.oneMore.type
```

**Notes:**  
- **Dot notation** is used for property names that are valid JavaScript identifiers (letters, digits, underscores, and dollar signs, but not starting with a digit), for example: `dependencies.test`.

- **Bracket notation** with quotes is used if a property name contains spaces, special characters, or starts with a digit, for example: `dependencies["date-fns"].deep`. This ensures all JSON paths are syntactically correct and unambiguous.

## Extension Settings

This extension does not add any custom settings. It works out of the box.

## Requirements

- Visual Studio Code v1.100.0 or higher
### Cursor Position Behavior

- If the cursor is positioned immediately before the start of a key, the extension interprets the cursor as being closer to the previous key. This ensures consistent path resolution when navigating JSON structures.

  **Example:**  
  If the cursor is right before `"secondKey"` in the following JSON:

  ```json
  {
    "firstKey": 1,
    "secondKey": 2
  }
  ```

  The extension will return the path: `firstKey`

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
