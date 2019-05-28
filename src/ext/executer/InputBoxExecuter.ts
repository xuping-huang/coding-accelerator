import * as vscode from 'vscode';
import * as _ from 'lodash';
import { NodeExecuter } from "../Executer";

export class InputBoxExecuter implements NodeExecuter {
  constructor(private receiveFunName: string|undefined) {
  }

  async run(node: any): Promise<void> {
    const selected = await vscode.window.showInputBox();
    if (!_.isNil(selected)) {
      if (this.receiveFunName && _.isFunction(node[this.receiveFunName])) {
        node[this.receiveFunName](selected);
      }
		}
  }
}
