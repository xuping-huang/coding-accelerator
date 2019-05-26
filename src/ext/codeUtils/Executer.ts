import * as _ from 'lodash';

export interface NodeExecuter {
  run(...args: any[]): void;
}
