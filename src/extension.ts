import * as vscode from 'vscode';
import { DecoratorManager } from './decoratorManager';
import { toggleEnabled } from './settings';

export function activate(context: vscode.ExtensionContext) {
  const decoratorManager = new DecoratorManager(context);

  const toggleCommand = vscode.commands.registerCommand('selection-foreground.enabled', async () => {
    const newState = await toggleEnabled();
    vscode.window.setStatusBarMessage(`Selection Foreground: ${newState ? 'Enabled' : 'Disabled'}`, 2000);

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      decoratorManager.applyDecorations(editor);
    }
  });

  const selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(event => {
    if (event.textEditor === vscode.window.activeTextEditor) {
      decoratorManager.applyDecorations(event.textEditor);
    }
  });

  // Handle copy line commands while preserving original selection decoration
  const copyLineHandler = vscode.commands.registerCommand(
    'selection-foreground.handleCopyLine',
    async (direction: 'up' | 'down') => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        // Store the current state
        const originalSelections = [...editor.selections];

        // Execute copy line command
        const command = direction === 'up' ? 'editor.action.copyLinesUpAction' : 'editor.action.copyLinesDownAction';
        await vscode.commands.executeCommand(command);

        // Small timeout to let the editor update
        setTimeout(() => {
          // For copy up/down, the original selection remains on the same lines
          const decorations = originalSelections.map(selection => ({
            range: new vscode.Range(
              selection.start.line,
              selection.start.character,
              selection.end.line,
              selection.end.character
            ),
          }));

          editor?.setDecorations(decoratorManager.decorationType, decorations);
        }, 10);
      }
    }
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('selection-foreground.copyLineUp', () => {
      vscode.commands.executeCommand('selection-foreground.handleCopyLine', 'up');
    }),
    vscode.commands.registerCommand('selection-foreground.copyLineDown', () => {
      vscode.commands.executeCommand('selection-foreground.handleCopyLine', 'down');
    }),
    toggleCommand,
    selectionChangeListener,
    copyLineHandler,
    decoratorManager
  );
}

export function deactivate() {}
