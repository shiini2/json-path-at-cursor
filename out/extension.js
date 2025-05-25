"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
// extension.ts
// Main entry point for the JSON Path at Cursor VS Code extension.
const vscode = __importStar(require("vscode"));
const jsonPath_1 = require("./jsonPath");
/**
 * Activates the JSON Path at Cursor extension.
 * Registers the command to get the JSON path at the current cursor position.
 * @param context - The VS Code extension context.
 */
function activate(context) {
    // Register the command for retrieving the JSON path at the cursor
    const disposable = vscode.commands.registerCommand("jsonPathAtCursor.getJsonPath", async () => {
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
            const path = (0, jsonPath_1.getJsonPathAtOffset)(text, offset);
            if (path) {
                // Show the path and offer to copy it to clipboard
                const action = await vscode.window.showInformationMessage(`JSON Path: ${path}`, "📋 Copy");
                if (action === "📋 Copy") {
                    vscode.env.clipboard.writeText(path);
                    vscode.window.showInformationMessage("JSON path copied to clipboard.");
                }
            }
            else {
                vscode.window.showInformationMessage("No JSON path found at the current cursor position.");
            }
        }
        catch (err) {
            vscode.window.showErrorMessage("Error parsing JSON: " +
                (err instanceof Error ? err.message : String(err)));
        }
    });
    context.subscriptions.push(disposable);
}
//# sourceMappingURL=extension.js.map