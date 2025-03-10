import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export async function createVirtualEnv(venvPath: string, outputChannel: vscode.OutputChannel, statusBar: vscode.StatusBarItem) {
    if (fs.existsSync(venvPath)) {
        outputChannel.appendLine("✅ Virtual environment already exists.");
        return;
    }

    outputChannel.appendLine("⚙️ Creating virtual environment...");
    statusBar.text = "⚙️ Creating Virtual Environment...";

    return new Promise<void>((resolve, reject) => {
        const command = process.platform === 'win32'
            ? `python -m venv "${venvPath}"`
            : `python3 -m venv "${venvPath}"`;

        cp.exec(command, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage('Failed to create virtual environment.');
                outputChannel.appendLine(`❌ Error: ${stderr}`);
                reject(error);
                return;
            }

            outputChannel.appendLine("✅ Virtual environment created successfully.");
            statusBar.text = "✅ Virtual Environment Ready";

            // 🔹 Auto-activate the virtual environment in the VS Code terminal
            activateVirtualEnv(venvPath, outputChannel);

            resolve();
        });
    });
}

export function activateVirtualEnv(venvPath: string, outputChannel: vscode.OutputChannel) {
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Virtual Environment");

    const activateCommand = process.platform === 'win32'
        ? `"${path.join(venvPath, 'Scripts', 'activate')}"` // Windows activation
        : `source "${path.join(venvPath, 'bin', 'activate')}"`; // macOS/Linux activation

    outputChannel.appendLine(`🔹 Activating virtual environment: ${activateCommand}`);
    terminal.sendText(activateCommand);
    // terminal.show();
}
