import { NodeExecuter } from "../Executer";

export class DummyExecuter implements NodeExecuter {
  constructor() {
  }

  async run(): Promise<void> {
  }
}
