import * as vscode from "vscode";
import { transform } from "./transform";

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
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error("There's no active editor");
  }

  return editor.document.getText();
}

function write(code: string): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error("There's no active editor");
  }

  const edit = new vscode.WorkspaceEdit();

  const wholeDocument = new vscode.Range(
    new vscode.Position(0, 0),
    new vscode.Position(editor.document.lineCount, 0)
  );
  const updateCode = new vscode.TextEdit(wholeDocument, code);

  edit.set(editor.document.uri, [updateCode]);

  vscode.workspace.applyEdit(edit);
}

export function deactivate() {}
