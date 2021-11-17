import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import {
  IfStatement,
  isBlockStatement,
  isExpressionStatement,
  isReturnStatement,
} from "@babel/types";

export function transform(code: string): string {
  const ast = parse(code);
  // 💡 Use AST Explorer to discover the AST structure:
  // https://astexplorer.net/
  traverse(ast, {
    IfStatement(path) {
      if (canUnwrapAlternate(path)) {
        unwrapAlternate(path);
      }
    },
  });
  return generate(ast).code;
}

function canUnwrapAlternate(path: NodePath<IfStatement>): boolean {
  const hasNoSiblingStatement = path.getAllNextSiblings().length === 0;

  const { consequent } = path.node;
  const finalStatementIsReturn =
    isBlockStatement(consequent) && isReturnStatement(last(consequent.body));

  return hasNoSiblingStatement || finalStatementIsReturn;
}

function last<T>(array: T[]): T {
  return array[array.length - 1];
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
