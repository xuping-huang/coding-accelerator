import * as vscode from 'vscode';
import { CodeNode } from './CodeNode';
import { NodeType } from './NodeType';
import { Excel2JsonNode } from './otherUtils/Excel2JsonNode';
import { Json2ExcelNode } from './otherUtils/Json2ExcelNode';
import { Excel2JsonExecuter } from '../executer/Excel2JsonExecuter';
import { Json2ExcelExecuter } from '../executer/Json2ExcelExecuter';
import { Excel2JsonConfigNode } from './otherUtils/Excel2JsonNodeConfig';
import { FilepathSelectExecuter } from '../executer/FilepathSelectExecuter';
import { FolderPathSelectExecuter } from '../executer/FolderpathSelectExecuter';
import { Json2ExcelNodeConfig } from './otherUtils/Json2ExcelNodeConfig';
import * as pasteProcessor from './pasteUtils/pasteProcessor';
import { PasteNode } from './pasteUtils/PasteNode';
import { PasteConfigNode } from './pasteUtils/PasteConfigNode';
import { TableSqlParser } from './pasteUtils/parser/TableSqlParser';
import { SnakeStringParser } from './pasteUtils/parser/SnakeStringParser';
import { JsonParser } from './pasteUtils/parser/JsonParser';
import { PostmanSchemaParser } from './pasteUtils/parser/PostmanSchemaParser';
import { JoiSchemaParser } from './pasteUtils/parser/JoiSchemaParser';
import { SwaggerModelParser } from './pasteUtils/parser/SwaggerModelParser';
import { SequelizeModelConvertor } from './pasteUtils/convert/SequelizeModelConvertor';
import { CamelCaseConvertor } from './pasteUtils/convert/CamelCaseConvertor';
import { PostmanJsonConvertor } from './pasteUtils/convert/PostmanJsonConvertor';
import { CodeJsonConvertor } from './pasteUtils/convert/CodeJsonConvertor';
import { E2eTestConvertor } from './pasteUtils/convert/E2eTestConvertor';
import { UnitTestConvertor } from './pasteUtils/convert/UnitTestConvertor';
import { JoiSchema2TestConvertor } from './pasteUtils/convert/JoiSchem2TestConvertor';
import { SwaggerModel2JsonDataConverter } from './pasteUtils/convert/SwaggerModel2JsonDataConverter';
import { SwaggerModel2JoiSchemaConverter } from './pasteUtils/convert/SwaggerModel2JoiSchemaConvertor';

