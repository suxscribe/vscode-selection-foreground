import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Configuration is loaded correctly', () => {
    const config = vscode.workspace.getConfiguration('selection-foreground');
    assert.strictEqual(typeof config.get('enabled'), 'boolean');
    assert.strictEqual(typeof config.get('textColor'), 'string');
  });

  test('Toggle command exists', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('selection-foreground.enabled'));
  });
});
