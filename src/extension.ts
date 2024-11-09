import * as vscode from 'vscode';
import { createConfigFile } from './createConfig';

export function activate(context: vscode.ExtensionContext) {
  console.log('BrowserStack extension is now active');

  let disposable = vscode.commands.registerCommand('browserstack.createConfig', () => {
    createConfigFile();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
