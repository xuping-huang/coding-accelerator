
import * as path from 'path';
import * as vscode from 'vscode';
import * as _ from 'lodash';
import { NodeType, NodeName } from './NodeType';
import { BaseNode } from '../BaseNode';

export class CodeNode extends BaseNode {
  constructor(
    public readonly label: string,
    tip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly nodeType: NodeType,
    protected parent?: CodeNode
  ) {
    super(label, tip, collapsibleState, parent);
    this._tip = tip;
    this.iconPath = this.initIconPath(nodeType);
    this.contextValue = this.initContextValue(nodeType);
  }

  /**
   * Return iconPath by NodeType
   */
  initIconPath(nodeType: NodeType): any {
    let iconPath = {
      light: path.join(__filename, '../../../../media/light/setting.svg'),
      dark: path.join(__filename, '../../../../media/dark/setting.svg'),
    };
    switch(nodeType) {
      case NodeType.PasteUtilFolder:
        iconPath = {
          light: path.join(__filename, '../../../../media/light/pasteFolder.svg'),
          dark: path.join(__filename, '../../../../media/dark/pasteFolder.svg'),
        };
        break;
      case NodeType.OtherUtilFolder:
        iconPath = {
          light: path.join(__filename, '../../../../media/light/otherFolder.svg'),
          dark: path.join(__filename, '../../../../media/dark/otherFolder.svg'),
        };
        break;
      case NodeType.Excel2Json:
      case NodeType.Json2Excel:
      case NodeType.PasteUtilItem:
        iconPath = {
          light: path.join(__filename, '../../../../media/light/tool.svg'),
          dark: path.join(__filename, '../../../../media/dark/tool.svg'),
        };
        break;
    }
    return iconPath;
  }

  /**
   * Return contextValue by NodeType
   */
  initContextValue(nodeType: NodeType): string {
    const returnValue = _.get(NodeName, NodeType[nodeType]) ? _.get(NodeName, NodeType[nodeType]) : 'code_node';
    return returnValue;
  }
}
