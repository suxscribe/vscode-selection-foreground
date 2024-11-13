import * as vscode from 'vscode';
import { DecoratorManager } from './decoratorManager';

export function activate(context: vscode.ExtensionContext) {
  console.log('Selection Contrast extension is active');

  const decoratorManager = new DecoratorManager();

  // Register the toggle command
  const toggleCommand = vscode.commands.registerCommand(
    'secon.toggleHighlight',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        decoratorManager.applyDecorations(editor);
      }
    }
  );

  // Register selection change listener with a throttle
  const selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(
    event => {
      // Only process if the editor is active
      if (event.textEditor === vscode.window.activeTextEditor) {
        decoratorManager.applyDecorations(event.textEditor);
      }
    }
  );

  // Add to subscriptions
  context.subscriptions.push(
    toggleCommand,
    selectionChangeListener,
    decoratorManager
  );
}

export function deactivate() {}
