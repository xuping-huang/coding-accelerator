import * as _ from 'lodash';
import { NodeExecuter } from "../Executer";

export class ProxyExecuter implements NodeExecuter {
  constructor(private receiveFunName: string|undefined) {
  }

  async run(node: any): Promise<void> {
    if (this.receiveFunName && _.isFunction(node[this.receiveFunName])) {
      node[this.receiveFunName]();
    }
  }
}
