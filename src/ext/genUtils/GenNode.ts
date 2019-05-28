import { GenerateCodeProvider } from './GenerateCodeProvider';
import { Executable } from './../Executable';

import * as path from 'path';
import * as vscode from 'vscode';
import * as _ from 'lodash';
import * as helper from '../../lib/helper';
import { NodeType, NodeName } from './NodeType';
import { BaseNode } from '../BaseNode';
import { ModelPropertyDefine, ModelDefine, PathDefine } from '../executer/SwaggerSelectExecuter';

export class GenNode extends BaseNode implements Executable, ModelPropertyDefine, ModelDefine, PathDefine{
  constructor(
    public readonly label: string,
    tip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly nodeType: NodeType,
    protected parent?: BaseNode
  ) {
    super(label, tip, collapsibleState, parent);
    this._tip = tip;
    this.iconPath = this.initIconPath(nodeType);
    this.contextValue = this.initContextValue(nodeType);
  }

  private _isKey: boolean = false;
  public get isKey(): boolean {
    return this._isKey;
  }
  public set isKey(value: boolean) {
    this._isKey = value;
  }
  keyToggle(provider: GenerateCodeProvider) {
    this.isKey = !this.isKey;
    this.contextValue = helper.switchChangeContextValue(this.contextValue, 'key', this.isKey);
    provider.refresh();
  }

  private _isForeignKey: boolean = false;
  public get isForeignKey(): boolean {
    return this._isForeignKey;
  }
  public set isForeignKey(value: boolean) {
    this._isForeignKey = value;
  }
  fkeyToggle(provider: GenerateCodeProvider) {
    this.isForeignKey = !this.isForeignKey;
    this.contextValue = helper.switchChangeContextValue(this.contextValue, 'fkey', this.isForeignKey);
    provider.refresh();
  }

  private _foreignModel: string = '';
  public get foreignModel(): string {
    return this._foreignModel;
  }
  public set foreignModel(value: string) {
    this._foreignModel = value;
  }
  setForeignModel(value: string) {
    this.setDescription(value);
    this.foreignModel = value;
    if (this.parent) {
      const theParent: any = this.parent;
      theParent.foreignModel = value;
    }
  }

  private _isRealModel: boolean = false;
  public get isRealModel(): boolean {
    return this._isRealModel;
  }
  public set isRealModel(value: boolean) {
    this._isRealModel = value;
  }
  modelToggle(provider: GenerateCodeProvider) {
    this.isRealModel = !this.isRealModel;
    this.contextValue = helper.switchChangeContextValue(this.contextValue, 'model', this.isRealModel);
    provider.refresh();
  }

  private _needPagination: boolean = true;
  public get needPagination(): boolean {
    return this._needPagination;
  }
  public set needPagination(value: boolean) {
    this._needPagination = value;
  }
  paginationToggle(provider: GenerateCodeProvider) {
    this.needPagination = !this.needPagination;
    this.contextValue = helper.switchChangeContextValue(this.contextValue, 'pagination', this.needPagination);
    provider.refresh();
  }

  private _pathName: string = '';
  public get pathName(): string {
    return this._pathName;
  }
  public set pathName(value: string) {
    this._pathName = value;
  }

  private _verbName: string = '';
  public get verbName(): string {
    return this._verbName;
  }
  public set verbName(value: string) {
    this._verbName = value;
  }

  private _operationId: string = '';
  public get operationId(): string {
    return this._operationId;
  }
  public set operationId(value: string) {
    this._operationId = value;
  }

  execute(_provider: vscode.TreeDataProvider<any>): void {
    throw new Error("Method not implemented.");
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
      case NodeType.FrameCodeGenUtil:
        iconPath = {
          light: path.join(__filename, '../../../../media/light/frameCode.svg'),
          dark: path.join(__filename, '../../../../media/dark/frameCode.svg'),
        };
        break;
      case NodeType.ServiceCodeGenUtil:
        iconPath = {
          light: path.join(__filename, '../../../../media/light/serviceCode.svg'),
          dark: path.join(__filename, '../../../../media/dark/serviceCode.svg'),
        };
        break;
    }
    return iconPath;
  }

  /**
   * Return contextValue by NodeType
   */
  initContextValue(nodeType: NodeType): string {
    const returnValue = _.get(NodeName, NodeType[nodeType]) ? _.get(NodeName, NodeType[nodeType]) : 'gen_node';
    return returnValue;
  }
}
