// sdkInstaller.ts
import * as cp from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

export function installSDK(venvPath: string, callback: (error: Error | null) => void) {
    const activateCommand = process.platform === 'win32'
        ? path.join(venvPath, 'Scripts', 'activate.bat')
        : path.join(venvPath, 'bin', 'activate');

    const installCommand = process.platform === 'win32'
        ? `"${activateCommand}" && pip install browserstack-sdk`
        : `source "${activateCommand}" && pip install browserstack-sdk`;

    cp.exec(installCommand, { shell: '/bin/bash' }, (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage('Failed to install BrowserStack SDK. Please check your Python and pip installation.');
            console.error(`Error installing SDK: ${stderr}`);
            callback(error);
        } else {
            vscode.window.showInformationMessage('BrowserStack SDK installed successfully.');
            callback(null);
        }
    });
}
