import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export async function generateConfigFile(
    rootPath: string,
    username: string,
    accessKey: string,
    isAppAutomate: boolean,
    outputChannel: vscode.OutputChannel
) {
    const configFilePath = path.join(rootPath, 'browserstack.yml');

    outputChannel.append("📄 Generating browserstack.yml file...");

    let configData = `userName: ${username}\naccessKey: ${accessKey}\nframework: python\n`;

    if (isAppAutomate) {
        // App Automate Configuration
        configData += `app: bs://sample.app\n`;
        configData += `platforms:\n`;
        configData += `  - platformName: android\n    deviceName: Samsung Galaxy S22 Ultra\n    platformVersion: 12.0\n`;
        configData += `  - platformName: android\n    deviceName: Google Pixel 7 Pro\n    platformVersion: 13.0\n`;
        configData += `  - platformName: android\n    deviceName: OnePlus 9\n    platformVersion: 11.0\n`;
        configData += `browserstackLocal: true\n`;
        configData += `buildName: browserstack-build-1\n`;
        configData += `projectName: BrowserStack Sample\n`;
    } else {
        // Automate Configuration (Modify as per your existing setup)
        configData += `platforms:\n`;
        configData += `  - browser: chrome\n    browserVersion: latest\n    os: Windows\n    osVersion: 10\n`;
        configData += `  - browser: firefox\n    browserVersion: latest\n    os: Windows\n    osVersion: 10\n`;
        configData += `  - browser: edge\n    browserVersion: latest\n    os: Windows\n    osVersion: 10\n`;
        configData += `browserstackLocal: false\n`;
        configData += `buildName: browserstack-build-1\n`;
        configData += `projectName: BrowserStack Sample\n`;
    }

    // Writing to the file
    fs.writeFileSync(configFilePath, configData);

    outputChannel.append("\r✅ browserstack.yml file created successfully!\n");
}
