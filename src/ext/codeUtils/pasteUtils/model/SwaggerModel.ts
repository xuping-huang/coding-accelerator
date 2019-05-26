import { SwaggerModelDefine } from "./SwaggerModelDefine";
import { SwaggerModelPropertyDefine } from "./SwaggerModelPropertyDefine";

export class SwaggerModel implements SwaggerModelDefine {
  private _properties: SwaggerModelPropertyDefine[] = [];

  constructor(public readonly name: string) {
  }

  get properties() {
    return this._properties;
  }

  addProperty(prop: SwaggerModelPropertyDefine) {
    this._properties.push(prop);
  }

}
