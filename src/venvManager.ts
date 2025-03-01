// // venvManager.ts
// import * as cp from 'child_process';
// import * as path from 'path';
// import * as vscode from 'vscode';

// export function createVirtualEnv(rootPath: string, venvPath: string, callback: (error: Error | null) => void) {
//     const createVenvCommand = `python3 -m venv "${venvPath}"`;
//     console.log("VENV" + createVenvCommand)
//     cp.exec(createVenvCommand, (error) => {
//         if (error) {
//             vscode.window.showErrorMessage('Failed to create virtual environment. Please check your Python installation.');
//             console.error(`Error creating venv: ${error.message}`);
//             callback(error);
//         } else {
//             vscode.window.showInformationMessage('Virtual environment created successfully.');
//             callback(null);
//         }
//     });
// }

import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as fs from 'fs';

export function createVirtualEnv(venvPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(venvPath)) {
            vscode.window.showInformationMessage('Virtual environment already exists.');
            resolve();
            return;
        }

        vscode.window.showInformationMessage('Creating virtual environment...');
        cp.exec(`python3 -m venv "${venvPath}"`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage('Failed to create virtual environment.');
                console.error(`Venv Error: ${stderr}`);
                reject(error);
                return;
            }
            vscode.window.showInformationMessage('Virtual environment created successfully.');
            resolve();
        });
    });
}
