import * as vscode from 'vscode';
import * as fs from 'fs';

export function generateConfigFile(configFilePath: string, username: string, accessKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
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
                vscode.window.showErrorMessage('Failed to create browserstack.yml file.');
                console.error(`Config File Error: ${err}`);
                reject(err);
                return;
            }
            vscode.window.showInformationMessage('browserstack.yml file created successfully!');
            resolve();
        });
    });
}
