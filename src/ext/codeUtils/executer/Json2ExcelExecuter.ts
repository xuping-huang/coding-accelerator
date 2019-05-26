import _ = require('lodash');
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import * as vscode from 'vscode';
import * as path from 'path';
import { NodeExecuter } from '../executer';

export class Json2ExcelExecuter implements NodeExecuter {
  constructor() {
  }

  async run(jsonFileFolderPath: fs.PathLike, outputFolderPath: fs.PathLike): Promise<void> {
    try {
      fs.readdir(jsonFileFolderPath, async (err, files) => {
        if(err) {
          vscode.window.showErrorMessage(err.message);
          return;
        } else {
          const excelObj: any = {};
          files.forEach(file => {
            const filePath = path.join(jsonFileFolderPath.toString(), file);
            const stat = fs.statSync(filePath);
            if(stat.isFile() && file.endsWith('.json')) {
              const ind = file.lastIndexOf('.');
              const name = file.substring(0, ind);
              excelObj[name] = JSON.parse(fs.readFileSync(filePath).toString());
            }
          });
          const workbook = XLSX.utils.book_new();
          _.each(excelObj, (value, key) => {
            const sheet = XLSX.utils.json_to_sheet(value);
            XLSX.utils.book_append_sheet(workbook, sheet, key);
          });
          XLSX.writeFile(workbook, outputFolderPath.toString());
          vscode.window.showInformationMessage('Combine json to excel success!');
        }
      });
    } catch (err) {
      vscode.window.showErrorMessage(err.message);
    }
  }
}
