import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

export function transform(code: string): string {
  const ast = parse(code);
  traverse(ast, {});
  return generate(ast).code;
}
