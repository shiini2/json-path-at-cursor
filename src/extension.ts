// extension.ts
// Main entry point for the JSON Path at Cursor VS Code extension.
import * as vscode from "vscode";
import { getJsonPathAtOffset } from "./jsonPath";

/**
 * Activates the JSON Path at Cursor extension.
 * Registers the command to get the JSON path at the current cursor position.
 * @param context - The VS Code extension context.
 */
export function activate(context: vscode.ExtensionContext) {
  // Register the command for retrieving the JSON path at the cursor
  const disposable = vscode.commands.registerCommand(
    "jsonPathAtCursor.getJsonPath",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }

      const document = editor.document;
      const position = editor.selection.active;
      const text = document.getText();
      const offset = document.offsetAt(position);

      try {
        const path = getJsonPathAtOffset(text, offset);
        if (path) {
          // Show the path and offer to copy it to clipboard
          const action = await vscode.window.showInformationMessage(
            `JSON Path: ${path}`,
            "📋 Copy"
          );
          if (action === "📋 Copy") {
            vscode.env.clipboard.writeText(path);
            vscode.window.showInformationMessage(
              "JSON path copied to clipboard."
            );
          }
        } else {
          vscode.window.showInformationMessage(
            "No JSON path found at the current cursor position."
          );
        }
      } catch (err) {
        vscode.window.showErrorMessage(
          "Error parsing JSON: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}
