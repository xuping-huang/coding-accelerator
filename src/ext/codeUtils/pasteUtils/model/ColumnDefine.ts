export interface ColumnDefine {
  name: string;
  camelCaseName: string;
  snakeName: string;
  isString: boolean;
  isInteger: boolean;
  isLong: boolean;
  isFloat: boolean;
  isDouble: boolean;
  isDecimal: boolean;
  isByteArray: boolean;
  isBoolean: boolean;
  isDate: boolean;
  isDateTime: boolean;
  isUuid: boolean;
  isJson: boolean;
}
