import * as _ from 'lodash';
import { PasteNode } from '../PasteNode';
import { CodeConvertor } from '../Converter';
import { SwaggerModelDefine } from '../model/SwaggerModelDefine';
import { SwaggerModelPropertyDefine } from '../model/SwaggerModelPropertyDefine';

export class SwaggerModel2JoiSchemaConverter implements CodeConvertor {
  convert(models: SwaggerModelDefine[], node: PasteNode): string {
    const lines: string[] = [];
    try {
      _.each(models, model => {
        lines.push(`const ${_.camelCase(model.name)} = Joi.object().keys({`);
        let lineNum = 0;
        _.each(model.properties, (prop) => {
          lineNum += 1;
          lines.push(`  ${prop.name}: Joi${this.joiType(prop)}${this.joiLimit(prop)}${this.joiRequired(prop)}${lineNum < model.properties.length ? ',' : ''}`);
        });
        lines.push('})');
        lines.push('');
      })
    } catch (err) {
    }
    return lines.join('\n');
  }

  private joiType(prop: SwaggerModelPropertyDefine) {
    let returned = '.any()';
    if (prop.isBoolean) {
      returned = '.boolean()';
    } else if (prop.isDate || prop.isDateTime) {
      returned = '.date()';
    } else if (prop.isDecimal || prop.isNumber) {
      returned = '.number()';
    } else if (prop.isInteger) {
      returned = '.number().integer()';
    } else if (prop.isEmail) {
      returned = '.string().email()';
    } else if (prop.isGuid) {
      returned = '.string().guid()';
    } else if (prop.isString) {
      returned = '.string()';
    }
    return returned;
  }

  private joiLimit(prop: SwaggerModelPropertyDefine) {
    let returned = '';
    if (prop.isString) {
      if (prop.minLength) {
        returned += `.min(${prop.minLength}`;
      }
      if (prop.maxLength) {
        returned += `.max(${prop.maxLength})`;
      }
    }
    return returned;
  }

  private joiRequired(prop: SwaggerModelPropertyDefine) {
    return prop.isRequired ? '.required()' : '';
  }
}
