# JSON Path at Cursor
[JSON Path at Cursor](https://marketplace.visualstudio.com/items?itemName=shini.json-path-at-cursor) is a Visual Studio Code extension that instantly shows the JSON path at your cursor in any JSON or JSONC file. It's useful for debugging, documentation, or working with tools that use JSON path expressions.

## Features

- Get the JSON path at the cursor position with a single command
- Supports both standard JSON and JSON with comments (JSONC)
- Copy the resulting path to your clipboard instantly
- Works with nested objects and arrays, providing accurate paths
- Works with unsaved files: The extension can retrieve JSON paths even in files that have not been saved, ensuring seamless functionality during quick edits or temporary changes.

## Usage

1. Place your cursor anywhere within the JSON structure in any JSON or JSONC file (including unsaved documents).
2. **Run the command using one of these methods:**
  - **Keyboard Shortcut:**  
    - macOS: Press `Shift + Cmd + /`
    - Windows/Linux: Press `Shift + Alt + /`
  - **Context Menu:**  
    Right-click on a property and select **Get JSON Path at Cursor**.
  - **Command Palette:**  
    Open the Command Palette (`Cmd + Shift + P` on macOS, `Ctrl + Shift + P` on Windows/Linux), then search for and select `JSON Path at Cursor: Get JSON Path at Cursor`.
3. The JSON path at your cursor will be displayed in an information message, with an option to copy it to your clipboard.

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

If your cursor is on the word `example`, the extension will display:

```
dependencies.test[3].deep.oneMore.type
```

## Cursor Position Behavior

- If the cursor is immediately before a key, the extension treats it as being closer to the previous key. This provides consistent path resolution when navigating JSON structures.

  **Example:**  
  If the cursor is right before `"secondKey"` in:

  ```json
  {
   "firstKey": 1,
   "secondKey": 2
  }
  ```

  The extension will return: `firstKey`

**Notes:**
- **Dot notation** is used for property names that are valid JavaScript identifiers (letters, digits, underscores, or dollar signs, not starting with a digit), e.g., `dependencies.test`.
- **Bracket notation** with quotes is used for property names containing spaces, special characters, or starting with a digit, e.g., `dependencies["date-fns"].deep`. This ensures all JSON paths are syntactically correct and unambiguous.

## Extension Settings

This extension does not add any custom settings. It works out of the box.

## Requirements

- Visual Studio Code v1.100.0 or higher
- For the keyboard shortcut and context menu to work, the active editor must be a JSON or JSONC file.
- The command can also be run from the Command Palette in any file type that contains JSON content.
- The JSON does not need to be fully valid, partial or incomplete JSON structures are supported.

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, improvements, or new features.

## Release Notes

### [0.0.1] - 2025-05-25
#### Added
- Initial release: get JSON path at cursor and copy to clipboard.
- Support for both JSON and JSONC files.
- Accurate path resolution for nested objects and arrays.
- Clipboard integration for easy copying.
- Handles property names with special characters using bracket notation.

### [0.0.2] - 2025-05-25
#### Added
- Return correct property when cursor is right after the colon.
- Add mac shortcut.

### [0.0.3] - 2025-05-27
#### Changed
- Documentation update: improved and clarified README instructions.

## License

MIT
