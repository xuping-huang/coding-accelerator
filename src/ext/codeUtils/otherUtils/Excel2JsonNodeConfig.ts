import * as fs from 'fs';
import * as vscode from 'vscode';
import { Excel2JsonNode } from './Excel2JsonNode';
import { ExecutableNode } from '../ExecutableNode';
import { NodeType } from '../NodeType';
import { NodeExecuter } from '../../Executer';
import { CodeUtilProvider } from '../CodeUtilProvider';

export class Excel2JsonConfigNode extends ExecutableNode {

  private _descUseExcelPath = false;
  public get descUseExcelPath() {
    return this._descUseExcelPath;
  }
  public set descUseExcelPath(value) {
    this._descUseExcelPath = value;
  }
  private _descUseOutputPath = false;
  public get descUseOutputPath() {
    return this._descUseOutputPath;
  }
  public set descUseOutputPath(value) {
    this._descUseOutputPath = value;
  }

  constructor(
    label: string,
    tip: string,
    executer: NodeExecuter,
    private parentNode: Excel2JsonNode
  ) {
    super(label, tip, vscode.TreeItemCollapsibleState.None, NodeType.Map2ParentConfig, executer, parentNode);
  }

  get description() : string {
    if (this._descUseExcelPath) {
      return String(this.parentNode!.excelFilePath);
    } else if (this._descUseOutputPath) {
      return String(this.parentNode!.outputFilePath);
    }
    return '';
  }

  public setExcelFilePath(filePath: fs.PathLike) {
    this._descUseExcelPath = true;
    this.parentNode.excelFilePath = filePath;
  }

  public setJsonOutputPath(filePath: fs.PathLike) {
    this._descUseOutputPath = true;
    this.parentNode.outputFilePath = filePath;
  }

  async execute(provider: CodeUtilProvider) {
    if (this.executer) {
      await this.executer.run(this);
      provider.refresh();
    }
  }
}
