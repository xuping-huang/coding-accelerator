"use strict";
import * as _ from 'lodash';
import * as vscode from "vscode";
import { GenerateCodeProvider } from './GenerateCodeProvider';
import { GenNode } from "./GenNode";

export function registerCodeGenerateUtils(context: vscode.ExtensionContext) {
  const genCodeProvider = new GenerateCodeProvider(context);
  vscode.window.registerTreeDataProvider("codeGenerators", genCodeProvider);
  console.log('generate code provider register');

  vscode.commands.registerCommand("gen.node.execute", (node: GenNode) => {
    node.execute(genCodeProvider);
  });
  vscode.commands.registerCommand("gen.config.setting", (node: GenNode) => {
    node.execute(genCodeProvider);
  });
  vscode.commands.registerCommand('gen.node.toggle.on', (node: GenNode) => {
    node.execute(genCodeProvider);
  });
  vscode.commands.registerCommand('gen.node.toggle.off', (node: GenNode) => {
    node.execute(genCodeProvider);
  });

  const modelToggle = (node: any) => {
    if (node['modelToggle'] && _.isFunction(node['modelToggle'])){
      node['modelToggle'](genCodeProvider);
    }
  }
  vscode.commands.registerCommand('gen.node.model.on', modelToggle);
  vscode.commands.registerCommand('gen.node.model.off', modelToggle);

  const paginationToggle = (node: any) => {
    if (node['paginationToggle'] && _.isFunction(node['paginationToggle'])){
      node['paginationToggle'](genCodeProvider);
    }
  }
  vscode.commands.registerCommand('gen.node.pagination.on', paginationToggle);
  vscode.commands.registerCommand('gen.node.pagination.off', paginationToggle);

  const keyToggle = (node: any) => {
    if (node['keyToggle'] && _.isFunction(node['keyToggle'])){
      node['keyToggle'](genCodeProvider);
    }
  }
  vscode.commands.registerCommand('gen.node.key.on', keyToggle);
  vscode.commands.registerCommand('gen.node.key.off', keyToggle);

  const fkeyToggle = (node: any) => {
    if (node['fkeyToggle'] && _.isFunction(node['fkeyToggle'])){
      node['fkeyToggle'](genCodeProvider);
    }
  }
  vscode.commands.registerCommand('gen.node.fkey.on', fkeyToggle);
  vscode.commands.registerCommand('gen.node.fkey.off', fkeyToggle);

}
