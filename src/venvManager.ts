// venvManager.ts
import * as cp from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

export function createVirtualEnv(rootPath: string, venvPath: string, callback: (error: Error | null) => void) {
    const createVenvCommand = `python3 -m venv "${venvPath}"`;
    console.log("VENV" + createVenvCommand)
    cp.exec(createVenvCommand, (error) => {
        if (error) {
            vscode.window.showErrorMessage('Failed to create virtual environment. Please check your Python installation.');
            console.error(`Error creating venv: ${error.message}`);
            callback(error);
        } else {
            vscode.window.showInformationMessage('Virtual environment created successfully.');
            callback(null);
        }
    });
}
