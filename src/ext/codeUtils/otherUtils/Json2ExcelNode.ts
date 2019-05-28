import { PathLike } from 'fs';
import * as vscode from 'vscode';
import { CodeNode } from '../CodeNode';
import { NodeType } from '../NodeType';
import { ExecutableNode } from '../ExecutableNode';
import { CodeUtilProvider } from '../CodeUtilProvider';
import { Json2ExcelExecuter } from '../../executer/Json2ExcelExecuter';

export class Json2ExcelNode extends ExecutableNode {
  private _jsonFileFolderPath: PathLike | undefined = undefined;
  public get jsonFileFolderPath(): PathLike | undefined  {
    return this._jsonFileFolderPath;
  }
  public set jsonFileFolderPath(value: PathLike | undefined ) {
    this._jsonFileFolderPath = value;
  }

  private _outputFilePath: PathLike | undefined = undefined;
  public get outputFilePath(): PathLike | undefined  {
    return this._outputFilePath;
  }
  public set outputFilePath(value: PathLike | undefined ) {
    this._outputFilePath = value;
  }

  constructor(
    label: string,
    tip: string,
    executer: Json2ExcelExecuter,
    parent?: CodeNode
  ) {
    super(label, tip, vscode.TreeItemCollapsibleState.Collapsed, NodeType.Json2Excel, executer, parent);
  }

  async execute(provider: CodeUtilProvider) {
    if (!this.jsonFileFolderPath || !this.outputFilePath) {
      vscode.window.showErrorMessage('Json file path or excel output path not defined.');
      return;
    }
    await this.executer.run(this.jsonFileFolderPath, this.outputFilePath);
    provider.refresh();
  }

}
