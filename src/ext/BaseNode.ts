
import * as vscode from 'vscode';
import * as helper from '../lib/helper';

export class BaseNode extends vscode.TreeItem {
  protected _description: string = '';
  protected _tip: string = '';

  constructor(
    public readonly label: string,
    tip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    protected parent?: BaseNode
  ) {
    super(label, collapsibleState);
    this._tip = tip;
  }

  get tooltip(): string {
    return this._tip;
  }

  get description(): string {
    return this._description;
  }

  setDescription(desc: string) {
    this._description = desc;
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
    this.contextValue = helper.switchChangeContextValue(this.contextValue, 'switchable', this.isSwitchOn);
  }
}
