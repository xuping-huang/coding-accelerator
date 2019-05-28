'use strict';
import * as vscode from 'vscode';
import { registerCodeGenerateUtils } from './ext/genUtils/facade';
import { registerCodeUtils } from './ext/codeUtils/facade';

export function activate(context: vscode.ExtensionContext) {
    /**
     * 代码处理工具
     */
    registerCodeUtils(context);

    /**
     * 根据Yaml进行配置后调用自动代码生成项目的工具插件
     */
    registerCodeGenerateUtils(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
