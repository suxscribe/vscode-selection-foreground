import * as vscode from 'vscode';
import { createDecorationType } from './configuration';

export class DecoratorManager {
  private decorationType: vscode.TextEditorDecorationType;

  constructor() {
    this.decorationType = createDecorationType();
  }

  public applyDecorations(editor: vscode.TextEditor) {
    const decorationsArray = editor.selections.map(selection => ({
      range: new vscode.Range(selection.start, selection.end),
    }));

    editor.setDecorations(this.decorationType, decorationsArray);
  }

  public dispose() {
    this.decorationType.dispose();
  }
}
