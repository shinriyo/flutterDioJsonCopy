import * as vscode from "vscode";

function isErrorLike(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function activate(context: vscode.ExtensionContext) {
  const copyAsJsonCommand = vscode.commands.registerCommand(
    "extension.copyAsJson",
    async (variable: any) => {
      try {
        const jsonString = JSON.stringify(variable, null, 2);
        await vscode.env.clipboard.writeText(jsonString);
        vscode.window.showInformationMessage("Copied as JSON");
      } catch (error) {
        if (isErrorLike(error)) {
          vscode.window.showErrorMessage(
            "Failed to copy as JSON: " + error.message
          );
        } else {
          vscode.window.showErrorMessage(
            "Failed to copy as JSON: An unknown error occurred"
          );
        }
      }
    }
  );

  context.subscriptions.push(copyAsJsonCommand);
}

export function deactivate() {}
