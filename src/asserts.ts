import assert = require("assert");

export function assertAreEqual(result: string, expectedCode: string) {
  assert(
    result.trim() === expectedCode.trim(),
    `
Expected:

${expectedCode}

---

Actual:

${result}
`
  );
}
