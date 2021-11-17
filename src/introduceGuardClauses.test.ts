import assert = require("assert");
import { transform } from "./transform";

describe("Introduce Guard Clauses", () => {
  it("remove the redundant else block", () => {
    const code = `
function simpleScenario() {
  if (isAlive) {
    return true;
  } else {
    doSomething();
    return false;
  }
}`;

    const result = transform(code);

    const expectedCode = `
function simpleScenario() {
  if (isAlive) {
    return true;
  }

  doSomething();
  return false;
}`;
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
  });

  it("do nothing if IfStatement has no alternate", () => {
    const code = `
function simpleScenario() {
  if (isAlive) {
    return true;
  }
}`;

    const result = transform(code);

    const expectedCode = code;
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
  });
});
