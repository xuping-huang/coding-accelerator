import * as _ from 'lodash';
import { CodeConvertor } from '../Converter';

export class PropertiesConvertor implements CodeConvertor {
  convert(contents: string[]): string {
    const returnContent: string[] = [];

    _.each(contents, content => {
      const dataType = this.judgeContentType(content);
      const prop = content.trim();
      if (!_.isEmpty(prop)) {
        returnContent.push(`  private _${_.camelCase(prop)}: ${dataType} | undefined = undefined;`);
        returnContent.push(`  public get ${_.camelCase(prop)}(): ${dataType} | undefined {`);
        returnContent.push(`    return this._${_.camelCase(prop)};`);
        returnContent.push(`  }`);
        returnContent.push(`  public set ${_.camelCase(prop)}(value: ${dataType} | undefined) {`);
        returnContent.push(`    this._${_.camelCase(prop)} = value;`);
        returnContent.push(`  }`);
        returnContent.push(``);
      }
    });

    return returnContent.join('\n');
  }

  judgeContentType(content: string): string {
    const lower = content.trim().toLowerCase();
    const boolPrefix = ['is', 'has', 'have', 'need', 'had'];
    let returnCode = 'string';
    _.each(boolPrefix, prefix => {
      if (lower.startsWith(prefix)) {
        returnCode = 'boolean';
      }
    });

    if (returnCode !== 'string') {
      return returnCode;
    }

    const numSuffix = ['num', 'number', 'count', 'total'];
    _.each(numSuffix, suffix => {
      if (lower.startsWith(suffix) || lower.endsWith(suffix)) {
        returnCode = 'number';
      }
    });

    return returnCode;
  }
}
