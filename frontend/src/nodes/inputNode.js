// /frontend/src/nodes/inputNode.js
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      title="Input"
      category="Pipeline"
      icon="📥"
      color="#10b981"
      inputs={[]}
      outputs={[{ id: 'value', label: 'value' }]}
      fields={[
        {
          key: 'inputName',
          label: 'Name',
          type: 'text',
          defaultValue: 'input_0',
          placeholder: 'Variable name...',
        },
        {
          key: 'inputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: ['Text', 'File', 'Image', 'Number'],
        },
      ]}
    />
  );
};