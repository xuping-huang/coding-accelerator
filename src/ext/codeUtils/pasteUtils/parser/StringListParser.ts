import * as _ from 'lodash';
import { CodeParser } from '../Paster';

export class StringListParser implements CodeParser {
  match(content: string): boolean {
    if (_.isEmpty(content.trim())) {
      return false;
    }
    const handled = content.replace(/\r/g, '\n').replace(/\s*\n\s*/g, ',');
    if (handled.match(/[^A-Za-z0-9_,\s]/g)) {
      return false;
    }
    if (!handled.match(/[A-Za-z]/g)) {
      return false;
    }

    return true;
  }

  parse(content: string): string[] {
    const handled = content.replace(/\r/g, '\n').replace(/\s*\n\s*/g, ',');
    return handled.split(',');
  }
}
