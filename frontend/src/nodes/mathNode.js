// /frontend/src/nodes/mathNode.js
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data, selected }) => (
    <BaseNode
        id={id} data={data} selected={selected}
        title="Math" category="Logic" icon="🔢" color="#f97316"
        inputs={[{ id: 'a', label: 'a' }, { id: 'b', label: 'b' }]}
        outputs={[{ id: 'result', label: 'result' }]}
        fields={[{
            key: 'operation',
            label: 'Operation',
            type: 'select',
            defaultValue: 'add',
            options: [
                { value: 'add', label: '➕ Add' },
                { value: 'subtract', label: '➖ Subtract' },
                { value: 'multiply', label: '✖️ Multiply' },
                { value: 'divide', label: '➗ Divide' },
            ],
        }]}
    />
);