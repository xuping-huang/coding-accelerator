import { DummyExecuter } from './../executer/DummyExecuter';
import { FrameConfigNode } from './frameCode/FrameConfigNode';
import { PickSingleExecuter } from './../executer/PickSingleExecuter';
import * as _ from 'lodash';
import * as vscode from 'vscode';
import * as helper from '../../lib/helper';
import { GenNode } from './GenNode';
import { NodeType } from './NodeType';
import { FrameNode } from './frameCode/FrameNode';
import { FolderPathSelectExecuter } from '../executer/FolderpathSelectExecuter';
import * as frameConstant from './frameCode/framConstant';
import { InputBoxExecuter } from '../executer/InputBoxExecuter';
import { FrameConfigItemNode } from './frameCode/FrameConfigItemNode';
import { FrameSwitchItemNode } from './frameCode/FrameSwitchItemNode';
import { ProxyExecuter } from '../executer/ProxyExecuter';
import { FrameCodeGenerater } from '../executer/FrameCodeGenerater';
import { SwaggerSelectExecuter, ModelPropertyDefine, ModelDefine, PathDefine } from '../executer/SwaggerSelectExecuter';
import { ServiceNode } from './serviceCode/ServiceNode';
import { ServiceCodeGenerator } from '../executer/ServiceCodeGenerator';

