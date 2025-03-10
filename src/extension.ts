import * as vscode from 'vscode';
import { createVirtualEnv } from './venvManager';
import { installSDK } from './sdkInstaller';
import { generateConfigFile } from './configGenerator';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('browserstack.createConfig', async () => {
        const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        statusBar.show();
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a folder in your workspace.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const venvPath = `${rootPath}/.venv`;
        const configFilePath = `${rootPath}/browserstack.yml`;

        // Create Output Channel
        const outputChannel = vscode.window.createOutputChannel("BrowserStack");
        outputChannel.show(true); // Open Output Channel immediately
        outputChannel.appendLine("🚀 Starting BrowserStack setup...\n");

        // Step 1: Collect Credentials First
        const username = await vscode.window.showInputBox({ prompt: 'Enter your BrowserStack username' });
        if (!username) {
            vscode.window.showErrorMessage('Username is required.');
            return;
        }

        const accessKey = await vscode.window.showInputBox({ prompt: 'Enter your BrowserStack access key', password: true });
        if (!accessKey) {
            vscode.window.showErrorMessage('Access key is required.');
            return;
        }

  
    const product = await vscode.window.showQuickPick(['Automate', 'App Automate'], {
        placeHolder: 'Select the BrowserStack product to configure',
    });

    if (!product) {
        vscode.window.showErrorMessage('Product selection is required.');
        return;
    }

    const isAppAutomate = product === 'App Automate';

    outputChannel.appendLine(`📁 Workspace Path: ${rootPath}`);
    outputChannel.appendLine(`🐍 Virtual Environment Path: ${venvPath}`);
    outputChannel.appendLine(`🔍 Selected Product: ${product}`);

    // Step 3: Create virtual environment
    await createVirtualEnv(venvPath, outputChannel, statusBar);

    // Step 4: Install SDKs based on product selection
    await installSDK(venvPath, isAppAutomate, outputChannel, statusBar);

    // Step 5: Generate the browserstack.yml configuration file
    await generateConfigFile(rootPath, username, accessKey, isAppAutomate, outputChannel);
    // outputChannel.appendLine("✅ browserstack.yml file created successfully!\n");

    // Display the final run command
    const activateCmd = process.platform === 'win32'
        ? `${venvPath}\\Scripts\\activate`
        : `source ${venvPath}/bin/activate`;

    outputChannel.appendLine("\n🚀 Setup Complete! You can run your tests using:");
    outputChannel.appendLine(`  ${activateCmd} && python your_test_script.py`);

    // statusBar.text = "✅ Setup Complete!";
    outputChannel.appendLine("\n🚀 **Run your tests using:**");
    // outputChannel.appendLine(runCommand);
    outputChannel.appendLine("\n🎉 Setup complete! Happy Testing! 🚀");

    vscode.window.showInformationMessage('BrowserStack setup complete! Check the "BrowserStack" Output panel for the next steps.');
});

context.subscriptions.push(disposable);

}

export function deactivate() {}
