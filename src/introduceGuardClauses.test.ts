import { assertAreEqual } from "./asserts";
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

    assertAreEqual(
      result,
      `
function simpleScenario() {
  if (isAlive) {
    return true;
  }

  doSomething();
  return false;
}`
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

    assertAreEqual(result, code);
  });

  it("do nothing if IfStatement has no final ReturnStatement", () => {
    const code = `
function simpleScenario() {
  if (isAlive) {
    sayHello();
  } else {
    doSomething();
    return false;
  }

  sayBye();
}`;

    const result = transform(code);

    assertAreEqual(result, code);
  });

  it("remove redundant else block when alternate is an ExpressionStatement", () => {
    const code = `
function simpleScenario() {
  if (isAlive) {
    return true;
  } else
    doSomething();
}`;

    const result = transform(code);

    assertAreEqual(
      result,
      `
function simpleScenario() {
  if (isAlive) {
    return true;
  }

  doSomething();
}`
    );
  });
});
