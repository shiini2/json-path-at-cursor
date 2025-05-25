import * as assert from "assert";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  test("Command executes and output is as expected, copy button works3", async function () {
    // Create a new untitled JSON document
    const doc = await vscode.workspace.openTextDocument({
      language: "json",
      content: '{ "foo": { "bar": 123 } }',
    });
    const editor = await vscode.window.showTextDocument(doc);
    // Place cursor inside "bar"
    const barOffset = doc.getText().indexOf("bar") + 2;
    const pos = doc.positionAt(barOffset);
    editor.selection = new vscode.Selection(pos, pos);

    // Patch showInformationMessage before any command execution
    const originalShowInformationMessage = vscode.window.showInformationMessage;
    let messageText = "";
    let copyButtonClicked = false;
    // @ts-ignore
    vscode.window.showInformationMessage = async (msg, ...actions) => {
      messageText = msg;
      if (actions.includes("📋 Copy")) {
        copyButtonClicked = true;
        return "📋 Copy";
      }
      return undefined;
    };

    // Execute the command
    await vscode.commands.executeCommand("jsonPathAtCursor.getJsonPath");

    // Restore original
    vscode.window.showInformationMessage = originalShowInformationMessage;

    // Check the message text contains the expected message
    assert.match(messageText, /copied to clipboard/i);
    assert.ok(copyButtonClicked, "Copy button should be present and clicked");

    // Check clipboard content
    const clipboard = await vscode.env.clipboard.readText();
    assert.strictEqual(clipboard, "foo.bar");
  });
});
