import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "my-first-extension" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "my-first-extension.helloWorld",
    () => {
      const code = read();
      const transformedCode = transform(code);
      write(transformedCode);
    }
  );

  context.subscriptions.push(disposable);
}

function read(): string {
  return "TODO: implement";
}

function transform(code: string): string {
  return `${code}
// Transformed from the extension`;
}

function write(code: string): void {
  // TODO: implement
}

export function deactivate() {}
