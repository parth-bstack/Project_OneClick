import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

export function createConfigFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('Please open a folder in your workspace.');
        return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const configFilePath = path.join(rootPath, 'browserstack.yml');
    const venvPath = path.join(rootPath, '.venv');  // Virtual environment in the workspace folder

    // Log the path of the virtual environment
    console.log('Workspace Path:', rootPath);
    console.log('Virtual Environment Path:', venvPath);

    // Step 1: Check if virtual environment exists
    if (!fs.existsSync(venvPath)) {
        vscode.window.showInformationMessage('Creating virtual environment...');
        cp.exec(`python3 -m venv "${venvPath}"`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage('Failed to create virtual environment. Please check your Python installation.');
                console.error(`Error creating venv: ${stderr}`);
                return;
            }

            vscode.window.showInformationMessage('Virtual environment created successfully.');
            installBrowserStackSDK(venvPath, configFilePath);
        });
    } else {
        vscode.window.showInformationMessage('Virtual environment already exists. Checking if BrowserStack SDK is installed...');
        checkAndInstallSDK(venvPath, configFilePath);
    }
}

function checkAndInstallSDK(venvPath: string, configFilePath: string) {
    // Check if browserstack-sdk is installed
    const activateCommand = process.platform === 'win32'
        ? path.join(venvPath, 'Scripts', 'activate.bat')
        : path.join(venvPath, 'bin', 'activate');

    const checkCommand = process.platform === 'win32'
        ? `"${activateCommand}" && pip show browserstack-sdk`
        : `source "${activateCommand}" && pip show browserstack-sdk`;

    cp.exec(checkCommand, (error, stdout, stderr) => {
        if (error || stderr) {
            // SDK is not installed, proceed with installation
            vscode.window.showInformationMessage('BrowserStack SDK not found. Installing...');
            installBrowserStackSDK(venvPath, configFilePath);
        } else {
            vscode.window.showInformationMessage('BrowserStack SDK is already installed.');
            promptForCredentials(configFilePath);
        }
    });
}

function installBrowserStackSDK(venvPath: string, configFilePath: string) {
    // Install BrowserStack SDK
    const activateCommand = process.platform === 'win32'
        ? path.join(venvPath, 'Scripts', 'activate.bat')
        : path.join(venvPath, 'bin', 'activate');

    const installCommand = process.platform === 'win32'
        ? `"${activateCommand}" && pip install browserstack-sdk`
        : `source "${activateCommand}" && pip install browserstack-sdk`;

    cp.exec(installCommand, (installError, installStdout, installStderr) => {
        if (installError) {
            vscode.window.showErrorMessage('Failed to install BrowserStack SDK. Please check your Python and pip installation.');
            console.error(`Error installing SDK: ${installStderr}`);
            return;
        }

        vscode.window.showInformationMessage('BrowserStack SDK installed successfully.');
        promptForCredentials(configFilePath);
    });
}

function promptForCredentials(configFilePath: string) {
    // Prompt the user for BrowserStack credentials (username and access key)
    vscode.window.showInputBox({ placeHolder: 'Enter your BrowserStack Username' }).then(username => {
        if (!username) {
            vscode.window.showErrorMessage('Username is required.');
            return;
        }

        vscode.window.showInputBox({ placeHolder: 'Enter your BrowserStack Access Key', password: true }).then(accessKey => {
            if (!accessKey) {
                vscode.window.showErrorMessage('Access Key is required.');
                return;
            }

            // Create browserstack.yml file with the user's credentials
            const configContent = `userName: ${username}
accessKey: ${accessKey}
platforms:
  - os: Windows
    osVersion: 10
    browserName: Chrome
    browserVersion: 120.0
  - os: OS X
    osVersion: Monterey
    browserName: Safari
    browserVersion: 15.6
  - deviceName: iPhone 13
    osVersion: 15
    browserName: Chromium
    deviceOrientation: portrait
browserstackLocal: true
buildName: bstack-demo
buildIdentifier: \${BUILD_NUMBER}
projectName: BrowserStack Sample
debug: true
networkLogs: true
consoleLogs: info`;

            fs.writeFile(configFilePath, configContent, (err) => {
                if (err) {
                    vscode.window.showErrorMessage('Failed to create the browserstack.yml file.');
                    console.error(err);
                    return;
                }
                vscode.window.showInformationMessage('browserstack.yml file created successfully!');
            });
        });
    });
}
