import * as vscode from 'vscode';
import { NodeType } from '../NodeType';
import { GenNode } from '../GenNode';
import { GenerateCodeProvider } from '../GenerateCodeProvider';
import { NodeExecuter } from '../../Executer';
import { FrameConfigNode } from './FrameConfigNode';

export class FrameSwitchItemNode extends GenNode {
  constructor(
    public readonly label: string,
    protected executer: NodeExecuter,
    protected parent?: FrameConfigNode
  ) {
    super(label, label, vscode.TreeItemCollapsibleState.None, NodeType.FrameCodeSwitchableItem, parent);
  }

  async execute(provider: GenerateCodeProvider) {
    if (this.executer) {
      await this.executer.run(this);
      provider.refresh();
    }
  }

  switchMockApi() : boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needMockApi = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }

  switchPagination(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needPagination = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchEmail(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needEmail = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchXlsx(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needXlsx = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchFile(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needFile = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchHttps(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needHttps = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchElasticSearch(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needElasticSearch = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchKafka(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needKafka = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchTwilio(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needTwilio = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchAws(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needAws = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchPasswordSalt(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needPasswordSalt = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchPassword(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needPassword = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchMachineToken(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needMachineToken = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchTcJwt(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needTcJwt = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchJwt(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needJwt = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchKoa(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needKoa = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchSwgdoc(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needSwgdoc = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchHeroku(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needHeroku = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchTslint(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needTslint = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchEslint(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needEslint = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchCoverage(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needCoverage = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
  switchTest(): boolean {
    this.switchToggle();
    if (this.parent) {
      this.parent.needTest = this.isSwitchOn;
    }
    return this.isSwitchOn;
  }
}
