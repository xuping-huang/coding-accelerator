import * as vscode from 'vscode';
import { CodeUtilProvider } from "./CodeUtilProvider";
import { CodeNode } from "./CodeNode";
import { NodeType } from "./NodeType";
import { NodeExecuter } from "../Executer";
import { Executable } from '../Executable';

export class ExecutableNode extends CodeNode implements Executable {

  constructor(
    label: string,
    tip: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    nodeType: NodeType,
    protected executer: NodeExecuter,
    parent?: CodeNode) {
    super(label, tip, collapsibleState, nodeType, parent);
  }

  execute(_provider: CodeUtilProvider) {
  }

}
