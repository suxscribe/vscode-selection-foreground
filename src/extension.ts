import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Selection Contrast extension is active');

    // Create a decoration type
    const decorationType = vscode.window.createTextEditorDecorationType({
        color: '#ffffff', // Text color
        backgroundColor: '#ff0000', // Background color
    });

    // Register a command that toggles the decoration
    let disposable = vscode.commands.registerCommand('selection-contrast.toggleHighlight', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        // Apply decoration to current selection
        const decorationsArray = editor.selections.map(selection => ({
            range: new vscode.Range(selection.start, selection.end)
        }));
        
        editor.setDecorations(decorationType, decorationsArray);
    });

    // Add selection change listener
    vscode.window.onDidChangeTextEditorSelection(event => {
        const editor = event.textEditor;
        
        // Apply decoration to new selection
        const decorationsArray = editor.selections.map(selection => ({
            range: new vscode.Range(selection.start, selection.end)
        }));
        
        editor.setDecorations(decorationType, decorationsArray);
    }, null, context.subscriptions);

    context.subscriptions.push(disposable);
}

export function deactivate() {}