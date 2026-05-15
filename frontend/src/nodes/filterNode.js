// /frontend/src/nodes/filterNode.js
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data, selected }) => (
    <BaseNode
        id={id} data={data} selected={selected}
        title="Filter" category="Logic" icon="🔽" color="#14b8a6"
        inputs={[{ id: 'list', label: 'list' }]}
        outputs={[{ id: 'passed', label: 'passed' }, { id: 'failed', label: 'failed' }]}
        fields={[
            {
                key: 'field',
                label: 'Field Name',
                type: 'text',
                defaultValue: '',
                placeholder: 'e.g. status',
            },
            {
                key: 'condition',
                label: 'Condition',
                type: 'select',
                defaultValue: 'equals',
                options: ['equals', 'not equals', 'contains', 'greater than', 'less than'],
            },
            {
                key: 'value',
                label: 'Value',
                type: 'text',
                defaultValue: '',
                placeholder: 'Compare value...',
            },
        ]}
    />
);