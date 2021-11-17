import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

export function transform(code: string): string {
  const ast = parse(code);
  traverse(ast, {
    // TODO: transform code from here!
  });
  return generate(ast).code;
}
