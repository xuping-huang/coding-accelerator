import { SwaggerModelPropertyDefine } from "./SwaggerModelPropertyDefine";

export class SwaggerModelProperty implements SwaggerModelPropertyDefine{
  private _isDate: boolean = false;
  private _isDateTime: boolean = false;
  private _isString: boolean = false;
  private _isEmail: boolean = false;
  private _isGuid: boolean = false;
  private _isInteger: boolean = false;
  private _isDecimal: boolean = false;
  private _isNumber: boolean = false;
  private _isBoolean: boolean = false;
  private _maxLength: number | undefined;
  private _minLength: number | undefined;
  private _maximum: number | undefined;
  private _minimum: number | undefined;
  private _enum: string[] | number[] = [];
  private _type: string | undefined;
  public get type(): string | undefined {
    return this._type;
  }
  public set type(value: string | undefined) {
    this._type = value;
  }
  private _format: string | undefined;
  public get format(): string | undefined {
    return this._format;
  }
  public set format(value: string | undefined) {
    this._format = value;
  }

  constructor(
    readonly name: string,
    readonly prop: any,
    readonly isRequired: boolean) {
    this.type = String(prop['type']).toLowerCase().trim();
    this.format = String(prop['format']).toLowerCase().trim();

    switch (this.type) {
      case "integer":
        this.isInteger = true;
        break;
      case "number":
      this.isNumber = true;
        if ( this.format === 'float' || this.format === 'double' ){
          this.isDecimal = true;
        }
        break;
      case "string":
        switch (this.format) {
          case "date":
            this.isDate = true;
            break;
          case "date-time":
            this.isDateTime = true;
            break;
          case "email":
            this.isEmail = true;
            break;
          case "guid":
            this.isGuid = true;
            break;
          default:
            this.isString = true;
        }
        break;
      case "boolean":
        this.isBoolean = true;
        break;
    }

    if (prop['maxLength']) {
      this.maxLength = +prop['maxLength'];
    }

    if (prop['minLength']) {
      this.maxLength = +prop['minLength'];
    }

    if (prop['maximum']) {
      this.maxLength = +prop['maximum'];
    }

    if (prop['maxLength']) {
      this.maxLength = +prop['maxLength'];
    }

    if (prop['enum']) {
      this.enum = prop['enum'];
    }
  }

  public get enum(): string[] | number[] {
    return this._enum;
  }
  public set enum(value: string[] | number[]) {
    this._enum = value;
  }
  public get maximum(): number | undefined{
    return this._maximum;
  }
  public set maximum(value: number | undefined) {
    this._maximum = value;
  }
  public get minLength(): number | undefined {
    return this._minLength;
  }
  public set minLength(value: number | undefined) {
    this._minLength = value;
  }
  public get maxLength(): number | undefined {
    return this._maxLength;
  }
  public set maxLength(value: number | undefined) {
    this._maxLength = value;
  }
  public get isBoolean(): boolean {
    return this._isBoolean;
  }
  public set isBoolean(value: boolean) {
    this._isBoolean = value;
  }
  public get isNumber(): boolean {
    return this._isNumber;
  }
  public set isNumber(value: boolean) {
    this._isNumber = value;
  }
  public get isGuid(): boolean {
    return this._isGuid;
  }
  public set isGuid(value: boolean) {
    this._isGuid = value;
  }
  public get isDecimal(): boolean {
    return this._isDecimal;
  }
  public set isDecimal(value: boolean) {
    this._isDecimal = value;
  }
  public get isString(): boolean {
    return this._isString;
  }
  public set isString(value: boolean) {
    this._isString = value;
  }
  public get isInteger(): boolean {
    return this._isInteger;
  }
  public set isInteger(value: boolean) {
    this._isInteger = value;
  }
  public get isEmail(): boolean {
    return this._isEmail;
  }
  public set isEmail(value: boolean) {
    this._isEmail = value;
  }
  public get isDate(): boolean {
    return this._isDate;
  }
  public set isDate(value: boolean) {
    this._isDate = value;
  }
  public get isDateTime(): boolean {
    return this._isDateTime;
  }
  public set isDateTime(value: boolean) {
    this._isDateTime = value;
  }
  public get minimum(): number | undefined {
    return this._minimum;
  }
  public set minimum(value: number | undefined) {
    this._minimum = value;
  }
}
