// // llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }



// /frontend/src/nodes/llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      title="LLM"
      category="AI"
      icon="🤖"
      color="#6366f1"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
      fields={[
        {
          key: 'model',
          label: 'Model',
          type: 'select',
          defaultValue: 'gpt-4o',
          options: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet'],
        },
        {
          key: 'temperature',
          label: 'Temperature',
          type: 'number',
          defaultValue: 0.7,
          min: 0,
          max: 2,
          step: 0.1,
        },
      ]}
    />
  );
};