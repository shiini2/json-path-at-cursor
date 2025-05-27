// Utility for extracting the JSON path at a given cursor offset in a JSON document for the JSON Path at Cursor extension.
import * as jsonc from "jsonc-parser";

/**
 * Returns the JSON path at the given offset in the provided JSON text.
 * The path is formatted for easy use in code or documentation.
 *
 * @param text - The full JSON document as a string.
 * @param offset - The character offset within the text.
 * @returns The JSON path as a string, or null if not found.
 */
export function getJsonPathAtOffset(
  text: string,
  offset: number
): string | null {
  const rootNode = jsonc.parseTree(text);
  if (!rootNode) {
    return null;
  }

  // Handle case: cursor is after a comma or colon, return previous property
  let adjustedOffset = offset;
  // Move offset back if it's after a comma or a colon (and skip whitespace)
  while (adjustedOffset > 0 && /[\s,:]/.test(text[adjustedOffset - 1])) {
    adjustedOffset--;
  }

  let node: jsonc.Node | undefined = jsonc.findNodeAtOffset(
    rootNode,
    adjustedOffset,
    true
  );
  if (!node) {
    return null;
  }

  const pathSegments: (string | number)[] = [];

  // Traverse up the tree to build the path
  while (node && node.parent) {
    const parent: jsonc.Node = node.parent;
    if (parent.type === "property") {
      // If inside an object property, use the property key
      const keyNode = parent.children?.[0];
      if (keyNode?.value) {
        pathSegments.unshift(keyNode.value);
      }
      node = parent.parent; // Move up to the containing object
    } else if (parent.type === "array" && parent.children) {
      // If inside an array, use the index
      const index = parent.children.indexOf(node);
      pathSegments.unshift(index);
      node = parent;
    } else {
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
