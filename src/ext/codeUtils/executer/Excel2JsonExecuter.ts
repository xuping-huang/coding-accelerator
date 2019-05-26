import _ = require('lodash');
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import * as vscode from 'vscode';
import * as path from 'path';
import { NodeExecuter } from '../executer';

export class Excel2JsonExecuter implements NodeExecuter {
  constructor() {
  }

  async run(excelFilePath: fs.PathLike, outputFolderPath: fs.PathLike): Promise<void> {
    try {
      const workbook = XLSX.readFile(excelFilePath.toString());
      _.each(workbook.SheetNames, sheetName => {
        const sheetObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const sheetJson = JSON.stringify(sheetObj, null, 1);
        fs.writeFileSync(path.join(outputFolderPath.toString(), `${sheetName}.json`), sheetJson);
        vscode.window.showInformationMessage('Convert excel to json success!');
      });
    } catch (err) {
      vscode.window.showErrorMessage(err.message);
    }
  }
}
