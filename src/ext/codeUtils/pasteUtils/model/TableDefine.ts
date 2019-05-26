import { ColumnDefine } from "./ColumnDefine";

export interface TableDefine {
  name: string;
  snakeName: string;
  camelCaseName: string;
  columns: ColumnDefine[];
}
