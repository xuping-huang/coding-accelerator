import { PathLike } from 'fs';
import * as vscode from 'vscode';
import { ExecutableNode } from '../ExecutableNode';
import { CodeNode } from '../CodeNode';
import { NodeType } from '../NodeType';
import { CodeUtilProvider } from '../CodeUtilProvider';
import { Excel2JsonExecuter } from '../../executer/Excel2JsonExecuter';

export class Excel2JsonNode extends ExecutableNode {
  private _excelFilePath: PathLike | undefined = undefined;
  public get excelFilePath(): PathLike | undefined  {
    return this._excelFilePath;
  }
  public set excelFilePath(value: PathLike | undefined ) {
    this._excelFilePath = value;
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
    executer: Excel2JsonExecuter,
    parent?: CodeNode
  ) {
    super(label, tip, vscode.TreeItemCollapsibleState.Collapsed, NodeType.Excel2Json, executer, parent);
  }

  async execute(provider: CodeUtilProvider) {
    if (!this.excelFilePath || !this.outputFilePath) {
      vscode.window.showErrorMessage('Excel file path or Json output path not defined.');
      return;
    }
    await this.executer.run(this.excelFilePath, this.outputFilePath);
    provider.refresh();
  }

}
