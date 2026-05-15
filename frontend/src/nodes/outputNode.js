// /frontend/src/nodes/outputNode.js
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      title="Output"
      category="Pipeline"
      icon="📤"
      color="#f59e0b"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[]}
      fields={[
        {
          key: 'outputName',
          label: 'Name',
          type: 'text',
          defaultValue: 'output_0',
          placeholder: 'Output name...',
        },
        {
          key: 'outputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: ['Text', 'File', 'Image', 'Number'],
        },
      ]}
    />
  );
};