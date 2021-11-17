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
  if (
    !isBlockStatement(path.node.alternate) &&
    !isExpressionStatement(path.node.alternate)
  ) {
    return;
  }

  const alternateStatements = isExpressionStatement(path.node.alternate)
    ? [path.node.alternate]
    : path.node.alternate.body;
  path.insertAfter(alternateStatements);
  path.node.alternate = null;
}
