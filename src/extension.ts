import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "my-first-extension" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "my-first-extension.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello from my very first extension!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
