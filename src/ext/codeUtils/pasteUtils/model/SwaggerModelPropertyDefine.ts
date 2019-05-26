
export interface SwaggerModelPropertyDefine {
  name: string;
  type: string | undefined;
  format: string | undefined;
  maxLength: number | undefined;
  minLength: number | undefined;
  maximum: number | undefined;
  minimum: number | undefined;
  enum: any[];
  isRequired: boolean;
  isDateTime: boolean;
  isDate: boolean;
  isEmail: boolean;
  isGuid: boolean;
  isInteger: boolean;
  isDecimal: boolean;
  isNumber: boolean;
  isString: boolean;
  isBoolean: boolean;
}
