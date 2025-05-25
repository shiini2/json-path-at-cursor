import { getJsonPathAtOffset } from "../jsonPath";
import * as assert from "assert";

describe("getJsonPathAtOffset", () => {
  it("returns the correct path for a simple object property", () => {
    const json = '{ "foo": { "bar": 123 } }';
    // Offset inside "bar"
    const offset = json.indexOf("bar") + 2;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, "foo.bar");
  });

  it("returns the correct path for an array element", () => {
    const json = '{ "arr": [10, 20, 30] }';
    // Offset inside 20
    const offset = json.indexOf("20") + 1;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, "arr[1]");
  });

  it("returns the correct path for nested arrays and objects", () => {
    const json = '{ "a": [{ "b": [1, 2, 3] }] }';
    // Offset inside 2
    const offset = json.indexOf("2") + 1;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, "a[0].b[1]");
  });

  it("returns work for invalid (incomplete) JSON", () => {
    const json = '{ "foo": '; // incomplete
    const offset = json.length;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, "foo");
  });

  it("returns the previous property when cursor is after a comma", () => {
    const json = '{ "foo": 1, "bar": 2 }';
    // Offset just after the comma
    const offset = json.indexOf(",") + 1;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, "foo");
  });

  it("returns the previous property when cursor is after a colon", () => {
    const json = '{ "foo": 1, "bar": 2 }';
    // Offset just after the colon
    const offset = json.indexOf(":") + 1;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, "foo");
  });

  it("returns the correct path for property names with special characters", () => {
    const json = '{ "foo-bar": { "baz qux": 42 } }';
    // Offset inside "baz qux"
    const offset = json.indexOf("baz qux") + 2;
    const path = getJsonPathAtOffset(json, offset);
    assert.strictEqual(path, '["foo-bar"]["baz qux"]');
  });
});
