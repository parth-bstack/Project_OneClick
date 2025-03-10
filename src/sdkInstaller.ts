import * as vscode from 'vscode';
import * as cp from 'child_process';

export async function installSDK(venvPath: string, isAppAutomate: boolean, outputChannel: vscode.OutputChannel, statusBar: vscode.StatusBarItem) {
    const activateCommand = process.platform === 'win32'
        ? `"${venvPath}\\Scripts\\activate.bat"`
        : `source "${venvPath}/bin/activate"`;

    let installCommand = `${activateCommand} && pip install browserstack-sdk`;
    if (isAppAutomate) {
        installCommand += " Appium-Python-Client";
    } else {
        installCommand += " selenium";
    }

    outputChannel.appendLine(`📦 Installing ${isAppAutomate ? "BrowserStack SDK & Appium-Python-Client" : "BrowserStack SDK & Selenium"}...`);
    statusBar.text = "📦 Installing dependencies...";

    return new Promise<void>((resolve, reject) => {
        cp.exec(installCommand, { shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/bash' }, (installError, stdout, stderr) => {
            if (installError) {
                vscode.window.showErrorMessage('Failed to install dependencies.');
                outputChannel.appendLine(`❌ Error: ${stderr}`);
                reject(installError);
                return;
            }

            outputChannel.appendLine("✅ Dependencies installed successfully.");
            statusBar.text = "✅ SDK Installation Complete";
            resolve();
        });
    });
}
