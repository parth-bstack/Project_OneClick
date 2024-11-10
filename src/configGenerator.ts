// configGenerator.ts
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function createConfigFile(rootPath: string, userName: string, accessKey: string) {
    const configFilePath = path.join(rootPath, 'browserstack.yml');
    const configContent = `userName: ${userName}
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
}
