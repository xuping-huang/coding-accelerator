import * as vscode from 'vscode';
import { CodeNode } from '../CodeNode';
import { NodeType } from '../NodeType';
import { PathLike } from 'fs';
import { CodeParser } from './Paster';
import { CodeConvertor } from './Converter';

export class PasteNode extends CodeNode {
  private _configFilePath: PathLike | undefined = undefined;
  public get configFilePath(): PathLike | undefined  {
    return this._configFilePath;
  }
  public set configFilePath(value: PathLike | undefined ) {
    this._configFilePath = value;
  }

  constructor(
    label: string,
    tip: string,
    private parser: CodeParser,
    private convertor: CodeConvertor,
    parent?: CodeNode,
    public needSubNode: boolean = false
  ) {
    super(label, tip, vscode.TreeItemCollapsibleState.Collapsed, NodeType.PasteUtilItem, parent);
  }

  match (content: string): boolean {
    return this.parser.match(content);
  }

  convert (content: string, node: PasteNode): string|undefined {
    const table = this.parser.parse(content, node);
    return this.convertor.convert(table, node);
  }
}
