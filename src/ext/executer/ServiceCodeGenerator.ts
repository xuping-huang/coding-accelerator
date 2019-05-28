import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import { NodeExecuter } from "../Executer";
import { GenerateCodeProvider } from '../genUtils/GenerateCodeProvider';
import { NodeType } from '../genUtils/NodeType';
import { ServiceNode } from '../genUtils/serviceCode/ServiceNode';
import { ModelDefine, PathDefine } from './SwaggerSelectExecuter';
import { GenNode } from '../genUtils/GenNode';

export class ServiceCodeGenerator implements NodeExecuter {
  constructor() {
  }

  async run(_node: ServiceNode, provider: GenerateCodeProvider): Promise<void> {
    const subNodes = await provider.getServiceCodeSubs();
    const swaggerNode = <ServiceNode>subNodes.find(item => item.nodeType === NodeType.ServiceCodeSwaggerItem);
    if (!swaggerNode || _.isEmpty(swaggerNode.swaggerPath)) {
      vscode.window.showErrorMessage('Swagger file path required.');
      return;
    }
    const projectNameNode = <ServiceNode>subNodes.find(item => item.nodeType === NodeType.ServiceCodeProjectName);
    if (!swaggerNode || _.isEmpty(projectNameNode.projectName)) {
      vscode.window.showErrorMessage('Project name required.');
      return;
    }
    const homeNode = <ServiceNode>subNodes.find(item => item.nodeType === NodeType.ServiceCodeHomeItem);
    if (!homeNode || _.isEmpty(homeNode.homePath)) {
      vscode.window.showErrorMessage('Home path required.');
      return;
    }

    const data = provider.getPathAndModelNodes();
    this.fileSync({
      swaggerPath: swaggerNode.swaggerPath,
      homePath: `${homeNode.homePath}/swagger`,
      outputFileName: `${projectNameNode.projectName}.yaml`,
      apis: data.apis,
      models: data.models,
      modelProps: data.modelProps
    });

		// let dbname = '';
		// let language = '';
		// let userToken = false;
		// let m2mToken = false;
		// let swgdoc = false;

		// if (language === 'javascript') {
		// 	const jsCommand = `cmd /C java -cp ../openapi-code-start/target/j-spring-openapi-generator-1.0.0.jar;modules/openapi-generator-cli/target/openapi-generator-cli.jar org.openapitools.codegen.OpenAPIGenerator generate -g j-nodejs -i ./swagger/${projectNameNode.projectName}.yaml -o ./out/j-nodejs --additional-properties swgdoc=${swgdoc},db=${dbname},m2mToken=${m2mToken},userToken=${userToken}`;
		// 	console.log(jsCommand)
		// 	exec(jsCommand, { cwd: corePath }, (err, stdout, stderr) => {
		// 		if (err) {
		// 			vscode.window.showErrorMessage(stderr);
		// 		} else {
		// 			vscode.window.showInformationMessage(stdout);
		// 		}
		// 	});
		// } else if (language === 'spring') {
		// 	const springCommand = `cmd /C java -cp ../openapi-code-start/target/j-spring-openapi-generator-1.0.0.jar;modules/openapi-generator-cli/target/openapi-generator-cli.jar org.openapitools.codegen.OpenAPIGenerator generate -g j-spring -i ./swagger/${projectNameNode.projectName}.yaml -o ./out/j-spring --additional-properties swgdoc=${swgdoc},db=${dbname},m2mToken=${m2mToken},userToken=${userToken}`;
		// 	exec(springCommand, { cwd: corePath }, (err, stdout, stderr) => {
		// 		if (err) {
		// 			vscode.window.showErrorMessage(stderr);
		// 		} else {
		// 			vscode.window.showInformationMessage(stdout);
		// 		}
		// 	});
		// }

		// const postCommand = `cmd /C java -cp ../openapi-code-start/target/j-spring-openapi-generator-1.0.0.jar;modules/openapi-generator-cli/target/openapi-generator-cli.jar org.openapitools.codegen.OpenAPIGenerator generate -g postman -i ./swagger/${projectNameNode.projectName}.yaml -o ./out/postman --additional-properties swgdoc=${swgdoc},db=${dbname},m2mToken=${m2mToken},userToken=${userToken}`;
		// console.log(postCommand);
		// exec(postCommand, { cwd: corePath }, (err, stdout, stderr) => {
		// 	if (err) {
		// 		vscode.window.showErrorMessage(stderr);
		// 	} else {
		// 		vscode.window.showInformationMessage(stdout);
		// 	}
		// });
  }

  async fileSync(data: any) {
    const fileContent = fs.readFileSync(data.swaggerPath);
    const yamlContent = yaml.safeLoad(fileContent.toString());
		if (yamlContent) {
			_.each(yamlContent.paths, (value, path) => {
				_.each(value, (method, verb) => {
					const apiPath = data.apis.find((api: PathDefine) => {
						return api.pathName === path && api.verbName === verb;
					});

					if (apiPath) {
						method['operationId'] = apiPath.operationId;
					}
				});
			});

			let def: any;
			for(def in yamlContent.definitions) {
				const nodeModel: ModelDefine = data.models.find((model: ModelDefine) => {
					return model.label === String(def);
				});
				if (!nodeModel) { continue; }

				const yamlModel = yamlContent.definitions[def];
				yamlModel['x-table-model'] = nodeModel.isRealModel ? true : undefined;
				yamlModel['x-search-page'] = nodeModel.isRealModel && nodeModel.needPagination ? true : undefined;

				const nodeProps: GenNode[] = data.modelProps[String(def)];
				if (!nodeProps) { continue; }

				if (yamlModel.properties) {
					for(let prop in yamlModel.properties) {
						const nodeProp = nodeProps.find(node => {
							return node.label === String(prop);
						});
						if (!nodeProp) { continue; }
						const yamlProp = yamlModel.properties[prop];
						yamlProp['x-is-key'] = nodeProp.isKey ? true : undefined;
						yamlProp['x-foreign-model'] = nodeProp.isForeignKey ? nodeProp.foreignModel : undefined;
					}
				}
				if (yamlModel.allOf) {
					for(let part of yamlModel.allOf) {
						if (part.properties) {
							for(let prop in part.properties) {
								const nodeProp = nodeProps.find(node => {
									return node.label === String(prop);
								});
								if (!nodeProp) { continue; }
								const yamlProp = part.properties[prop];
								yamlProp['x-is-key'] = nodeProp.isKey ? true : undefined;
							}
						}
					}
				}
			}
    }
    const content = yaml.safeDump(yamlContent, { skipInvalid: true });
    const output = path.resolve(data.homePath, data.outputFileName);
    fs.writeFileSync(output, content);
    vscode.window.showInformationMessage(`file generated: ${output}`);
	}
}
