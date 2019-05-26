import { CodeNode } from "../CodeNode";

export interface CodeConvertor {
  convert(configs: any, node: CodeNode): string|undefined;
}
