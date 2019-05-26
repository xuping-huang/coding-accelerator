
import * as path from 'path';
import * as vscode from 'vscode';
import * as _ from 'lodash';
import { NodeType, NodeName } from './NodeType';
import * as helper from '../../lib/helper';

export class CodeNode extends vscode.TreeItem {
  private _description: string = '';
  private _tip: string = '';

  constructor(
    public readonly label: string,
    tip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly nodeType: NodeType,
    protected parent?: CodeNode
  ) {
    super(label, collapsibleState);
    this._tip = tip;
    this.iconPath = this.initIconPath(nodeType);
    this.contextValue = this.initContextValue(nodeType);
  }

  get tooltip(): string {
    return this._tip;
  }

  get description(): string {
    return this._description;
  }

  /**
   * isSwitchOn
   *
   * Used to control whether the tool is in effect.
   * The condition for entry into force is that the tool itself node and all parent node switches are turned on.
   */
  private _isSwitchOn: boolean = false;
  public get isSwitchOn(): boolean {
    return this._isSwitchOn;
  }
  public set isSwitchOn(value: boolean) {
    this._isSwitchOn = value;
  }

  get isActive(): boolean {
    const parentSwitch = this.parent ? this.parent.isSwitchOn : true;
    return parentSwitch && this.isSwitchOn;
  }
  switchToggle(): void {
    this.isSwitchOn = !this.isSwitchOn;
    this.contextValue = helper.switchChangeContextValue(this.contextValue, this.isSwitchOn);
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
