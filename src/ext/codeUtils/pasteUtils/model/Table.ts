import * as _ from 'lodash';
import { ColumnDefine } from "./ColumnDefine";
import { TableColumn } from "./TableColumn";
import { TableDefine } from "./TableDefine";

export class Table implements TableDefine {
  public _columns: ColumnDefine[] = [];
  private _name: string = '';
  private _snakeName: string = '';
  private _camelCaseName: string = '';
  private _schemaName: string = 'DBSchema';

  constructor(name: string) {
    let fullName = name.trim();
    const ind = fullName.indexOf('.');
    if ( ind > 0) {
      this._schemaName = fullName.substring(0, ind);
      fullName = fullName.substring(ind+1, fullName.length);
    }
    if (fullName.startsWith('"')) {
      fullName = fullName.substring(1, fullName.length - 1);
    }
    this._name = fullName;
    this._snakeName = _.snakeCase(fullName);
    this._camelCaseName = _.upperFirst(_.camelCase(fullName));
  }

  get name(): string {
    return this._name.trim();
  }
  get snakeName(): string {
    return this._snakeName;
  }
  get camelCaseName(): string {
    return this._camelCaseName;
  }
  get schemaName(): string {
    return this._schemaName;
  }

  get columns(): ColumnDefine[] {
    return this._columns;
  }

  addColumn(columnName: string, columnType: string, length?: number, precision?: number) {
    if (!_.isNil(length)) {
      this._columns.push(new TableColumn(columnName, columnType, length, precision));
    } else {
      this._columns.push(new TableColumn(columnName, columnType));
    }
  }
}
