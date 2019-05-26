
import * as vscode from 'vscode';
import { PasteNode } from './PasteNode';
import { NodeType } from '../NodeType';
import { CodeUtilProvider } from '../CodeUtilProvider';
import { ExecutableNode } from '../ExecutableNode';
import { NodeExecuter } from '../executer';

export class PasteConfigNode extends ExecutableNode {
  constructor(
    private parentNode: PasteNode,
    executer: NodeExecuter
  ) {
    super('config file', 'config file', vscode.TreeItemCollapsibleState.None, NodeType.PasteUtilItemConfig, executer, parentNode);
  }

  get description() : string {
    return String(this.parentNode!.configFilePath);
  }

  setConfigPath(filePath: string) {
    this.parentNode.configFilePath = filePath;
  }

  async execute(provider: CodeUtilProvider) {
    if (this.executer) {
      await this.executer.run(this);
      provider.refresh();
    }
  }
}
