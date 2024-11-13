import * as vscode from 'vscode';

export interface DecorationConfig {
  color: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  fontWeight?: string;
  textDecoration?: string;
}

export const defaultDecorationConfig: DecorationConfig = {
  color: '#ffffff',
  // backgroundColor: '#ff0000',
  // border: '2px solid yellow',
  // borderRadius: '3px',
  // fontWeight: 'bold',
  // textDecoration: 'underline'
};

export function createDecorationType(
  config: DecorationConfig = defaultDecorationConfig
) {
  return vscode.window.createTextEditorDecorationType(config);
}
