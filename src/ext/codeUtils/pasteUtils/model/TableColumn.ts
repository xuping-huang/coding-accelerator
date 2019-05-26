import * as _ from 'lodash';
import { ColumnDefine } from './ColumnDefine';
import * as helper from '../../../../lib/helper';

export class TableColumn implements ColumnDefine {
  private _name: string = '';
  private _snakeName: string = '';
  private _camelCaseName: string = '';
  private _isString: boolean = false;
  private _isText: boolean = false;
  private _isInteger: boolean = false;
  private _isLong: boolean = false;
  private _isFloat: boolean = false;
  private _isDouble: boolean = false;
  private _isDecimal: boolean = false;
  private _isByteArray: boolean = false;
  private _isBoolean: boolean = false;
  private _isDate: boolean = false;
  private _isDateTime: boolean = false;
  private _isUuid: boolean = false;
  private _isJson: boolean = false;

  constructor(name: string, columnType: string, length?: number, precision?: number) {
    let fullName = name.trim();
    if (fullName.startsWith('"')) {
      fullName = fullName.substring(1, fullName.length - 1);
    }
    this._name = fullName;
    this._snakeName = _.snakeCase(fullName);
    this._camelCaseName = _.camelCase(fullName);
    if (!_.isNil(length)) {
      this.columnTypeWithLength(columnType, length, precision);
    } else {
      this.columnType(columnType);
    }
  }

  columnType(columnType: string): void {
    const theType = columnType.trim().toLowerCase();
    if (helper.isIntegerColumn(theType)) { this._isInteger = true; }
    else if (helper.isLongColumn(theType)) { this._isLong = true; }
    else if (helper.isFloatColumn(theType)) { this._isFloat = true; }
    else if (helper.isDoubleColumn(theType)) { this._isDouble = true; }
    else if (helper.isDecimalColumn(theType)) { this._isDecimal = true; }
    else if (helper.isByteArrayColumn(theType)) { this._isByteArray = true; }
    else if (helper.isBooleanColumn(theType)) { this._isBoolean = true; }
    else if (helper.isDateColumn(theType)) { this._isDate = true; }
    else if (helper.isDateTimeColumn(theType)) { this._isDateTime = true; }
    else if (helper.isUuidColumn(theType)) { this._isUuid = true; }
    else if (helper.isJsonColumn(theType)) { this._isJson = true; }
    else if (helper.isTextColumn(theType)) { this._isText = true; }
    else if (helper.isStringColumn(theType)) { this._isString = true; }
  }

  columnTypeWithLength(columnType: string, length?: number, precision?: number): void {
    const theType = columnType.trim().toLowerCase();
    if (helper.isIntegerColumn(theType, length, precision)) { this._isInteger = true; }
    else if (helper.isLongColumn(theType, length, precision)) { this._isLong = true; }
    else if (helper.isFloatColumn(theType, length, precision)) { this._isFloat = true; }
    else if (helper.isDoubleColumn(theType, length, precision)) { this._isDouble = true; }
    else if (helper.isDecimalColumn(theType, length, precision)) { this._isDecimal = true; }
    else if (helper.isByteArrayColumn(theType)) { this._isByteArray = true; }
    else if (helper.isBooleanColumn(theType)) { this._isBoolean = true; }
    else if (helper.isDateColumn(theType)) { this._isDate = true; }
    else if (helper.isDateTimeColumn(theType)) { this._isDateTime = true; }
    else if (helper.isUuidColumn(theType)) { this._isUuid = true; }
    else if (helper.isJsonColumn(theType)) { this._isJson = true; }
    else if (helper.isTextColumn(theType)) { this._isText = true; }
    else if (helper.isStringColumn(theType)) { this._isString = true; }
  }

  get name(): string {
    return this._name;
  }
  get snakeName(): string {
    return this._snakeName;
  }
  get camelCaseName(): string {
    return this._camelCaseName;
  }
  get isString(): boolean {
    return this._isString;
  }
  get isText(): boolean {
    return this._isText;
  }
  get isInteger(): boolean {
    return this._isInteger;
  }
  get isLong(): boolean {
    return this._isLong;
  }
  get isFloat(): boolean {
    return this._isFloat;
  }
  get isDouble(): boolean {
    return this._isDouble;
  }
  get isDecimal(): boolean {
    return this._isDecimal;
  }
  get isByteArray(): boolean {
    return this._isByteArray;
  }
  get isBoolean(): boolean {
    return this._isBoolean;
  }
  get isDate(): boolean {
    return this._isDate;
  }
  get isDateTime(): boolean {
    return this._isDateTime;
  }
  get isUuid(): boolean {
    return this._isUuid;
  }
  get isJson(): boolean {
    return this._isJson;
  }
}
