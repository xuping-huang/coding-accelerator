/**
 * Define tool node type
 */
export enum NodeType {
  PasteUtilFolder,
  PasteUtilItem,
  OtherUtilFolder,
  PasteUtilItemConfig,
  Excel2Json,
  Json2Excel,
  Map2ParentConfig
}

/**
 * Define tool node's contextValue.
 */
export const NodeName = {
  PasteUtilFolder: 'paste_util_folder:switchable:on',
  OtherUtilFolder: 'other_util_folder',
  PasteUtilItem: 'paste_util_item:switchable:off',
  PasteUtilItemConfig: 'paste_util_config:configurable',
  Excel2Json: 'excel_to_json:executable',
  Json2Excel: 'json_to_excel:executable',
  Map2ParentConfig: 'input_output_config:configurable'
};
