import * as vscode from 'vscode';
import { NodeType } from '../NodeType';
import { GenNode } from '../GenNode';
import { GenerateCodeProvider } from '../GenerateCodeProvider';
import { NodeExecuter } from '../../Executer';
import { FrameConfigNode } from './FrameConfigNode';

export class FrameConfigItemNode extends GenNode {
  constructor(
    public readonly label: string,
    protected executer: NodeExecuter,
    protected parent?: FrameConfigNode
  ) {
    super(label, label, vscode.TreeItemCollapsibleState.None, NodeType.FrameCodeConfigurationItem, parent);
  }

  async execute(provider: GenerateCodeProvider) {
    if (this.executer) {
      await this.executer.run(this);
      provider.refresh();
    }
  }

  setProjectName(name: string) {
    this._description = name;
    if (this.parent) {
      this.parent.projectName = name;
    }
  }

  setLanguage(name: string) {
    this._description = name;
    if (this.parent) {
      this.parent.language = name;
    }
  }

  setDatabase(name: string) {
    this._description = name;
    if (this.parent) {
      this.parent.database = name;
    }
  }
}
