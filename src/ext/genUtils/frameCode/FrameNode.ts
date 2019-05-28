import * as vscode from 'vscode';
import * as _ from 'lodash';
import { NodeType } from '../NodeType';
import { BaseNode } from '../../BaseNode';
import { GenNode } from '../GenNode';
import { NodeExecuter } from '../../Executer';
import { GenerateCodeProvider } from '../GenerateCodeProvider';
import { TemplateMap } from './framConstant';

export class FrameNode extends GenNode {
  constructor(
    public readonly label: string,
    tip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly nodeType: NodeType,
    protected executer: NodeExecuter,
    protected parent?: BaseNode
  ) {
    super(label, tip, collapsibleState, nodeType, parent);
  }

  private _homePath: string = '';
  setHomePath(homePath: string) {
    this._description = homePath;
    this._homePath = homePath;
  }
  get homePath() {
    return this._homePath;
  }

  private _outputPath: string = '';
  setOutputPath(outputPath: string) {
    this._description = outputPath;
    this._outputPath = outputPath;
  }
  get outputPath() {
    return this._outputPath;
  }

  private _switchTemplate: string = '';
  setSwitchTemplate(name: string) {
    this._description = name;
    this._switchTemplate = name;
  }
  get switchTemplate() {
    return this._switchTemplate;
  }
  getSelectedTemplateName(): string {
    const map: any = TemplateMap;
    if (!map[this.switchTemplate]) {
      return TemplateMap.default;
    }
    return map[this.switchTemplate]
  }

  async execute(provider: GenerateCodeProvider) {
    if (this.executer) {
      await this.executer.run(this, provider);
      provider.refresh();
    }
  }
}
