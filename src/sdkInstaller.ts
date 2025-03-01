// // sdkInstaller.ts
// import * as cp from 'child_process';
import * as path from 'path';
// import * as vscode from 'vscode';

// export function installSDK(venvPath: string, callback: (error: Error | null) => void) {
//     const activateCommand = process.platform === 'win32'
//         ? path.join(venvPath, 'Scripts', 'activate.bat')
//         : path.join(venvPath, 'bin', 'activate');

//     const installCommand = process.platform === 'win32'
//         ? `"${activateCommand}" && pip install browserstack-sdk`
//         : `source "${activateCommand}" && pip install browserstack-sdk`;

//         vscode.window.showInformationMessage('Installing BrowserStack SDK...');

//     cp.exec(installCommand, { shell: '/bin/bash' }, (error, stdout, stderr) => {
//         if (error) {
//             console.log("INSIDE ERROR OF INSTALL")
//             vscode.window.showErrorMessage('Failed to install BrowserStack SDK. Please check your Python and pip installation.');
//             console.error(`Error installing SDK: ${stderr}`);
//             callback(error);
//         } else {
//             console.log("after exec command")
//             vscode.window.showInformationMessage('BrowserStack SDK installed successfully.');
//             callback(null);
//         }
//     });
// }


import * as vscode from 'vscode';
import * as cp from 'child_process';

export function installBrowserStackSDK(venvPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const activateCommand = process.platform === 'win32'
            ? `"${venvPath}\\Scripts\\activate.bat"`
            : `source "${venvPath}/bin/activate"`;

        const installCommand = process.platform === 'win32'
            ? `${activateCommand} && pip install browserstack-sdk`
            : `${activateCommand} && pip install browserstack-sdk`;

        vscode.window.showInformationMessage('Installing BrowserStack SDK...');
        cp.exec(installCommand, { shell: '/bin/bash' }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage('Failed to install BrowserStack SDK.');
                console.error(`SDK Install Error: ${stderr}`);
                reject(error);
                return;
            }
            vscode.window.showInformationMessage('BrowserStack SDK installed successfully.');
            resolve();
        });
    });
}
