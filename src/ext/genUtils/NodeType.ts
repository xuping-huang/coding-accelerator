/**
 * Define tool node type
 */
export enum NodeType {
  FrameCodeGenUtil,
  FrameCodeHomePath,
  FrameCodeOutputPath,
  FrameCodeTemplateSwitch,
  FrameCodeConfiguration,
  FrameCodeConfigurationItem,
  FrameCodeSwitchableItem,
  ServiceCodeGenUtil,
  ServiceCodeProjectName,
  ServiceCodeHomeItem,
  ServiceCodeSwaggerItem,
  ServiceCodePathItem,
  ServiceCodeModelItem,
  ServiceCodePathUnit,
  ServiceCodeModelUnit,
  ServiceCodeModelPropertyUnit,
  ServiceCodePathUnitProperty,
  ServiceCodeModelPropertyForeignModel
}

/**
 * Define tool node's contextValue.
 */
export const NodeName = {
  FrameCodeGenUtil: 'frame_code_gen:executable',
  FrameCodeHomePath: 'frame_code_home_path:configurable',
  FrameCodeOutputPath: 'frame_code_output_path:configurable',
  FrameCodeTemplateSwitch: 'frame_code_template_switch:configurable',
  FrameCodeConfiguration: 'frame_code_config',
  FrameCodeConfigurationItem: 'frame_code_item:configurable',
  FrameCodeSwitchableItem: 'frame_code_item:switchable:off',
  ServiceCodeGenUtil: 'service_code_gen:executable',
  ServiceCodeHomeItem: 'service_code_home_item:configurable',
  ServiceCodeSwaggerItem: 'service_code_swagger_item:configurable',
  ServiceCodeProjectName: 'service_code_project_name:configurable',
  ServiceCodePathItem: 'service_code_path_item',
  ServiceCodeModelItem: 'service_code_model_item:switchable:off',
  ServiceCodePathUnit: 'service_code_path_unit',
  ServiceCodeModelUnit: 'service_code_model_unit:model:on:pagination:on',
  ServiceCodeModelPropertyUnit: 'service_code_model_property_unit:key:off:fkey:off',
  ServiceCodePathUnitProperty: 'service_code_path_property_unit:configurable',
  ServiceCodeModelPropertyForeignModel: 'service_code_model_property_foreign_model:configurable'
};
