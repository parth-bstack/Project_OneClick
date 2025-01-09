# BrowserStack VS Code Extension

This extension simplifies integrating the BrowserStack SDK with Python-based frameworks. It helps create a `browserstack.yml` configuration file and sets up everything needed for seamless BrowserStack integration in your projects.

## Installation and Usage Guide

Follow these steps to clone the repository, set up the extension, and start using it:

---

### Step 1: Clone the Repository
Begin by cloning this repository to your local machine using the following command:

```
git clone <repository-url>
```
Replace <repository-url> with the actual URL of this repository.

### Step 2: Install Dependencies
Navigate to the cloned repository's folder and install the required dependencies using npm:

```
cd <repository-folder>
npm install
```

This installs all the necessary packages for the extension.
<b>
### Step 3: Compile the Extension
Compile the extension's TypeScript code to JavaScript. Run the following command:

```
npm run compile
```
This ensures that all TypeScript files are properly transpiled.
<b>
### Step 4: Launch the Extension
To launch the extension:

Press Fn + F5 (or just F5 on some systems) to start the debugger in VS Code.

In the debugging menu, select any available debugger (e.g., "Extension").
A new VS Code window will open, running your extension in debug mode.

### Step 5: Open a Folder with Python Code
In the newly opened VS Code window:

Click on File > Open Folder.


Select a folder containing your Python code files.


Note: Open the folder such that it directly contains the code files (avoid navigating using the terminal cd command after opening).

### Step 6: Open the Command Palette
Press the following keys to open the Command Palette in VS Code:

On macOS: Cmd + Shift + P 

On Windows/Linux: Ctrl + Shift + P

### Step 7: Run the Command
In the Command Palette, search for the following command:

```
Create BrowserStack Configuration
```
Select the command to initialize the BrowserStack SDK configuration process. Follow the on-screen prompts to set up the browserstack.yml file and complete the setup.

### Features
Automates the creation of browserstack.yml files.


Simplifies SDK installation for Python frameworks.


Helps you quickly integrate with BrowserStack products.

### Requirements
Node.js: Ensure you have Node.js installed on your system.


VS Code: Install Visual Studio Code to use this extension.
