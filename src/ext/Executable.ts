import * as vscode from 'vscode';

export interface Executable {
  execute(provider: vscode.TreeDataProvider<any>): void;
}
