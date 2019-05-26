import * as fs from 'fs';
import * as vscode from 'vscode';
import { ExecutableNode } from '../ExecutableNode';
import { NodeType } from '../NodeType';
import { NodeExecuter } from '../executer';
import { CodeUtilProvider } from '../CodeUtilProvider';
import { Json2ExcelNode } from './Json2ExcelNode';

export class Json2ExcelNodeConfig extends ExecutableNode {

  private _descUseJsonFolderPath = false;
  public get descUseJsonFolderPath() {
    return this._descUseJsonFolderPath;
  }
  public set descUseJsonFolderPath(value) {
    this._descUseJsonFolderPath = value;
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
    private parentNode: Json2ExcelNode
  ) {
    super(label, tip, vscode.TreeItemCollapsibleState.None, NodeType.Map2ParentConfig, executer, parentNode);
  }

  get description() : string {
    if (this.descUseJsonFolderPath) {
      return String(this.parentNode!.jsonFileFolderPath);
    } else if (this.descUseOutputPath) {
      return String(this.parentNode!.outputFilePath);
    }
    return '';
  }

  public setJsonFileFolderPath(filePath: fs.PathLike) {
    this._descUseJsonFolderPath = true;
    this.parentNode.jsonFileFolderPath = filePath;
  }

  public setExcelOutputPath(filePath: fs.PathLike) {
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
