import * as vscode from 'vscode';
import { DecoratorManager } from './decoratorManager';
import { toggleEnabled } from './settings';

export function activate(context: vscode.ExtensionContext) {
  // console.log('Selection Foreground extension is active');

  const decoratorManager = new DecoratorManager(context);

  const toggleCommand = vscode.commands.registerCommand('selection-foreground.enabled', async () => {
    const newState = await toggleEnabled();
    // Show status message
    vscode.window.setStatusBarMessage(`Selection Foreground 🔥: ${newState ? 'Enabled' : 'Disabled'}`, 2000);

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      decoratorManager.applyDecorations(editor);
    }
  });

  const selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(event => {
    // Only process if the editor is active
    if (event.textEditor === vscode.window.activeTextEditor) {
      decoratorManager.applyDecorations(event.textEditor);
    }
  });

  context.subscriptions.push(toggleCommand, selectionChangeListener, decoratorManager);
}

export function deactivate() {}
