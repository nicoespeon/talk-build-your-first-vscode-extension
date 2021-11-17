import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import {
  IfStatement,
  isBlockStatement,
  isExpressionStatement,
} from "@babel/types";

export function transform(code: string): string {
  const ast = parse(code);
  // 💡 Use AST Explorer to discover the AST structure:
  // https://astexplorer.net/
  traverse(ast, {
    IfStatement(path) {
      unwrapAlternate(path);
    },
  });
  return generate(ast).code;
}

function unwrapAlternate(path: NodePath<IfStatement>) {
  const { alternate } = path.node;

  if (!isBlockStatement(alternate) && !isExpressionStatement(alternate)) {
    return;
  }

  const alternateStatements = isExpressionStatement(alternate)
    ? [alternate]
    : alternate.body;
  path.insertAfter(alternateStatements);
  path.node.alternate = null;
}
