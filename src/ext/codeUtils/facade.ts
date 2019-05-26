import * as vscode from 'vscode';
import { CodeUtilProvider } from './CodeUtilProvider';
import { CodeNode } from './CodeNode';
import { ExecutableNode } from './ExecutableNode';
// import { CodeNode } from './CodeNode';
// import { PasteConfigNode } from './pasteUtils/PasteConfigNode';


export function registerCodeUtils( context: vscode.ExtensionContext){
  const codeUtilProvider = new CodeUtilProvider(context);
  vscode.window.registerTreeDataProvider('codeUtils', codeUtilProvider);
  const toggleSwitch = (node: CodeNode) => {
    node.switchToggle();
    codeUtilProvider.refresh();
  };

  vscode.commands.registerCommand('codeUtils.nodeToggleOn', toggleSwitch);
  vscode.commands.registerCommand('codeUtils.nodeToggleOff', toggleSwitch);

  vscode.commands.registerCommand("node.execute", (node: ExecutableNode) => {
    node.execute(codeUtilProvider);
  });
  vscode.commands.registerCommand("config.property.setting", (node: ExecutableNode) => {
    node.execute(codeUtilProvider);
  });

  // Copy & Paste
  vscode.commands.registerCommand('clipboard.paste', async () => {
    const content = await codeUtilProvider.pastePreProcess();
    await vscode.commands.executeCommand("editor.action.clipboardPasteAction");
    if (content) {
      await codeUtilProvider.pastePostProcess(content);
    }
  });

}
