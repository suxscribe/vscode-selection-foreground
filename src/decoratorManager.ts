import * as vscode from 'vscode';
import { getConfiguration, subscribeToConfigChanges } from './settings';

export class DecoratorManager {
  private decorationType: vscode.TextEditorDecorationType;
  private lastDecorations: string = '';
  private debounceTimeout: NodeJS.Timeout | undefined;
  private static DEBOUNCE_DELAY = 50; // milliseconds

  constructor(context: vscode.ExtensionContext) {
    this.decorationType = this.createDecorationType();

    context.subscriptions.push(
      subscribeToConfigChanges(() => {
        this.updateDecorationType();
      })
    );
  }

  private createDecorationType() {
    const config = getConfiguration();
    return vscode.window.createTextEditorDecorationType({
      color: config.textColor,
    });
  }

  public applyDecorations(editor: vscode.TextEditor) {
    const config = getConfiguration();
    if (!config.enabled) {
      // Clear decorations if disabled
      editor.setDecorations(this.decorationType, []);
      return;
    }

    // Clear any pending updates
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.applyDecorationsImmediate(editor);
    }, DecoratorManager.DEBOUNCE_DELAY);
  }

  private applyDecorationsImmediate(editor: vscode.TextEditor) {
    // Current selections to string for comparison
    const selectionsKey = editor.selections
      .map(sel => `${sel.start.line},${sel.start.character},${sel.end.line},${sel.end.character}`)
      .join('|');

    // Check if selection has changed
    if (selectionsKey === this.lastDecorations) {
      return;
    }

    // Update decorations
    const decorationsArray = editor.selections.map(selection => ({
      range: new vscode.Range(selection.start, selection.end),
    }));

    editor.setDecorations(this.decorationType, decorationsArray);
    this.lastDecorations = selectionsKey;
  }

  private updateDecorationType() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const config = getConfiguration();
    this.decorationType.dispose();
    this.decorationType = this.createDecorationType();

    if (config.enabled) {
      this.applyDecorations(editor);
    } else {
      editor.setDecorations(this.decorationType, []);
    }
  }

  public dispose() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.decorationType.dispose();
  }
}
