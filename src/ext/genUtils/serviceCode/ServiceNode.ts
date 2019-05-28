import * as vscode from 'vscode';
import { NodeType } from '../NodeType';
import { GenNode } from '../GenNode';
import { NodeExecuter } from '../../Executer';
import { GenerateCodeProvider } from '../GenerateCodeProvider';

export class ServiceNode extends GenNode {
  constructor(
    public readonly label: string,
    tip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly nodeType: NodeType,
    protected executer: NodeExecuter,
    protected parent?: GenNode
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

  private _swaggerPath: string = '';
  setSwaggerPath(swaggerPath: string) {
    this._description = swaggerPath;
    this._swaggerPath = swaggerPath;
  }
  get swaggerPath() {
    return this._swaggerPath;
  }

  private _projectName: string = '';
  setProjectName(name: string) {
    this._description = name;
    this._projectName = name;
  }
  get projectName() {
    return this._projectName;
  }

  async execute(provider: GenerateCodeProvider) {
    if (this.executer) {
      await this.executer.run(this, provider);
      provider.refresh();
    }
  }

  setOperationId(operationId: string) {
    this._description = operationId;
    if (this.parent) {
      this.parent.operationId = operationId;
    }
  }
}
