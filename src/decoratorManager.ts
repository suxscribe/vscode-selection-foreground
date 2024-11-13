import * as vscode from 'vscode';
import { createDecorationType } from './configuration';

export class DecoratorManager {
  private decorationType: vscode.TextEditorDecorationType;
  private lastDecorations: string = '';
  private debounceTimeout: NodeJS.Timeout | undefined;
  private static DEBOUNCE_DELAY = 50; // milliseconds

  constructor() {
    this.decorationType = createDecorationType();
  }

  public applyDecorations(editor: vscode.TextEditor) {
    // Clear any pending updates
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Debounce the update
    this.debounceTimeout = setTimeout(() => {
      this.applyDecorationsImmediate(editor);
    }, DecoratorManager.DEBOUNCE_DELAY);
  }

  private applyDecorationsImmediate(editor: vscode.TextEditor) {
    // Create a string representation of current selections for comparison
    const selectionsKey = editor.selections
      .map(
        sel =>
          `${sel.start.line},${sel.start.character},${sel.end.line},${sel.end.character}`
      )
      .join('|');

    // Skip if selections haven't changed
    if (selectionsKey === this.lastDecorations) {
      return;
    }

    // Update decorations and store the new state
    const decorationsArray = editor.selections.map(selection => ({
      range: new vscode.Range(selection.start, selection.end),
    }));

    editor.setDecorations(this.decorationType, decorationsArray);
    this.lastDecorations = selectionsKey;
  }

  public dispose() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.decorationType.dispose();
  }
}