export class GenerateCodeProvider implements vscode.TreeDataProvider<GenNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<GenNode | undefined> = new vscode.EventEmitter<GenNode | undefined>();
  readonly onDidChangeTreeData: vscode.Event<GenNode | undefined> = this._onDidChangeTreeData.event;
  private _tops: GenNode[] = [];
  private _frames: GenNode[] = [];
  private _frameConfigs: GenNode[] = [];
  private _serviceItems: GenNode[] = [];
  private _models: GenNode[] = [];
  private _modelProps: any = {};
  private _apis: GenNode[] = [];

  constructor(context: vscode.ExtensionContext) {
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: GenNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(element?: GenNode | undefined): vscode.ProviderResult<GenNode[]> {
    if (element) {
      switch(element.nodeType) {
        case NodeType.FrameCodeGenUtil:
          return this.getFrameCodeUtils(element);
        case NodeType.FrameCodeConfiguration:
          return this.getFrameCodeGenConfigs(element);
        case NodeType.ServiceCodeGenUtil:
          return this.getServiceCodeSubs(element);
        case NodeType.ServiceCodePathItem:
          return Promise.resolve(this._apis);
        case NodeType.ServiceCodeModelItem:
          let returnModels = this._models;
          if (element.isSwitchOn) {
            returnModels = this._models.filter(node => node.isRealModel);
          }
          return Promise.resolve(returnModels);
        case NodeType.ServiceCodePathUnit:
          return this.getApiPathProperties(element);
        case NodeType.ServiceCodeModelUnit:
          return Promise.resolve(this._modelProps[element.label]);
        case NodeType.ServiceCodeModelPropertyUnit:
          let props = [];
          if (element.isForeignKey) {
            const node = new ServiceNode(
              'Ref Model',
              'Ref Model',
              vscode.TreeItemCollapsibleState.None,
              NodeType.ServiceCodeModelPropertyForeignModel,
              new InputBoxExecuter('setForeignModel'),
              element);
            node.setDescription(element.foreignModel);
            props.push(node);
          }
          return Promise.resolve(props);
      }
    } else {
      return this.getTopItems();
    }
    return Promise.resolve([]);
  }

  private getApiPathProperties(element: GenNode): Thenable<GenNode[]>{
    const nodes : GenNode[] = [];

    const node = new ServiceNode(
      'operationId',
      'operationId',
      vscode.TreeItemCollapsibleState.None,
      NodeType.ServiceCodePathUnitProperty,
      new InputBoxExecuter('setOperationId'),
      element);
    node.setDescription(element.operationId);
    nodes.push(node);

    return Promise.resolve(nodes);
  }

  getTopItems(): Promise<GenNode[]> {
    if (this._tops.length > 0 ) { return Promise.resolve(this._tops); }
    this._tops.push(new FrameNode(
      'api-code-start',
      'Generate frame code by api-code-start',
      vscode.TreeItemCollapsibleState.Collapsed,
      NodeType.FrameCodeGenUtil,
      new FrameCodeGenerater()
    ));
    this._tops.push(new FrameNode(
      'openapi-generator',
      'Generate service code by openapi-code-start',
      vscode.TreeItemCollapsibleState.Collapsed,
      NodeType.ServiceCodeGenUtil,
      new ServiceCodeGenerator()
    ));

    return Promise.resolve(this._tops);
  }

  getFrameCodeUtils(parent?: GenNode | undefined): Promise<GenNode[]> {
    if (this._frames.length > 0 ) { return Promise.resolve(this._frames); }
    this._frames.push(new FrameNode(
      'home',
      'api-code-start project home path',
      vscode.TreeItemCollapsibleState.None,
      NodeType.FrameCodeHomePath,
      new FolderPathSelectExecuter('setHomePath'),
      parent));
    // this._frames.push(new FrameNode(
    //   'out',
    //   'generated code output path',
    //   vscode.TreeItemCollapsibleState.None,
    //   NodeType.FrameCodeOutputPath,
    //   new FolderPathSelectExecuter('setOutputPath'),
    //   parent));
    this._frames.push(new FrameNode(
      'template',
      'used template switch',
      vscode.TreeItemCollapsibleState.None,
      NodeType.FrameCodeTemplateSwitch,
      new PickSingleExecuter(frameConstant.SWITCH_TEMPLATES, 'setSwitchTemplate'),
      parent));
    this._frames.push(new FrameConfigNode(
      'config',
      'used config parameters',
      parent));
    return Promise.resolve(this._frames);
  }

  getFrameCodeGenConfigs(parent?: GenNode | undefined): Promise<GenNode[]> {
    if (this._frameConfigs.length > 0 ) { return Promise.resolve(this._frameConfigs); }
    this._frameConfigs.push(new FrameConfigItemNode('project name', new InputBoxExecuter('setProjectName'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameConfigItemNode('language', new PickSingleExecuter(frameConstant.SUPPORT_LANGUAGES, 'setLanguage'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameConfigItemNode('database', new PickSingleExecuter(frameConstant.SUPPORT_DATABASES, 'setDatabase'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need mock api', new ProxyExecuter('switchMockApi'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need pagination', new ProxyExecuter('switchPagination'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need email', new ProxyExecuter('switchEmail'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need xlsx', new ProxyExecuter('switchXlsx'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need file upload', new ProxyExecuter('switchFile'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need https', new ProxyExecuter('switchHttps'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need elastic search', new ProxyExecuter('switchElasticSearch'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need kafka', new ProxyExecuter('switchKafka'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need twilio', new ProxyExecuter('switchTwilio'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need aws', new ProxyExecuter('switchAws'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need password salt', new ProxyExecuter('switchPasswordSalt'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need password', new ProxyExecuter('switchPassword'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need machine token', new ProxyExecuter('switchMachineToken'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need tc jwt', new ProxyExecuter('switchTcJwt'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need jwt', new ProxyExecuter('switchJwt'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need koa', new ProxyExecuter('switchKoa'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need swgdoc', new ProxyExecuter('switchSwgdoc'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need heroku', new ProxyExecuter('switchHeroku'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need tslint', new ProxyExecuter('switchTslint'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need eslint', new ProxyExecuter('switchEslint'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need coverage', new ProxyExecuter('switchCoverage'), <FrameConfigNode>parent));
    this._frameConfigs.push(new FrameSwitchItemNode('need test', new ProxyExecuter('switchTest'), <FrameConfigNode>parent));
    return Promise.resolve(this._frameConfigs);
  }

  getServiceCodeSubs(parent?: GenNode | undefined): Promise<GenNode[]> {
    if (this._serviceItems.length > 0 ) { return Promise.resolve(this._serviceItems); }

    this._serviceItems.push(new ServiceNode(
      'project name',
      'project name',
      vscode.TreeItemCollapsibleState.None,
      NodeType.ServiceCodeProjectName,
      new InputBoxExecuter('setProjectName'),
      parent));
    this._serviceItems.push(new ServiceNode(
      'home',
      'openapi-generator project home path',
      vscode.TreeItemCollapsibleState.None,
      NodeType.ServiceCodeHomeItem,
      new FolderPathSelectExecuter('setHomePath'),
      parent));
    this._serviceItems.push(new ServiceNode(
      'swagger',
      'swagger.yaml file path',
      vscode.TreeItemCollapsibleState.None,
      NodeType.ServiceCodeSwaggerItem,
      new SwaggerSelectExecuter('setSwaggerPath'),
      parent
    ));
    this._serviceItems.push(new ServiceNode(
      'api path metadata',
      'api path route metadata',
      vscode.TreeItemCollapsibleState.Collapsed,
      NodeType.ServiceCodePathItem,
      new DummyExecuter(),
      parent
    ));
    this._serviceItems.push(new ServiceNode(
      'model metadata',
      'model metadata define',
      vscode.TreeItemCollapsibleState.Collapsed,
      NodeType.ServiceCodeModelItem,
      new ProxyExecuter('switchToggle'),
      parent
    ));
    return Promise.resolve(this._serviceItems);
  }

  getPathAndModelNodes() {
    return {
      apis: this._apis,
      models: this._models,
      modelProps: this._modelProps
    }
  }

  resetPathAndModelNode(apis:PathDefine[], models:ModelDefine[], modelProps:any) {
    this._apis = [];
    this._models = [];
    this._modelProps = {};

    _.each(apis, api => {
      const node = new GenNode(api.label, api.label, vscode.TreeItemCollapsibleState.Collapsed, NodeType.ServiceCodePathUnit);
      node.pathName = api.pathName;
      node.verbName = api.verbName;
      node.operationId = api.operationId;
      this._apis.push(node);
    });

    _.each(models, model => {
      const node = new GenNode(model.label, model.label, vscode.TreeItemCollapsibleState.Collapsed, NodeType.ServiceCodeModelUnit);
      node.isRealModel = model.isRealModel;
      node.contextValue = helper.switchChangeContextValue(node.contextValue, 'model', model.isRealModel);
      this._models.push(node);
    });

    _.each(modelProps, (props, key) => {
      this._modelProps[key] = [];
      _.each(props, prop => {
        const propDef = <ModelPropertyDefine> prop;
        const node = new GenNode(propDef.label, propDef.label, vscode.TreeItemCollapsibleState.Collapsed, NodeType.ServiceCodeModelPropertyUnit);
        node.isKey = propDef.isKey;
        node.isForeignKey = propDef.isForeignKey;
        node.contextValue = helper.switchChangeContextValue(node.contextValue, 'key', node.isKey);
        node.contextValue = helper.switchChangeContextValue(node.contextValue, 'fkey', node.isForeignKey);
        node.foreignModel = propDef.foreignModel;
        this._modelProps[key].push(node);
      });
    });
  }
}
