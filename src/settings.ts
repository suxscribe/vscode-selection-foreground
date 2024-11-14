import * as vscode from 'vscode';

export function getConfiguration() {
  const config = vscode.workspace.getConfiguration('secon');
  return {
    enabled: config.get<boolean>('enabled') ?? true,
    textColor: config.get<string>('textColor') ?? '#000000',
  };
}

export async function toggleEnabled() {
  const config = vscode.workspace.getConfiguration('secon');
  const currentEnabled = config.get<boolean>('enabled') ?? true;
  await config.update('enabled', !currentEnabled, true);
  return !currentEnabled;
}

export function subscribeToConfigChanges(callback: () => void) {
  return vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('secon')) {
      callback();
    }
  });
}