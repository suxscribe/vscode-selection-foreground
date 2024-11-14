import * as vscode from 'vscode';
import { DecoratorManager } from './decoratorManager';
import { toggleEnabled } from './settings';

export function activate(context: vscode.ExtensionContext) {
  console.log('Selection Contrast extension is active');

  const decoratorManager = new DecoratorManager(context);

  // Register the toggle command
  const toggleCommand = vscode.commands.registerCommand('selection-foreground.toggleHighlight', async () => {
    const newState = await toggleEnabled();
    // Show status message
    vscode.window.setStatusBarMessage(`Selection Contrast: ${newState ? 'Enabled' : 'Disabled'}`, 2000);

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      decoratorManager.applyDecorations(editor);
    }
  });

  // Register selection change listener with a throttle
  const selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(event => {
    // Only process if the editor is active
    if (event.textEditor === vscode.window.activeTextEditor) {
      decoratorManager.applyDecorations(event.textEditor);
    }
  });

  // Add to subscriptions
  context.subscriptions.push(toggleCommand, selectionChangeListener, decoratorManager);
}

export function deactivate() {}