export class CodeUtilProvider implements vscode.TreeDataProvider<CodeNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<CodeNode | undefined> = new vscode.EventEmitter<CodeNode | undefined>();
  readonly onDidChangeTreeData: vscode.Event<CodeNode | undefined> = this._onDidChangeTreeData.event;
  private _pasteItems: CodeNode[] = [];
  private _otherItems: CodeNode[] = [];
  private _tops: CodeNode[] = [];

  constructor(context: vscode.ExtensionContext) {
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CodeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: CodeNode | undefined): vscode.ProviderResult<CodeNode[]> {
    if (element) {
      switch(element.nodeType) {
        case NodeType.PasteUtilFolder:
          return this.getFolderPasteUtils(element);
        case NodeType.OtherUtilFolder:
          return this.getFolderOtherUtils(element);
        case NodeType.Excel2Json:
          return this.getExcelConfigItem(<Excel2JsonNode>element);
        case NodeType.Json2Excel:
          return this.getJsonExcelConfigItem(<Json2ExcelNode>element);
        case NodeType.PasteUtilItem:
          return this.getPasteConfigs(<PasteNode> element);
      }
    } else {
      return this.getTopItems();
    }
    return Promise.resolve([]);
  }

  getTopItems(): Promise<CodeNode[]> {
    if (this._tops.length > 0 ) { return Promise.resolve(this._tops); }
    const pasteFolderNode = new CodeNode('Paste Pre Processor', 'Pattern matching of content in the Clipboard, automatic conversion and paste results', vscode.TreeItemCollapsibleState.Expanded, NodeType.PasteUtilFolder);
    pasteFolderNode.isSwitchOn = true;
    this._tops.push(pasteFolderNode);
    this._tops.push(new CodeNode('Others', 'Other code utilities', vscode.TreeItemCollapsibleState.Collapsed, NodeType.OtherUtilFolder));

    return Promise.resolve(this._tops);
  }

  getFolderPasteUtils(parent: CodeNode): Promise<CodeNode[]> {
    if (this._pasteItems.length > 0) { return Promise.resolve(this._pasteItems); }
    this._pasteItems.push(new PasteNode('Create table Sql >> Sequelize model', 'Build table script convert to Sequelize model', new TableSqlParser(), new SequelizeModelConvertor(), parent));
    this._pasteItems.push(new PasteNode('Snake >> camelCase', 'Underline string converts to the camelCase format', new SnakeStringParser(), new CamelCaseConvertor(false), parent));
    this._pasteItems.push(new PasteNode('Snake >> CamelCase', 'Underline string converts to the CamelCase format', new SnakeStringParser(), new CamelCaseConvertor(true), parent));
    this._pasteItems.push(new PasteNode('Json >> Postman Standard', 'Convert Json-compliant code to the style of the Postman specification', new JsonParser(), new PostmanJsonConvertor(), parent));
    this._pasteItems.push(new PasteNode('Json >> Code Standard', 'Convert code that conforms to Json format to a style that complies with code specifications', new JsonParser(), new CodeJsonConvertor(), parent));
    this._pasteItems.push(new PasteNode('Postman > E2E Test', 'Convert Postman test case definition to e2e unit test code', new PostmanSchemaParser(), new E2eTestConvertor(), parent));
    this._pasteItems.push(new PasteNode('Postman > Unit Test', 'Convert Postman test case definition to service Unit test code', new PostmanSchemaParser(), new UnitTestConvertor(), parent));
    this._pasteItems.push(new PasteNode('Joi Schema >> Test', 'Convert the schema definition of Joi to a parameter definition style for unit tests', new JoiSchemaParser(), new JoiSchema2TestConvertor(), parent));
    this._pasteItems.push(new PasteNode('Swagger Model >> Json Data', 'Convert the Model definition of Swagger to JSON', new SwaggerModelParser(), new SwaggerModel2JsonDataConverter(), parent, true));
    this._pasteItems.push(new PasteNode('Swagger Model >> Joi Schema', 'Convert the Model definition of Swagger to Joi.Schema', new SwaggerModelParser(), new SwaggerModel2JoiSchemaConverter(), parent, true));
    return Promise.resolve(this._pasteItems);
  }

  getFolderOtherUtils(parent: CodeNode): Promise<CodeNode[]> {
    if (this._otherItems.length > 0) { return Promise.resolve(this._otherItems); }
    this._otherItems.push(new Excel2JsonNode('Excel >> Json', 'Export the contents of an Excel file as a Json file', new Excel2JsonExecuter(), parent));
    this._otherItems.push(new Json2ExcelNode('Json >> Excel', 'Convert JSON files in a directory to Excel files', new Json2ExcelExecuter(), parent));

    return Promise.resolve(this._otherItems);
  }

  getExcelConfigItem(parent: Excel2JsonNode): Promise<Excel2JsonConfigNode[]> {
    const nodes: Excel2JsonConfigNode[] = [];
    let node = new Excel2JsonConfigNode('excel', 'Set excel file path', new FilepathSelectExecuter('setExcelFilePath'), parent);
    node.descUseExcelPath = true;
    nodes.push(node);

    node = new Excel2JsonConfigNode('out', 'Set json output folder path', new FolderPathSelectExecuter('setJsonOutputPath'), parent);
    node.descUseOutputPath = true;
    nodes.push(node);

    return Promise.resolve(nodes);
  }

  getJsonExcelConfigItem(parent: Json2ExcelNode): Promise<Json2ExcelNodeConfig[]> {
    const nodes: Json2ExcelNodeConfig[] = [];
    let node = new Json2ExcelNodeConfig('json', 'Set json file path', new FolderPathSelectExecuter('setJsonFileFolderPath'), parent);
    node.descUseJsonFolderPath = true;
    nodes.push(node);

    node = new Json2ExcelNodeConfig('out', 'Set excel output folder path', new FilepathSelectExecuter('setExcelOutputPath'), parent);
    node.descUseOutputPath = true;
    nodes.push(node);

    return Promise.resolve(nodes);
  }

  getPasteConfigs(parent: PasteNode): Promise<PasteConfigNode[]> {
    const nodes : PasteConfigNode[] = [];

    if (parent.needSubNode) {
      nodes.push(new PasteConfigNode(parent, new FilepathSelectExecuter('setConfigPath')));
    }

		return Promise.resolve(nodes);
  }

  /**
   * Operation before Paste.
   *
   * Find active paste utils.
   */
  async pastePreProcess(): Promise<string|undefined> {
    const found = this._pasteItems.filter(item => {
      return item.isActive;
    });
    if (found && found.length > 0) {
      return await pasteProcessor.preHandle(found);
    }
    return Promise.resolve(undefined);
  }

  /**
   * Operation after Paste.
   *
   * @param content the origin copied content
   */
  async pastePostProcess(content: string|undefined): Promise<void> {
    if (content) {
      await pasteProcessor.postHandle(content);
    }
    return Promise.resolve();
  }
}
