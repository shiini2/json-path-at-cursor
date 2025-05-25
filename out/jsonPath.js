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
exports.getJsonPathAtOffset = getJsonPathAtOffset;
// jsonPath.ts
// Utility for extracting the JSON path at a given cursor offset in a JSON document.
const jsonc = __importStar(require("jsonc-parser"));
/**
 * Returns the JSON path at the given offset in the provided JSON text.
 * The path is formatted for easy use in code or documentation.
 *
 * @param text - The full JSON document as a string.
 * @param offset - The character offset within the text.
 * @returns The JSON path as a string, or null if not found.
 */
function getJsonPathAtOffset(text, offset) {
    const rootNode = jsonc.parseTree(text);
    if (!rootNode) {
        return null;
    }
    let node = jsonc.findNodeAtOffset(rootNode, offset, true);
    if (!node) {
        return null;
    }
    const pathSegments = [];
    // Traverse up the tree to build the path
    while (node && node.parent) {
        const parent = node.parent;
        if (parent.type === "property") {
            // If inside an object property, use the property key
            const keyNode = parent.children?.[0];
            if (keyNode?.value) {
                pathSegments.unshift(keyNode.value);
            }
            node = parent.parent; // Move up to the containing object
        }
        else if (parent.type === "array" && parent.children) {
            // If inside an array, use the index
            const index = parent.children.indexOf(node);
            pathSegments.unshift(index);
            node = parent;
        }
        else {
            node = parent;
        }
    }
    // Format the path for readability and code usage
    const formattedPath = pathSegments
        .map((segment) => {
        if (typeof segment === "number") {
            return `[${segment}]`;
        }
        if (/^[a-zA-Z_][\w$]*$/.test(segment)) {
            return `.${segment}`;
        }
        return `[\"${segment}\"]`;
    })
        .join("");
    // Remove leading dot if present
    return formattedPath.replace(/^\./, "");
}
//# sourceMappingURL=jsonPath.js.map