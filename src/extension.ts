import * as vscode from 'vscode';
import { createConfigFile } from './createConfig';  // Importing the exported function

export function activate(context: vscode.ExtensionContext) {
    console.log('BrowserStack extension is now active');

    let disposable = vscode.commands.registerCommand('browserstack.createConfig', () => {
        createConfigFile();  // Calling the createConfigFile function
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
