import * as vscode from 'vscode';

export class ButtonPanelProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'browserstack.buttonPanel';  // Ensure this matches the ID in package.json

    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): void {
        this._view = webviewView;

        // Set the HTML content for the webview (button HTML)
        webviewView.webview.html = this.getWebviewContent();

        // Listen for messages from the webview
        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'createConfig':
                    vscode.commands.executeCommand('browserstack.createConfig');  // Trigger the createConfig command when the button is clicked
                    return;
            }
        });
    }

    private getWebviewContent() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BrowserStack Config Button</title>
            </head>
            <body>
                <button id="createConfigBtn">Create BrowserStack Config</button>

                <script>
                    const vscode = acquireVsCodeApi();
                    document.getElementById('createConfigBtn').addEventListener('click', () => {
                        vscode.postMessage({ command: 'createConfig' });
                    });
                </script>
            </body>
            </html>
        `;
    }
}
