import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { identifier } from "@babel/types";

export function transform(code: string): string {
  const ast = parse(code);
  traverse(ast, {
    Identifier(path) {
      // 💡 Use AST Explorer to discover the AST structure:
      // https://astexplorer.net/

      if (path.node.name === "result") {
        const newIdentifier = identifier("response");
        path.replaceWith(newIdentifier);
      } else {
        path.node.name = capitalize(path.node.name);
      }
    },
  });
  return generate(ast).code;
}

function capitalize(name: string): string {
  const firstLetter = name[0];
  const restOfName = name.slice(1);
  return `${firstLetter.toUpperCase()}${restOfName}`;
}
