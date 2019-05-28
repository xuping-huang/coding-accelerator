import * as _ from 'lodash';
import * as vscode from 'vscode';
import { NodeExecuter } from "../Executer";

export class FilepathSelectExecuter implements NodeExecuter {
  constructor(private receiveFunName: string|undefined) {

  }

  async run(node: any): Promise<void> {
		const uris = await vscode.window.showOpenDialog({ canSelectFolders: false, canSelectFiles: true })
		if (!_.isNil(uris) && uris.length > 0) {
      if (this.receiveFunName && _.isFunction(node[this.receiveFunName])) {
        node[this.receiveFunName](uris[0].fsPath);
      }
		}
  }
}
