// /frontend/src/nodes/transformNode.js
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data, selected }) => (
    <BaseNode
        id={id} data={data} selected={selected}
        title="Transform" category="Data" icon="🔄" color="#a855f7"
        inputs={[{ id: 'input', label: 'input' }]}
        outputs={[{ id: 'output', label: 'output' }]}
        fields={[
            {
                key: 'transformType',
                label: 'Transform',
                type: 'select',
                defaultValue: 'uppercase',
                options: ['uppercase', 'lowercase', 'trim', 'reverse', 'JSON stringify', 'JSON parse'],
            },
        ]}
    />
);