import * as _ from 'lodash';
import * as path from 'path';
import * as vscode from 'vscode';
import { exec } from 'child_process';
import { NodeExecuter } from "../Executer";
import { FrameNode } from './../genUtils/frameCode/FrameNode';
import { GenerateCodeProvider } from '../genUtils/GenerateCodeProvider';
import { FrameConfigNode } from './../genUtils/frameCode/FrameConfigNode';
import { NodeType } from '../genUtils/NodeType';

export class FrameCodeGenerater implements NodeExecuter {
  constructor() {
  }

  async run(node: FrameNode, provider: GenerateCodeProvider): Promise<void> {
    if (!node || !provider) {
      vscode.window.showErrorMessage('Parameter node or provider invalid.');
      return;
    }
    if ( _.isNil(node.homePath) ) {
      vscode.window.showErrorMessage('api-code-start home path required.');
      return;
    }

    const nodes = await provider.getFrameCodeUtils();
    const configNode = <FrameConfigNode>nodes.find(item => item.nodeType === NodeType.FrameCodeConfiguration);
    if (!configNode) {
      vscode.window.showErrorMessage('api-code-start configuration not found.');
      return;
    }
    const homeNode = <FrameNode>nodes.find(item => item.nodeType === NodeType.FrameCodeHomePath);
    const templateNode = <FrameNode>nodes.find(item => item.nodeType === NodeType.FrameCodeTemplateSwitch);

    const rootPath = path.resolve(homeNode.homePath);
    const envs = [];
    if (configNode.database) { envs.push(configNode.database); }
    if (configNode.language) { envs.push(configNode.language); }
    if (configNode.projectName) { envs.push(configNode.projectName); }
    if (configNode.needAws) { envs.push('aws'); }
    if (configNode.needCoverage) { envs.push('cov'); }
    if (configNode.needElasticSearch) { envs.push('es'); }
    if (configNode.needEmail) { envs.push('email'); }
    if (configNode.needEslint) { envs.push('eslint'); }
    if (configNode.needFile) { envs.push('file'); }
    if (configNode.needHeroku) { envs.push('heroku'); }
    if (configNode.needHttps) { envs.push('https'); }
    if (configNode.needJwt) { envs.push('jwt'); }
    if (configNode.needKafka) { envs.push('kafka'); }
    if (configNode.needKoa) { envs.push('koa'); }
    if (configNode.needMachineToken) { envs.push('m2m'); }
    if (configNode.needMockApi) { envs.push('mockapi'); }
    if (!configNode.needPagination) { envs.push('nopage'); }
    if (configNode.needPassword) { envs.push('pwd'); }
    if (configNode.needPasswordSalt) { envs.push('salt'); }
    if (configNode.needSwgdoc) { envs.push('swgdoc'); }
    if (configNode.needTcJwt) { envs.push('tcjwt'); }
    if (configNode.needTest) { envs.push('test'); }
    if (configNode.needTslint) { envs.push('tslint'); }
    if (configNode.needTwilio) { envs.push('twilio'); }
    if (configNode.needXlsx) { envs.push('xlsx'); }
    const strCommand = `cmd /C ts-node src/main.ts`;
    exec(strCommand, {
      cwd: rootPath,
      env: {
        'CODE_ENV': envs.join(','),
        'NAME_ENV': configNode.projectName,
        'CONFIG_ENV': templateNode.getSelectedTemplateName()
      }
    }, (err, stdout, stderr) => {
      if (err) {
        vscode.window.showErrorMessage(stderr);
      } else {
        vscode.window.showInformationMessage(stdout);
      }
    });
  }
}
