import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension is now active!");

  let disposable = vscode.commands.registerCommand(
    "extension.convertToArrowFunction",
    () => {
      vscode.window.showInformationMessage("Hello everyone!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
