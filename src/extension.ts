import * as vscode from 'vscode';
import { createConfigFile } from './createConfig';  // Importing the function from createConfig

export function activate(context: vscode.ExtensionContext) {
    console.log('BrowserStack extension is now active');

    // Register the command and associate it with the action
    let disposable = vscode.commands.registerCommand('browserstack.createConfig', () => {
        createConfigFile();  // Call the function that creates the config file
    });

    // Push the disposable command handler to the subscriptions
    context.subscriptions.push(disposable);
}

export function deactivate() {}
