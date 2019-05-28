import * as vscode from 'vscode';
import * as _ from 'lodash';
import { NodeExecuter } from "../Executer";

export class PickSingleExecuter implements NodeExecuter {
  constructor(private picks: string[], private receiveFunName: string|undefined) {

  }

  async run(node: any): Promise<void> {
    const selected = await vscode.window.showQuickPick(this.picks, {canPickMany: false});
    if (!_.isNil(selected)) {
      if (this.receiveFunName && _.isFunction(node[this.receiveFunName])) {
        node[this.receiveFunName](selected);
      }
		}
  }
}
