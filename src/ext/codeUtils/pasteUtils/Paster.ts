import { CodeNode } from "../CodeNode";

export interface CodeParser {
  match(content: string): boolean;
  parse(content: string, node: CodeNode): any|undefined;
}
