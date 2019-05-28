import * as _ from 'lodash';
import * as fs from 'fs';
import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import { NodeExecuter } from "../Executer";
import { GenerateCodeProvider } from '../genUtils/GenerateCodeProvider';

export interface PathDefine {
  label: string;
  pathName: string;
  verbName: string;
  operationId: string;
}

export interface ModelDefine {
  label: string;
  isRealModel: boolean;
  needPagination: boolean;
}

export interface ModelPropertyDefine {
  label: string;
  isKey: boolean;
  isForeignKey: boolean;
  foreignModel: string;
}

export class SwaggerSelectExecuter implements NodeExecuter {
  constructor(private receiveFunName: string|undefined) {
  }

  async run(node: any, provider: GenerateCodeProvider): Promise<void> {
    const uris = await vscode.window.showOpenDialog({ canSelectFolders: false, canSelectFiles: true })
		if (!_.isNil(uris) && uris.length > 0) {
      if (this.receiveFunName && _.isFunction(node[this.receiveFunName])) {
        node[this.receiveFunName](uris[0].fsPath);
      }
      const fileContent = fs.readFileSync(uris[0].fsPath);
      const yamlContent = yaml.safeLoad(fileContent.toString());
      if (yamlContent) {
        const { apis, models, modelProps } = this.parseYaml(yamlContent);
        provider.resetPathAndModelNode(apis, models, modelProps);
        provider.refresh();
      }
    }
  }

  parseYaml(yamlContent: any): any {
    let apis: PathDefine[] = [];
    let models: ModelDefine[] = [];
    const modelProps: any = {};

		_.each(yamlContent.paths, (value, path) => {
			_.each(value, (method, verb) => {
        let node = {
          label: `${verb} ${path}`,
          pathName: path,
          verbName: verb,
          operationId: method.operationId
        }
				if (!method.operationId) {
					const verbName = verb.toLowerCase().trim();
					if ( verbName === 'post') {
						node.operationId = 'create';
					} else if ( verbName === 'put') {
						node.operationId = 'update';
					} else if ( verbName === 'patch') {
						node.operationId = 'partiallyUpdate';
					} else if ( verbName === 'get') {
						if (path.indexOf('/:') > 0 || path.indexOf('/{') > 0) {
							node.operationId = 'get';
						} else {
							node.operationId = 'search';
						}
					}
				}
				apis.push(node);
			});
		});

		apis = apis.sort((a, b) => {
			if ( a.pathName < b.pathName ) { return -1; };
			if ( a.pathName > b.pathName ) { return 1; };
			if ( a.verbName < b.verbName ) { return -1; };
			if ( a.verbName > b.verbName ) { return 1; };
			return 0;
		});
		for(let def in yamlContent.definitions) {
      const label = String(def);
      const node = {
        label,
        isRealModel: this.autoJudgeModel(label),
        needPagination: true
      };
			models.push(node);

			const yamlModel = yamlContent.definitions[def];
			const props = [];
			for(let prop in yamlModel.properties) {
        const label = String(prop);
        const nodeProp = {
          label,
          isKey: label.toLowerCase() === 'id' ? true : false,
          isForeignKey: label.toLowerCase().endsWith('id') ? true : false,
          foreignModel: _.upperFirst(label.substring(0, label.length - 2))
        }
				props.push(nodeProp);
			}
			if (yamlModel.allOf) {
				for(let part of yamlModel.allOf) {
					if (part.properties) {
						for(let prop in part.properties) {
              const label = String(prop);
              const nodeProp = {
                label,
                isKey: label.toLowerCase() === 'id' ? true : false,
                isForeignKey: label.toLowerCase().endsWith('id') ? true : false,
                foreignModel: _.upperFirst(label.substring(0, label.length - 2))
              }
							props.push(nodeProp);
						}
					}
				}
			}
			modelProps[def] = props;
		}
		models = models.sort((a, b) => {
			if ( a.label < b.label ) { return -1; };
			if ( a.label > b.label ) { return 1; };
			return 0;
    });

    return {
      apis,
      models,
      modelProps
    }
  }

	autoJudgeModel(label: string): boolean {
		if (label === 'Id' || label === 'Error' || label === 'Record' || label.endsWith('Data')) {
			return false;
    }
    return true;
  }
}
