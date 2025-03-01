import * as vscode from 'vscode';
import { createVirtualEnv } from './venvManager';
import { installBrowserStackSDK } from './sdkInstaller';
import { generateConfigFile } from './configGenerator';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('browserstack.createConfig', async () => {
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

        // Step 2: Create Virtual Environment
        outputChannel.append("🔄 Creating virtual environment...");
        await createVirtualEnv(venvPath);
        outputChannel.append("\r✅ Virtual environment setup complete.\n");

        // Step 3: Install BrowserStack SDK (Long Process)
        outputChannel.append("🔄 Installing BrowserStack SDK (this may take a few minutes)...");
        await installBrowserStackSDK(venvPath);
        outputChannel.append("\r✅ BrowserStack SDK installed successfully.\n");

        // Step 4: Generate browserstack.yml
        outputChannel.append("🔄 Generating browserstack.yml configuration file...");
        await generateConfigFile(configFilePath, username, accessKey);
        outputChannel.append("\r✅ browserstack.yml file created.\n");

        // Step 5: Show the run command
        const runCommand = process.platform === 'win32'
            ? `cd ${rootPath} && .venv\\Scripts\\activate && browserstack-sdk run`
            : `cd ${rootPath} && source .venv/bin/activate && browserstack-sdk run`;

        outputChannel.appendLine("\n🚀 **Run your tests using:**");
        outputChannel.appendLine(runCommand);
        outputChannel.appendLine("\n🎉 Setup complete! Happy Testing! 🚀");

        vscode.window.showInformationMessage('BrowserStack setup complete! Check the "BrowserStack" Output panel for the next steps.');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}


// import * as vscode from 'vscode';
// import { createVirtualEnv } from './venvManager';
// import { installBrowserStackSDK } from './sdkInstaller';
// import { generateConfigFile } from './configGenerator';

// export function activate(context: vscode.ExtensionContext) {
//     let disposable = vscode.commands.registerCommand('browserstack.createConfig', async () => {
//         const workspaceFolders = vscode.workspace.workspaceFolders;
//         if (!workspaceFolders) {
//             vscode.window.showErrorMessage('Please open a folder in your workspace.');
//             return;
//         }

//         const rootPath = workspaceFolders[0].uri.fsPath;
//         const venvPath = `${rootPath}/.venv`;
//         const configFilePath = `${rootPath}/browserstack.yml`;

//         // Create Output Channel
//         const outputChannel = vscode.window.createOutputChannel("BrowserStack");
//         outputChannel.show(true);
//         outputChannel.appendLine("🚀 Starting BrowserStack setup...\n");

//         // Create a Status Bar Item
//         const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
//         statusBar.text = "🚀 Setting up BrowserStack...";
//         statusBar.show();

//         // Step 1: Collect Credentials
//         const username = await vscode.window.showInputBox({ prompt: 'Enter your BrowserStack username' });
//         if (!username) {
//             vscode.window.showErrorMessage('Username is required.');
//             statusBar.dispose();
//             return;
//         }

//         const accessKey = await vscode.window.showInputBox({ prompt: 'Enter your BrowserStack access key', password: true });
//         if (!accessKey) {
//             vscode.window.showErrorMessage('Access key is required.');
//             statusBar.dispose();
//             return;
//         }

//         // Spinner Animation for Console
//         const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
//         let spinnerIndex = 0;
//         let spinnerInterval: NodeJS.Timeout;

//         function startSpinner(text: string) {
//             outputChannel.append(`${spinnerFrames[spinnerIndex]} ${text}`);
//             spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
//             spinnerInterval = setInterval(() => {
//                 outputChannel.clear();
//                 outputChannel.append(`${spinnerFrames[spinnerIndex]} ${text}`);
//                 spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
//             }, 100);
//         }

//         function stopSpinner(successText: string) {
//             clearInterval(spinnerInterval);
//             outputChannel.clear();
//             outputChannel.appendLine(`✅ ${successText}`);
//         }

//         // Step 2: Create Virtual Environment
//         statusBar.text = "🐍 Setting up Virtual Environment...";
//         startSpinner("Creating virtual environment...");
//         await createVirtualEnv(venvPath);
//         stopSpinner("Virtual environment setup complete.");

//         // Step 3: Install BrowserStack SDK
//         statusBar.text = "📦 Installing BrowserStack SDK...";
//         startSpinner("Installing BrowserStack SDK (this may take time)...");
//         await installBrowserStackSDK(venvPath);
//         stopSpinner("BrowserStack SDK installed successfully.");

//         // Step 4: Generate Configuration File
//         statusBar.text = "📝 Generating Configuration...";
//         startSpinner("Generating browserstack.yml file...");
//         await generateConfigFile(configFilePath, username, accessKey);
//         stopSpinner("browserstack.yml file created.");

//         // Step 5: Show the Run Command
//         statusBar.text = "✅ Setup Complete!";
//         const runCommand = process.platform === 'win32'
//             ? `cd ${rootPath} && .venv\\Scripts\\activate && browserstack-sdk run`
//             : `cd ${rootPath} && source .venv/bin/activate && browserstack-sdk run`;

//         outputChannel.appendLine("\n🚀 **Run your tests using:**");
//         outputChannel.appendLine(runCommand);
//         outputChannel.appendLine("\n🎉 Setup complete! Happy Testing! 🚀");

//         vscode.window.showInformationMessage('BrowserStack setup complete! Check the "BrowserStack" Output panel for the next steps.');

//         // Cleanup: Remove status bar after a few seconds
//         setTimeout(() => statusBar.dispose(), 5000);
//     });

//     context.subscriptions.push(disposable);
// }

// export function deactivate() {}
